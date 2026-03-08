import type { DrawnTarotCard } from 'app/types/card'
import { SPREAD_INFO, type SpreadType } from 'app/types/spread'
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

function CardSlot({
  card,
  index,
  label,
  isRevealed,
  onPress,
  size = 'sm',
}: {
  card: DrawnTarotCard | undefined
  index: number
  label: string
  isRevealed: boolean
  onPress?: (index: number) => void
  size?: 'sm' | 'md'
}) {
  return (
    <YStack alignItems="center" gap="$2" animation="cardReveal" enterStyle={{ opacity: 0, scale: 0.9 }}>
      {card ? (
        <TarotCard
          card={card}
          isRevealed={isRevealed}
          size={size}
          onPress={onPress ? () => onPress(index) : undefined}
        />
      ) : (
        // 빈 슬롯 (카드가 아직 없을 때)
        <YStack
          width={size === 'sm' ? 80 : 120}
          height={size === 'sm' ? 120 : 180}
          borderRadius={12}
          borderWidth={1}
          borderColor="$borderColor"
          borderStyle="dashed"
          backgroundColor="$backgroundStrong"
          opacity={0.4}
        />
      )}
      <Text fontSize="$1" color="$color3" textAlign="center" maxWidth={100}>
        {label}
      </Text>
    </YStack>
  )
}

// 빈 칸 자리 채우기용
function EmptySlot({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <YStack
      width={size === 'sm' ? 80 : 120}
      height={size === 'sm' ? 120 : 180}
      opacity={0}
    />
  )
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
      <YStack alignItems="center" justifyContent="center" padding="$4">
        <CardSlot
          card={cards[0]}
          index={0}
          label={labels[0] ?? ''}
          isRevealed={isRevealed(0)}
          onPress={onCardPress}
          size="md"
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
              size="sm"
            />
          ))}
        </XStack>
      </ScrollView>
    )
  }

  if (spreadType === 'FIVE_CARD_CROSS') {
    // 배치: top=0, left=1, center=2, right=3, bottom=4
    return (
      <ScrollView>
        <YStack alignItems="center" gap="$2" padding="$4">
          {/* 상단 행: 빈칸 | 카드[0] | 빈칸 */}
          <XStack gap="$2" alignItems="flex-end">
            <EmptySlot size="sm" />
            <CardSlot card={cards[0]} index={0} label={labels[0] ?? ''} isRevealed={isRevealed(0)} onPress={onCardPress} size="sm" />
            <EmptySlot size="sm" />
          </XStack>
          {/* 중간 행: 카드[1] | 카드[2] | 카드[3] */}
          <XStack gap="$2" alignItems="flex-start">
            <CardSlot card={cards[1]} index={1} label={labels[1] ?? ''} isRevealed={isRevealed(1)} onPress={onCardPress} size="sm" />
            <CardSlot card={cards[2]} index={2} label={labels[2] ?? ''} isRevealed={isRevealed(2)} onPress={onCardPress} size="sm" />
            <CardSlot card={cards[3]} index={3} label={labels[3] ?? ''} isRevealed={isRevealed(3)} onPress={onCardPress} size="sm" />
          </XStack>
          {/* 하단 행: 빈칸 | 카드[4] | 빈칸 */}
          <XStack gap="$2" alignItems="flex-start">
            <EmptySlot size="sm" />
            <CardSlot card={cards[4]} index={4} label={labels[4] ?? ''} isRevealed={isRevealed(4)} onPress={onCardPress} size="sm" />
            <EmptySlot size="sm" />
          </XStack>
        </YStack>
      </ScrollView>
    )
  }

  if (spreadType === 'CELTIC_CROSS') {
    // 좌측 크로스 영역: cards[0..5]
    // 우측 스태프 영역: cards[6..9] (아래→위)
    return (
      <ScrollView>
        <XStack gap="$6" padding="$4" alignItems="center" justifyContent="center">
          {/* 좌측: 크로스 패턴 */}
          <YStack gap="$2" alignItems="center">
            {/* 상단: 빈칸 | 카드[4] | 빈칸 */}
            <XStack gap="$2" alignItems="flex-end">
              <EmptySlot size="sm" />
              <CardSlot card={cards[4]} index={4} label={labels[4] ?? ''} isRevealed={isRevealed(4)} onPress={onCardPress} size="sm" />
              <EmptySlot size="sm" />
            </XStack>
            {/* 중간: 카드[3] | 카드[0]+카드[1] | 카드[5] */}
            <XStack gap="$2" alignItems="center">
              <CardSlot card={cards[3]} index={3} label={labels[3] ?? ''} isRevealed={isRevealed(3)} onPress={onCardPress} size="sm" />
              {/* 크로스: 카드[0] 위에 카드[1] 겹침 */}
              <YStack alignItems="center" position="relative">
                <CardSlot card={cards[0]} index={0} label={labels[0] ?? ''} isRevealed={isRevealed(0)} onPress={onCardPress} size="sm" />
                {/* 카드[1]: 가로로 겹쳐서 표시 (회전 표현은 레이블로 대체) */}
                <YStack
                  position="absolute"
                  top={20}
                  left={-10}
                  right={-10}
                  alignItems="center"
                  opacity={cards[1] ? 1 : 0}
                >
                  {cards[1] && (
                    <TarotCard
                      card={cards[1]}
                      isRevealed={isRevealed(1)}
                      size="sm"
                      onPress={onCardPress ? () => onCardPress(1) : undefined}
                    />
                  )}
                </YStack>
              </YStack>
              <CardSlot card={cards[5]} index={5} label={labels[5] ?? ''} isRevealed={isRevealed(5)} onPress={onCardPress} size="sm" />
            </XStack>
            {/* 하단: 빈칸 | 카드[2] | 빈칸 */}
            <XStack gap="$2" alignItems="flex-start">
              <EmptySlot size="sm" />
              <CardSlot card={cards[2]} index={2} label={labels[2] ?? ''} isRevealed={isRevealed(2)} onPress={onCardPress} size="sm" />
              <EmptySlot size="sm" />
            </XStack>
            {/* 카드[1] 레이블 별도 표시 */}
            <Text fontSize="$1" color="$color3" textAlign="center">
              {labels[1] ?? ''}
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
