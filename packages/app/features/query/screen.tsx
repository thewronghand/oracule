import { useState } from 'react'
import { H2, Paragraph, ScrollView, Separator, XStack, YStack, Text } from 'tamagui'
import { OraculeButton, OraculeTextArea, SpreadSelector } from '@t4/ui'
import type { SpreadType } from 'app/types/spread'
import { useRouter } from 'solito/router'
import { Sparkles, MessageCircle, Star } from '@tamagui/lucide-icons'

const EXAMPLE_QUESTIONS = [
  '지금 내 커리어 방향은 올바른가요?',
  '이 관계에서 내가 놓치고 있는 것은?',
  '앞으로 한 달간 집중해야 할 것은?',
]

export function QueryScreen() {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('SINGLE')
  const [question, setQuestion] = useState('')
  const router = useRouter()

  const handleDraw = () => {
    router.push(`/draw?spreadType=${selectedSpread}&question=${encodeURIComponent(question)}`)
  }

  const handleExampleQuestion = (q: string) => {
    setQuestion(q)
  }

  return (
    <ScrollView backgroundColor="$background">
      <YStack
        padding="$4"
        gap="$6"
        paddingBottom="$12"

      >
        {/* 스프레드 선택 섹션 */}
        <YStack gap="$3" paddingTop="$2">
          <XStack alignItems="center" gap="$2">
            <Sparkles size={20} color="$accentBackground" />
            <H2 color="$accentBackground" letterSpacing={0.5}>어떤 스프레드로 볼까요?</H2>
          </XStack>
          <Paragraph fontSize="$3" color="$colorSubtle" paddingLeft="$1">
            질문의 성격에 맞는 스프레드를 선택해보세요
          </Paragraph>
        </YStack>

        <YStack

        >
          <SpreadSelector selectedSpread={selectedSpread} onSelect={setSelectedSpread} />
        </YStack>

        {/* 장식 구분선 */}
        <XStack alignItems="center" gap="$3">
          <Separator flex={1} borderColor="$yellow8" opacity={0.2} />
          <XStack gap="$2" alignItems="center">
            <Text fontSize="$2" color="$yellow8" opacity={0.4}>✦</Text>
            <Text fontSize="$3" color="$accentBackground">✦</Text>
            <Text fontSize="$2" color="$yellow8" opacity={0.4}>✦</Text>
          </XStack>
          <Separator flex={1} borderColor="$yellow8" opacity={0.2} />
        </XStack>

        {/* 질문 입력 섹션 */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <MessageCircle size={20} color="$accentBackground" />
            <H2 color="$accentBackground" letterSpacing={0.5}>질문을 입력해주세요</H2>
          </XStack>
          <Paragraph fontSize="$3" color="$colorSubtle" paddingLeft="$1">
            카드에게 솔직하게 물어보세요. 구체적일수록 깊은 해석이 가능합니다.
          </Paragraph>
        </YStack>

        {/* 예시 질문 힌트 */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Star size={13} color="$yellow8" />
            <Paragraph fontSize="$2" color="$colorSubtle" letterSpacing={1.5} textTransform="uppercase">
              예시 질문
            </Paragraph>
          </XStack>
          <YStack gap="$2">
            {EXAMPLE_QUESTIONS.map((q) => {
              const isSelected = question === q
              return (
                <YStack
                  key={q}
                  backgroundColor={isSelected ? '$purple10' : '$backgroundHover'}
                  borderRadius="$3"
                  padding="$3"
                  paddingHorizontal="$4"
                  borderWidth={isSelected ? 1.5 : 1}
                  borderColor={isSelected ? '$yellow8' : '$borderColor'}
                  pressStyle={{ opacity: 0.7, scale: 0.99 }}
                  onPress={() => handleExampleQuestion(q)}
                  cursor="pointer"
                >
                  <XStack alignItems="center" gap="$2">
                    {isSelected && <Star size={12} color="$yellow8" />}
                    <Text
                      flex={1}
                      fontSize="$3"
                      color={isSelected ? '$color' : '$colorSubtle'}
                      fontWeight={isSelected ? '600' : '400'}
                    >
                      {q}
                    </Text>
                  </XStack>
                </YStack>
              )
            })}
          </YStack>
        </YStack>

        {/* 직접 입력 */}
        <YStack gap="$2">
          <OraculeTextArea
            placeholder="또는 직접 질문을 입력해주세요..."
            value={question}
            onChangeText={setQuestion}
          />
          {question.trim() === '' && (
            <Paragraph fontSize="$2" color="$colorSubtle" paddingHorizontal="$1">
              질문을 입력해야 카드를 뽑을 수 있어요
            </Paragraph>
          )}
        </YStack>

        <OraculeButton
          variant="primary"
          customSize="lg"
          onPress={handleDraw}
          disabled={question.trim() === ''}
          opacity={question.trim() === '' ? 0.45 : 1}
        >
          카드 뽑기
        </OraculeButton>
      </YStack>
    </ScrollView>
  )
}
