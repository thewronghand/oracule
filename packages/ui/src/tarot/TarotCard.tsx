import { Coins, Sparkles, Star, Swords, Wand2, Wine } from '@tamagui/lucide-icons'
import type { DrawnTarotCard } from 'app/types/card'
import { Card, Text, XStack, YStack } from 'tamagui'

interface TarotCardProps {
  card: DrawnTarotCard
  isRevealed?: boolean
  size?: 'sm' | 'md' | 'lg'
  onPress?: () => void
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

export function TarotCard({ card, isRevealed = false, size = 'md', onPress }: TarotCardProps) {
  const { width, height, iconSize, fontSize } = SIZE_MAP[size]
  const displayedKeywords = card.keywords.slice(0, 3).join(', ')

  const pressProps = onPress
    ? {
        onPress,
        pressStyle: { opacity: 0.85, scale: 0.97 },
        cursor: 'pointer' as const,
      }
    : {}

  if (!isRevealed) {
    // 뒷면: 신비로운 다크 퍼플 그라디언트 + 별 아이콘
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
        enterStyle={{ opacity: 0, scale: 0.9 }}
        shadowColor="$shadowColor"
        shadowOpacity={0.4}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 4 }}
        {...pressProps}
      >
        {/* 장식 테두리 안쪽 */}
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
        <Star size={iconSize} color="$yellow8" />
      </YStack>
    )
  }

  // 앞면
  return (
    <Card
      width={width}
      height={height}
      borderRadius={12}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      animation="cardReveal"
      enterStyle={{ opacity: 0, scale: 0.9 }}
      shadowColor="$shadowColor"
      shadowOpacity={0.3}
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 4 }}
      padding="$2"
      {...pressProps}
    >
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

      {/* 중앙: 슈트 아이콘 */}
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$1">
        {getSuitIcon(card.suit, iconSize)}

        {/* 카드 이름 (한국어) */}
        <Text
          fontSize={fontSize}
          fontWeight="700"
          color="$color"
          textAlign="center"
          numberOfLines={2}
        >
          {card.name.ko}
        </Text>
      </YStack>

      {/* 방향 배지 */}
      <YStack alignItems="center" marginBottom="$1">
        <YStack
          backgroundColor={card.direction === '정방향' ? '$green5' : '$red5'}
          borderRadius={4}
          paddingHorizontal="$2"
          paddingVertical={2}
        >
          <Text
            fontSize="$1"
            color={card.direction === '정방향' ? '$green11' : '$red11'}
            fontWeight="600"
          >
            {card.direction}
          </Text>
        </YStack>
      </YStack>

      {/* 하단: 키워드 */}
      <Text fontSize="$1" color="$color3" textAlign="center" numberOfLines={1}>
        {displayedKeywords}
      </Text>
    </Card>
  )
}
