import type { DrawnTarotCard } from 'app/types/card'
import { SPREAD_INFO, type SpreadType } from 'app/types/spread'
import { Platform } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'
import { TarotCard } from './TarotCard'

interface SpreadLayoutProps {
  spreadType: SpreadType
  cards: DrawnTarotCard[]
  revealedIndices?: number[]
  onCardPress?: (index: number) => void
}

// 포지션 레이블에서 괄호 안 짧은 이름만 추출
function extractShortLabel(position: string): string {
  const match = position.match(/\(([^)]+)\)/)
  if (match?.[1]) {
    const inner = match[1]
    const parts = inner.split(' - ')
    return parts[parts.length - 1] ?? inner
  }
  return position
}

// 레이블 컴포넌트 — 스타일 통일
function CardLabel({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <Text
      fontSize="$1"
      color={highlight ? '$yellow10' : '$color3'}
      textAlign="center"
      maxWidth={100}
      fontWeight={highlight ? '600' : '400'}
      letterSpacing={0.3}
    >
      {label}
    </Text>
  )
}

// 웹 hover 효과가 있는 카드 슬롯 래퍼
function HoverCardWrapper({
  children,
  isWeb,
}: {
  children: React.ReactNode
  isWeb: boolean
}) {
  if (!isWeb) return <>{children}</>
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s ease, filter 0.2s ease',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.07)'
        ;(e.currentTarget as HTMLDivElement).style.filter =
          'drop-shadow(0 6px 18px rgba(120,0,200,0.35))'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
        ;(e.currentTarget as HTMLDivElement).style.filter = 'none'
      }}
    >
      {children}
    </div>
  )
}

function CardSlot({
  card,
  index,
  label,
  isRevealed,
  onPress,
  size = 'sm',
  rotate,
  highlightLabel,
}: {
  card: DrawnTarotCard | undefined
  index: number
  label: string
  isRevealed: boolean
  onPress?: (index: number) => void
  size?: 'sm' | 'md' | 'lg'
  rotate?: string
  highlightLabel?: boolean
}) {
  const isWeb = Platform.OS === 'web'
  const sizeW = size === 'sm' ? 80 : size === 'md' ? 120 : 160
  const sizeH = size === 'sm' ? 120 : size === 'md' ? 180 : 240

  const cardContent = card ? (
    <TarotCard
      card={card}
      isRevealed={isRevealed}
      size={size}
      onPress={onPress ? () => onPress(index) : undefined}
      rotate={rotate}
    />
  ) : (
    <YStack
      width={sizeW}
      height={sizeH}
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      borderStyle="dashed"
      backgroundColor="$backgroundStrong"
      opacity={0.35}
    />
  )

  return (
    <YStack
      alignItems="center"
      gap="$2"

    >
      <HoverCardWrapper isWeb={isWeb}>{cardContent}</HoverCardWrapper>
      <CardLabel label={label} highlight={highlightLabel} />
    </YStack>
  )
}

