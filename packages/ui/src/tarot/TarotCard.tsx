import { Coins, Sparkles, Star, Swords, Wand2, Wine } from '@tamagui/lucide-icons'
import type { DrawnTarotCard } from 'app/types/card'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Card, Text, XStack, YStack, styled } from 'tamagui'

interface TarotCardProps {
  card: DrawnTarotCard
  isRevealed?: boolean
  size?: 'sm' | 'md' | 'lg'
  onPress?: () => void
  rotate?: string
}

const SIZE_MAP = {
  sm: { width: 80, height: 120, iconSize: 20, fontSize: '$1' },
  md: { width: 120, height: 180, iconSize: 32, fontSize: '$2' },
  lg: { width: 160, height: 240, iconSize: 44, fontSize: '$3' },
} as const

function getSuitIcon(suit: DrawnTarotCard['suit'], size: number) {
  const props = { size, color: '$color' } as const
  if (suit === 'Cup') return <Wine {...props} />
  if (suit === 'Pentacle') return <Coins {...props} />
  if (suit === 'Sword') return <Swords {...props} />
  if (suit === 'Wand') return <Wand2 {...props} />
  return <Sparkles {...props} />
}

// 웹 전용 3D 플립 컨테이너
const FlipContainer = styled(YStack, {
  position: 'relative',
  style: {
    perspective: '1000px',
  } as unknown as Record<string, never>,
})

