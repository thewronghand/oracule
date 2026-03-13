import { XStack, YStack, Text } from 'tamagui'
import { OraculeButton } from '@t4/ui/src/Button'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const queryLink = useLink({ href: '/query' })
  const fortuneLink = useLink({ href: '/fortune' })

  return (
    <YStack flex={1} backgroundColor='$background'>
      {/* 히어로 섹션 — 라이트 */}
      <YStack
        width='100%'
        maxWidth={640}
        alignSelf='center'
        paddingHorizontal={24}
        paddingTop={80}
        paddingBottom={72}
        $gtSm={{ paddingHorizontal: 48, paddingTop: 120 }}
      >
        <Text
          fontFamily='$body'
          fontSize={11}
          fontWeight='500'
          letterSpacing={3}
          textTransform='uppercase'
          color='$colorFocus'
          opacity={0.4}
          marginBottom='$5'
        >
          AI Tarot Reading
        </Text>

        <Text
          fontFamily='$heading'
          fontSize={72}
          fontWeight='800'
          letterSpacing={-3}
          color='$color'
          lineHeight={72}
          marginBottom='$6'
          $xs={{ fontSize: 52, lineHeight: 54 }}
        >
          Oracule
        </Text>

        <Text
          fontFamily='$body'
          fontSize={16}
          color='$colorFocus'
          opacity={0.6}
          lineHeight={26}
          marginBottom='$8'
          maxWidth={380}
        >
          AI 타로 리더가 당신의 질문에 답합니다
        </Text>

        <XStack gap='$3' flexWrap='wrap'>
          <OraculeButton {...queryLink} variant='primary' customSize='lg' minWidth={160}>
            타로 리딩 시작
          </OraculeButton>
          <OraculeButton {...fortuneLink} variant='secondary' customSize='lg' minWidth={160}>
            오늘의 운세
          </OraculeButton>
        </XStack>
      </YStack>

      {/* 피처 섹션 — 다크 */}
      <YStack
        width='100%'
        backgroundColor='#0a0a0a'
        paddingVertical={56}
      >
        <YStack
          maxWidth={640}
          width='100%'
          alignSelf='center'
          paddingHorizontal={24}
          $gtSm={{ paddingHorizontal: 48 }}
          gap='$6'
        >
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={3}
            textTransform='uppercase'
            color='rgba(255,255,255,0.35)'
          >
            Features
          </Text>

          <YStack gap='$0'>
            {[
              { label: '78장 타로 덱', desc: '전통 라이더-웨이트 덱 기반' },
              { label: '5가지 스프레드', desc: '싱글, 쓰리카드, 켈틱 크로스 등' },
              { label: 'AI 해석', desc: 'Gemini 기반 맞춤형 타로 해석' },
              { label: '오늘의 운세', desc: '매일 새로운 카드와 함께하는 하루' },
            ].map((item, i) => (
              <XStack
                key={item.label}
                paddingVertical='$5'
                borderTopWidth={i === 0 ? 0 : 1}
                borderTopColor='rgba(255,255,255,0.06)'
                alignItems='center'
                justifyContent='space-between'
              >
                <YStack gap='$1'>
                  <Text fontFamily='$body' fontSize={15} fontWeight='500' color='#ffffff'>
                    {item.label}
                  </Text>
                  <Text fontFamily='$body' fontSize={13} color='rgba(255,255,255,0.45)'>
                    {item.desc}
                  </Text>
                </YStack>
                <YStack
                  width={6}
                  height={6}
                  borderRadius={3}
                  backgroundColor='#e59c97'
                  flexShrink={0}
                />
              </XStack>
            ))}
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  )
}
