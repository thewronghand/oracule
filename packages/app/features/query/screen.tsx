import { useState } from 'react'
import { H2, Paragraph, ScrollView, Separator, XStack, YStack, Text } from 'tamagui'
import { OraculeButton, OraculeTextArea, SpreadSelector } from '@t4/ui'
import type { SpreadType } from 'app/types/spread'
import { useRouter } from 'solito/router'
import { Sparkles, MessageCircle } from '@tamagui/lucide-icons'

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
        paddingBottom="$10"
        animation="fadeIn"
        enterStyle={{ opacity: 0, y: 16 }}
      >
        {/* 스프레드 선택 섹션 */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Sparkles size={18} color="var(--accentBackground)" />
            <H2 color="$accentBackground">어떤 스프레드로 볼까요?</H2>
          </XStack>
          <Paragraph fontSize="$3" color="$colorSubtle">
            질문의 성격에 맞는 스프레드를 선택해보세요
          </Paragraph>
        </YStack>

        <SpreadSelector selectedSpread={selectedSpread} onSelect={setSelectedSpread} />

        {/* 장식 구분선 */}
        <XStack alignItems="center" gap="$3">
          <Separator flex={1} borderColor="$borderColor" />
          <Text fontSize="$2" color="$accentBackground">✦</Text>
          <Separator flex={1} borderColor="$borderColor" />
        </XStack>

        {/* 질문 입력 섹션 */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <MessageCircle size={18} color="var(--accentBackground)" />
            <H2 color="$accentBackground">질문을 입력해주세요</H2>
          </XStack>
          <Paragraph fontSize="$3" color="$colorSubtle">
            카드에게 솔직하게 물어보세요. 구체적일수록 깊은 해석이 가능합니다.
          </Paragraph>
        </YStack>

        {/* 예시 질문 힌트 */}
        <YStack gap="$2">
          <Paragraph fontSize="$2" color="$colorSubtle" letterSpacing={1}>
            예시 질문
          </Paragraph>
          <YStack gap="$2">
            {EXAMPLE_QUESTIONS.map((q) => (
              <YStack
                key={q}
                backgroundColor="$backgroundHover"
                borderRadius="$3"
                padding="$3"
                borderWidth={1}
                borderColor={question === q ? '$accentBackground' : '$borderColor'}
                pressStyle={{ opacity: 0.7, scale: 0.99 }}
                onPress={() => handleExampleQuestion(q)}
                animation="quick"
              >
                <Text fontSize="$3" color={question === q ? '$accentBackground' : '$colorSubtle'}>
                  {q}
                </Text>
              </YStack>
            ))}
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
          opacity={question.trim() === '' ? 0.5 : 1}
          animation="quick"
        >
          카드 뽑기
        </OraculeButton>
      </YStack>
    </ScrollView>
  )
}
