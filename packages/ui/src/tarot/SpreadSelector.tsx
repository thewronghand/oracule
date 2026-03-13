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
            borderColor='rgba(240, 235, 224, 0.12)'
            paddingVertical='$5'
            paddingHorizontal='$2'
            gap='$5'
            cursor='pointer'
            pressStyle={{ opacity: 0.7 }}
            onPress={() => onSelect(option.value)}
            alignItems='flex-start'
            // @ts-ignore
            style={{
              transition: 'background-color 0.15s ease',
              backgroundColor: isSelected ? 'rgba(201, 169, 110, 0.06)' : 'transparent',
            }}
          >
            {/* 선택 인디케이터 */}
            <YStack
              width={2}
              alignSelf='stretch'
              minHeight={60}
              backgroundColor={isSelected ? '#c9a96e' : 'rgba(240, 235, 224, 0.15)'}
              // @ts-ignore
              style={{ transition: 'background-color 0.15s ease', flexShrink: 0 }}
            />

            {/* 콘텐츠 */}
            <YStack flex={1} gap='$2'>
              <XStack alignItems='center' gap='$3'>
                {/* 카드 수 레이블 */}
                <Text
                  fontFamily='$body'
                  fontSize={10}
                  fontWeight='500'
                  letterSpacing={3}
                  textTransform='uppercase'
                  color={isSelected ? '#c9a96e' : 'rgba(240, 235, 224, 0.4)'}
                  // @ts-ignore
                  style={{ transition: 'color 0.15s ease' }}
                >
                  {option.cardCount} cards
                </Text>

                {isSelected && (
                  <Text
                    fontFamily='$body'
                    fontSize={10}
                    letterSpacing={2}
                    textTransform='uppercase'
                    color='#c9a96e'
                    opacity={0.6}
                  >
                    ✦ selected
                  </Text>
                )}
              </XStack>

              {/* 스프레드 이름 */}
              <Text
                fontFamily='$heading'
                fontSize={22}
                fontWeight='300'
                letterSpacing={-0.5}
                color={isSelected ? '#f0ebe0' : 'rgba(240, 235, 224, 0.7)'}
                // @ts-ignore
                style={{ transition: 'color 0.15s ease' }}
              >
                {option.label}
              </Text>

              {/* 설명 */}
              <Text
                fontFamily='$body'
                fontSize={13}
                color='rgba(240, 235, 224, 0.45)'
                lineHeight={20}
                letterSpacing={0.2}
              >
                {option.description}
              </Text>
            </YStack>

            {/* 우측 번호 */}
            <Text
              fontFamily='$heading'
              fontSize={13}
              color={isSelected ? 'rgba(201, 169, 110, 0.5)' : 'rgba(240, 235, 224, 0.12)'}
              letterSpacing={1}
              // @ts-ignore
              style={{ transition: 'color 0.15s ease', flexShrink: 0, paddingTop: 2 }}
            >
              {String(index + 1).padStart(2, '0')}
            </Text>
          </XStack>
        )
      })}
    </YStack>
  )
}
