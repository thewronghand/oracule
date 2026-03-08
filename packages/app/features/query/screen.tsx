import { useState } from 'react'
import { Separator, H2, ScrollView, YStack } from 'tamagui'
import { OraculeButton, OraculeTextArea, SpreadSelector } from '@t4/ui'
import type { SpreadType } from 'app/types/spread'
import { useRouter } from 'solito/router'

export function QueryScreen() {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('SINGLE')
  const [question, setQuestion] = useState('')
  const router = useRouter()

  const handleDraw = () => {
    router.push(`/draw?spreadType=${selectedSpread}&question=${encodeURIComponent(question)}`)
  }

  return (
    <ScrollView>
      <YStack padding="$4" gap="$6" paddingBottom="$8">
        <H2>어떤 스프레드로 볼까요?</H2>

        <SpreadSelector selectedSpread={selectedSpread} onSelect={setSelectedSpread} />

        <Separator />

        <H2>질문을 입력해주세요</H2>

        <OraculeTextArea
          placeholder="카드에게 물어볼 질문을 입력해주세요"
          value={question}
          onChangeText={setQuestion}
        />

        <OraculeButton
          variant="primary"
          customSize="lg"
          onPress={handleDraw}
          disabled={question.trim() === ''}
          opacity={question.trim() === '' ? 0.5 : 1}
        >
          카드 뽑기
        </OraculeButton>
      </YStack>
    </ScrollView>
  )
}