// 빈 칸 자리 채우기용
function EmptySlot({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const w = size === 'sm' ? 80 : size === 'md' ? 120 : 160
  const h = size === 'sm' ? 120 : size === 'md' ? 180 : 240
  return <YStack width={w} height={h} opacity={0} />
}

export function SpreadLayout({
  spreadType,
  cards,
  revealedIndices = [],
  onCardPress,
}: SpreadLayoutProps) {
  const positions = SPREAD_INFO[spreadType].positions
  const labels = positions.map(extractShortLabel)
  const isRevealed = (index: number) => revealedIndices.includes(index)

  if (spreadType === 'SINGLE') {
    return (
      <YStack alignItems="center" justifyContent="center" padding="$6">
        <CardSlot
          card={cards[0]}
          index={0}
          label={labels[0] ?? ''}
          isRevealed={isRevealed(0)}
          onPress={onCardPress}
          size="lg"
        />
      </YStack>
    )
  }

  if (spreadType === 'TRIPLE_TIMELINE' || spreadType === 'TRIPLE_CHOICE') {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$4" alignItems="flex-start" justifyContent="center" padding="$4">
          {[0, 1, 2].map((i) => (
            <CardSlot
              key={i}
              card={cards[i]}
              index={i}
              label={labels[i] ?? ''}
              isRevealed={isRevealed(i)}
              onPress={onCardPress}
              size="md"
            />
          ))}
        </XStack>
      </ScrollView>
    )
  }

  if (spreadType === 'FIVE_CARD_CROSS') {
    return (
      <ScrollView>
        <YStack alignItems="center" gap="$2" padding="$4">
          {/* 상단 행: 빈칸 | 카드[0] | 빈칸 */}
          <XStack gap="$2" alignItems="flex-end">
            <EmptySlot size="sm" />
            <CardSlot
              card={cards[0]}
              index={0}
              label={labels[0] ?? ''}
              isRevealed={isRevealed(0)}
              onPress={onCardPress}
              size="sm"
            />
            <EmptySlot size="sm" />
          </XStack>
          {/* 중간 행: 카드[1] | 카드[2] | 카드[3] */}
          <XStack gap="$2" alignItems="flex-start">
            <CardSlot
              card={cards[1]}
              index={1}
              label={labels[1] ?? ''}
              isRevealed={isRevealed(1)}
              onPress={onCardPress}
              size="sm"
            />
            <CardSlot
              card={cards[2]}
              index={2}
              label={labels[2] ?? ''}
              isRevealed={isRevealed(2)}
              onPress={onCardPress}
              size="sm"
            />
            <CardSlot
              card={cards[3]}
              index={3}
              label={labels[3] ?? ''}
              isRevealed={isRevealed(3)}
              onPress={onCardPress}
              size="sm"
            />
          </XStack>
          {/* 하단 행: 빈칸 | 카드[4] | 빈칸 */}
          <XStack gap="$2" alignItems="flex-start">
            <EmptySlot size="sm" />
            <CardSlot
              card={cards[4]}
              index={4}
              label={labels[4] ?? ''}
              isRevealed={isRevealed(4)}
              onPress={onCardPress}
              size="sm"
            />
            <EmptySlot size="sm" />
          </XStack>
        </YStack>
      </ScrollView>
    )
  }

  if (spreadType === 'CELTIC_CROSS') {
    const isWeb = Platform.OS === 'web'

    return (
      <ScrollView>
        <XStack gap="$6" padding="$4" alignItems="center" justifyContent="center">
          {/* 좌측: 크로스 패턴 */}
          <YStack gap="$2" alignItems="center">
            {/* 상단: 빈칸 | 카드[4] | 빈칸 */}
            <XStack gap="$2" alignItems="flex-end">
              <EmptySlot size="sm" />
              <CardSlot
                card={cards[4]}
                index={4}
                label={labels[4] ?? ''}
                isRevealed={isRevealed(4)}
                onPress={onCardPress}
                size="sm"
              />
              <EmptySlot size="sm" />
            </XStack>

            {/* 중간: 카드[3] | 카드[0]+카드[1] | 카드[5] */}
            <XStack gap="$2" alignItems="center">
              <CardSlot
                card={cards[3]}
                index={3}
                label={labels[3] ?? ''}
                isRevealed={isRevealed(3)}
                onPress={onCardPress}
                size="sm"
              />

              {/* 크로스: 카드[0] 위에 카드[1] 90도 회전으로 겹침 */}
              <YStack alignItems="center" position="relative" width={80} height={120}>
                {/* 카드[0]: 정위치 */}
                <YStack
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  alignItems="center"
                  justifyContent="center"
                >
                  {cards[0] && (
                    <HoverCardWrapper isWeb={isWeb}>
                      <TarotCard
                        card={cards[0]}
                        isRevealed={isRevealed(0)}
                        size="sm"
                        onPress={onCardPress ? () => onCardPress(0) : undefined}
                      />
                    </HoverCardWrapper>
                  )}
                </YStack>

                {/* 카드[1]: 90도 회전 겹침 */}
                <YStack
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  alignItems="center"
                  justifyContent="center"
                  opacity={cards[1] ? 1 : 0}
                >
                  {cards[1] && (
                    <HoverCardWrapper isWeb={isWeb}>
                      <TarotCard
                        card={cards[1]}
                        isRevealed={isRevealed(1)}
                        size="sm"
                        onPress={onCardPress ? () => onCardPress(1) : undefined}
                        rotate="90deg"
                      />
                    </HoverCardWrapper>
                  )}
                </YStack>
              </YStack>

              <CardSlot
                card={cards[5]}
                index={5}
                label={labels[5] ?? ''}
                isRevealed={isRevealed(5)}
                onPress={onCardPress}
                size="sm"
              />
            </XStack>

            {/* 하단: 빈칸 | 카드[2] | 빈칸 */}
            <XStack gap="$2" alignItems="flex-start">
              <EmptySlot size="sm" />
              <CardSlot
                card={cards[2]}
                index={2}
                label={labels[2] ?? ''}
                isRevealed={isRevealed(2)}
                onPress={onCardPress}
                size="sm"
              />
              <EmptySlot size="sm" />
            </XStack>

            {/* 교차 카드 레이블 */}
            <Text fontSize="$1" color="$yellow10" fontWeight="600" textAlign="center">
              {labels[0] ?? ''} / {labels[1] ?? ''}
            </Text>
          </YStack>

          {/* 우측: 스태프 (카드[9]→[6] 위→아래) */}
          <YStack gap="$3" alignItems="center">
            {[9, 8, 7, 6].map((i) => (
              <CardSlot
                key={i}
                card={cards[i]}
                index={i}
                label={labels[i] ?? ''}
                isRevealed={isRevealed(i)}
                onPress={onCardPress}
                size="sm"
              />
            ))}
          </YStack>
        </XStack>
      </ScrollView>
    )
  }

  return null
}
