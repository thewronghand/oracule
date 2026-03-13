import { type SpreadType, spreadOptions } from 'app/types/spread'
import { Text, XStack, YStack } from 'tamagui'

interface SpreadSelectorProps {
  selectedSpread?: SpreadType
  onSelect: (spread: SpreadType) => void
}

export function SpreadSelector({ selectedSpread, onSelect }: SpreadSelectorProps) {
  return (
    <YStack gap={0}>
      {spreadOptions.map((option, index) => {
        const isSelected = selectedSpread === option.value

        return (
          <XStack
            key={option.value}
            borderTopWidth={index === 0 ? 1 : 0}
            borderBottomWidth={1}
            borderColor='rgba(232,232,232,0.08)'
            paddingVertical='$4'
            paddingHorizontal='$3'
            gap='$4'
            cursor='pointer'
            pressStyle={{ opacity: 0.6 }}
            onPress={() => onSelect(option.value)}
            alignItems='flex-start'
            // @ts-ignore
            style={{
              transition: 'background-color 0.15s ease',
              backgroundColor: isSelected ? 'rgba(201, 169, 110, 0.04)' : 'transparent',
            }}
          >
            {/* 라디오 인디케이터 */}
            <YStack paddingTop={3} flexShrink={0}>
              <YStack
                width={16}
                height={16}
                borderRadius={8}
                borderWidth={1}
                borderColor={isSelected ? '#c9a96e' : 'rgba(232,232,232,0.25)'}
                alignItems='center'
                justifyContent='center'
                // @ts-ignore
                style={{ transition: 'border-color 0.15s ease', flexShrink: 0 }}
              >
                {isSelected && (
                  <YStack width={8} height={8} borderRadius={4} backgroundColor='#c9a96e' />
                )}
              </YStack>
            </YStack>

            {/* 콘텐츠 */}
            <YStack flex={1} gap='$1'>
              <XStack alignItems='center' gap='$2' marginBottom={2}>
                <Text
                  fontFamily='$body'
                  fontSize={14}
                  fontWeight={isSelected ? '500' : '400'}
                  color={isSelected ? '$color' : '$colorFocus'}
                  // @ts-ignore
                  style={{ transition: 'color 0.15s ease' }}
                >
                  {option.label}
                </Text>
                <Text
                  fontFamily='$body'
                  fontSize={11}
                  color='$colorFocus'
                  opacity={0.4}
                  letterSpacing={0.5}
                >
                  · {option.cardCount}장
                </Text>
              </XStack>

              <Text
                fontFamily='$body'
                fontSize={12}
                color='$colorFocus'
                opacity={0.5}
                lineHeight={18}
              >
                {option.description}
              </Text>
            </YStack>
          </XStack>
        )
      })}
    </YStack>
  )
}
