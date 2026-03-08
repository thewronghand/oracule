import { type SpreadType, spreadOptions } from 'app/types/spread'
import { Text, XStack, YStack } from 'tamagui'

interface SpreadSelectorProps {
  selectedSpread?: SpreadType
  onSelect: (spread: SpreadType) => void
}

export function SpreadSelector({ selectedSpread, onSelect }: SpreadSelectorProps) {
  return (
    <XStack flexWrap="wrap" gap="$3" justifyContent="center" padding="$4">
      {spreadOptions.map((option) => {
        const isSelected = selectedSpread === option.value

        return (
          <YStack
            key={option.value}
            width={160}
            borderRadius={12}
            borderWidth={isSelected ? 2 : 1}
            borderColor={isSelected ? '$purple8' : '$borderColor'}
            backgroundColor={isSelected ? '$purple2' : '$backgroundStrong'}
            padding="$3"
            gap="$2"
            pressStyle={{ scale: 0.97, opacity: 0.85 }}
            animation="quick"
            cursor="pointer"
            onPress={() => onSelect(option.value)}
          >
            {/* 카드 수 배지 */}
            <XStack justifyContent="space-between" alignItems="center">
              <YStack
                backgroundColor={isSelected ? '$purple5' : '$background'}
                borderRadius={6}
                paddingHorizontal="$2"
                paddingVertical={2}
              >
                <Text
                  fontSize="$1"
                  color={isSelected ? '$purple11' : '$color3'}
                  fontWeight="600"
                >
                  {option.cardCount}장
                </Text>
              </YStack>
              {isSelected && (
                <YStack
                  width={8}
                  height={8}
                  borderRadius={4}
                  backgroundColor="$purple8"
                />
              )}
            </XStack>

            {/* 스프레드 이름 */}
            <Text
              fontSize="$3"
              fontWeight="700"
              color={isSelected ? '$purple11' : '$color'}
              numberOfLines={2}
            >
              {option.label}
            </Text>

            {/* 설명 */}
            <Text
              fontSize="$1"
              color="$color3"
              numberOfLines={3}
              lineHeight={16}
            >
              {option.description}
            </Text>
          </YStack>
        )
      })}
    </XStack>
  )
}
