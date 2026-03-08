import { H1, Paragraph, YStack } from 'tamagui'
import { OraculeButton } from '@t4/ui'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const queryLink = useLink({ href: '/query' })

  return (
    <YStack
      flex={1}
      jc="center"
      ai="center"
      p="$6"
      gap="$6"
      backgroundColor="$background"
    >
      <YStack ai="center" gap="$3">
        <H1
          textAlign="center"
          fontSize="$10"
          fontWeight="700"
          letterSpacing={2}
          color="$color"
        >
          Oracule
        </H1>
        <Paragraph
          textAlign="center"
          size="$5"
          color="$colorPress"
          letterSpacing={1}
        >
          타로 카드 리딩 서비스
        </Paragraph>
      </YStack>

      <Paragraph
        textAlign="center"
        size="$4"
        color="$colorFocus"
        maxWidth={320}
        lineHeight="$5"
      >
        AI 타로 리더가 당신의 질문에 답합니다
      </Paragraph>

      <OraculeButton
        {...queryLink}
        variant="primary"
        customSize="lg"
        minWidth={220}
      >
        타로 리딩 시작하기
      </OraculeButton>
    </YStack>
  )
}