// 웹 전용 카드 내부 (flip 대상)
function WebFlipCard({
  card,
  isRevealed,
  size,
  onPress,
  rotate,
}: Omit<TarotCardProps, 'size'> & { size: 'sm' | 'md' | 'lg' }) {
  const [flipped, setFlipped] = useState(isRevealed)
  const prevRevealed = useRef(isRevealed)

  useEffect(() => {
    if (prevRevealed.current !== isRevealed) {
      prevRevealed.current = isRevealed
      setFlipped(isRevealed)
    }
  }, [isRevealed])

  const { width, height, iconSize, fontSize } = SIZE_MAP[size]
  const displayedKeywords = card.keywords.slice(0, 3).join(', ')
  const isReversed = card.direction === '역방향'

  const cardStyle: React.CSSProperties = {
    width,
    height,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    cursor: onPress ? 'pointer' : 'default',
  }

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: 12,
    overflow: 'hidden',
  }

  const frontStyle: React.CSSProperties = {
    ...faceStyle,
    transform: 'rotateY(180deg)',
  }

  // 역방향 카드: 앞면을 180도 뒤집어서 표시
  const frontContentStyle: React.CSSProperties = isReversed
    ? { transform: 'rotate(180deg)', width: '100%', height: '100%' }
    : {}

  return (
    <div
      style={{
        perspective: '1000px',
        display: 'inline-block',
        transform: rotate ? `rotate(${rotate})` : undefined,
      }}
      onClick={onPress}
    >
      <div style={cardStyle}>
        {/* 뒷면 */}
        <div
          style={{
            ...faceStyle,
            background: 'linear-gradient(135deg, #2d1b69 0%, #4a1a6e 50%, #1a1040 100%)',
            border: '1.5px solid #b7860b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 외부 장식 테두리 */}
          <div
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
              right: 5,
              bottom: 5,
              borderRadius: 8,
              border: '1px solid rgba(183,134,11,0.45)',
              pointerEvents: 'none',
            }}
          />
          {/* 내부 장식 테두리 */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
              borderRadius: 5,
              border: '1px solid rgba(183,134,11,0.25)',
              pointerEvents: 'none',
            }}
          />
          {/* 대각선 패턴 (SVG) */}
          <svg
            style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}
            width={width}
            height={height}
          >
            <defs>
              <pattern id="diag" patternUnits="userSpaceOnUse" width="12" height="12">
                <line x1="0" y1="12" x2="12" y2="0" stroke="#e9c46a" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width={width} height={height} fill="url(#diag)" />
          </svg>
          {/* 중앙 별 아이콘 */}
          <div style={{ position: 'relative', zIndex: 1, opacity: 0.9 }}>
            <Star size={iconSize} color="#e9c46a" />
          </div>
          {/* 코너 장식 */}
          {['topleft', 'topright', 'bottomleft', 'bottomright'].map((pos) => (
            <div
              key={pos}
              style={{
                position: 'absolute',
                top: pos.startsWith('top') ? 14 : undefined,
                bottom: pos.startsWith('bottom') ? 14 : undefined,
                left: pos.endsWith('left') ? 14 : undefined,
                right: pos.endsWith('right') ? 14 : undefined,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'rgba(233,196,106,0.6)',
              }}
            />
          ))}
        </div>

        {/* 앞면 */}
        <div
          style={{
            ...frontStyle,
            background: 'var(--background, #fff)',
            border: isReversed ? '1.5px solid #e05252' : '1px solid rgba(120,120,120,0.3)',
          }}
        >
          <div style={frontContentStyle}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 8,
                boxSizing: 'border-box',
              }}
            >
              {/* 역방향 표시 배너 */}
              {isReversed && (
                <div
                  style={{
                    background: 'rgba(224,82,82,0.12)',
                    borderRadius: 4,
                    marginBottom: 4,
                    padding: '1px 4px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: 9, color: '#c0392b', fontWeight: 700 }}>▼ 역방향</span>
                </div>
              )}

              {/* 상단: 번호 + 아르카나 배지 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: size === 'sm' ? 10 : size === 'md' ? 12 : 14,
                    color: '#888',
                    fontWeight: 600,
                  }}
                >
                  {card.number}
                </span>
                <span
                  style={{
                    background: card.arcanaType === 'Major' ? 'rgba(120,0,200,0.15)' : 'rgba(0,80,200,0.12)',
                    borderRadius: 4,
                    padding: '1px 5px',
                    fontSize: 9,
                    color: card.arcanaType === 'Major' ? '#7b00c8' : '#004fc8',
                    fontWeight: 600,
                  }}
                >
                  {card.arcanaType === 'Major' ? '메이저' : '마이너'}
                </span>
              </div>

              {/* 중앙: 아이콘 + 카드명 */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                {getSuitIcon(card.suit, iconSize)}
                <span
                  style={{
                    fontSize: size === 'sm' ? 10 : size === 'md' ? 13 : 16,
                    fontWeight: 700,
                    textAlign: 'center',
                    color: 'inherit',
                    lineHeight: 1.3,
                  }}
                >
                  {card.name.ko}
                </span>
              </div>

              {/* 하단: 키워드 */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 9,
                  color: '#999',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {displayedKeywords}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 네이티브(모바일) 카드 컴포넌트 — 단순 전환
function NativeCard({
  card,
  isRevealed,
  size,
  onPress,
  rotate,
}: Omit<TarotCardProps, 'size'> & { size: 'sm' | 'md' | 'lg' }) {
  const { width, height, iconSize, fontSize } = SIZE_MAP[size]
  const displayedKeywords = card.keywords.slice(0, 3).join(', ')
  const isReversed = card.direction === '역방향'

  const pressProps = onPress
    ? {
        onPress,
        pressStyle: { opacity: 0.85, scale: 0.97 },
        cursor: 'pointer' as const,
      }
    : {}

  const rotateStyle = rotate ? { rotate } : {}

  if (!isRevealed) {
    return (
      <YStack
        width={width}
        height={height}
        borderRadius={12}
        borderWidth={1.5}
        borderColor="$yellow8"
        backgroundColor="$purple10"
        alignItems="center"
        justifyContent="center"
        animation="cardReveal"

        shadowColor="$shadowColor"
        shadowOpacity={0.4}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 4 }}
        {...rotateStyle}
        {...pressProps}
      >
        <YStack
          position="absolute"
          top={6}
          left={6}
          right={6}
          bottom={6}
          borderRadius={8}
          borderWidth={1}
          borderColor="$yellow6"
          opacity={0.5}
        />
        <YStack
          position="absolute"
          top={11}
          left={11}
          right={11}
          bottom={11}
          borderRadius={5}
          borderWidth={0.5}
          borderColor="$yellow5"
          opacity={0.3}
        />
        <Star size={iconSize} color="$yellow8" />
      </YStack>
    )
  }

  return (
    <Card
      width={width}
      height={height}
      borderRadius={12}
      backgroundColor="$background"
      borderWidth={isReversed ? 1.5 : 1}
      borderColor={isReversed ? '$red8' : '$borderColor'}
      animation="cardReveal"
      shadowColor="$shadowColor"
      shadowOpacity={0.3}
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 4 }}
      padding="$2"
      {...rotateStyle}
      {...pressProps}
    >
      {/* 역방향 배너 */}
      {isReversed && (
        <YStack
          backgroundColor="$red3"
          borderRadius={4}
          paddingHorizontal="$1"
          paddingVertical={1}
          marginBottom="$1"
          alignItems="center"
        >
          <Text fontSize="$1" color="$red10" fontWeight="700">
            ▼ 역방향
          </Text>
        </YStack>
      )}

      {/* 상단: 번호 + 아르카나 배지 */}
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$1">
        <Text fontSize={fontSize} color="$color2" fontWeight="600">
          {card.number}
        </Text>
        <YStack
          backgroundColor={card.arcanaType === 'Major' ? '$purple5' : '$blue5'}
          borderRadius={4}
          paddingHorizontal="$1"
          paddingVertical={2}
        >
          <Text fontSize="$1" color={card.arcanaType === 'Major' ? '$purple11' : '$blue11'}>
            {card.arcanaType === 'Major' ? '메이저' : '마이너'}
          </Text>
        </YStack>
      </XStack>

      {/* 중앙: 슈트 아이콘 + 카드 이름 */}
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$1">
        {getSuitIcon(card.suit, iconSize)}
        <Text fontSize={fontSize} fontWeight="700" color="$color" textAlign="center" numberOfLines={2}>
          {card.name.ko}
        </Text>
      </YStack>

      {/* 하단: 키워드 */}
      <Text fontSize="$1" color="$color3" textAlign="center" numberOfLines={1}>
        {displayedKeywords}
      </Text>
    </Card>
  )
}

export function TarotCard({ card, isRevealed = false, size = 'md', onPress, rotate }: TarotCardProps) {
  if (Platform.OS === 'web') {
    return <WebFlipCard card={card} isRevealed={isRevealed} size={size} onPress={onPress} rotate={rotate} />
  }
  return <NativeCard card={card} isRevealed={isRevealed} size={size} onPress={onPress} rotate={rotate} />
}
