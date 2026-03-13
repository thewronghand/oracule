import { Paragraph, XStack, YStack, Text } from 'tamagui'
import { OraculeButton } from '@t4/ui/src/Button'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const queryLink = useLink({ href: '/query' })
  const fortuneLink = useLink({ href: '/fortune' })

  return (
    <YStack flex={1} backgroundColor='$background'>
      <YStack
        flex={1}
        maxWidth={640}
        width='100%'
        alignSelf='center'
        paddingHorizontal={24}
        paddingTop={80}
        paddingBottom={80}
        $gtSm={{ paddingHorizontal: 48, paddingTop: 120 }}
        gap='$0'
      >
        {/* 레이블 */}
        <Text
          fontFamily='$body'
          fontSize={11}
          fontWeight='500'
          letterSpacing={3}
          textTransform='uppercase'
          color='$colorFocus'
          opacity={0.45}
          marginBottom='$5'
        >
          AI Tarot Reading
        </Text>

        {/* 메인 타이틀 */}
        <Text
          fontFamily='$heading'
          fontSize={64}
          fontWeight='700'
          letterSpacing={-2}
          color='$color'
          lineHeight={68}
          marginBottom='$5'
          $xs={{ fontSize: 48, lineHeight: 52 }}
        >
          Oracule
        </Text>

        {/* 서브타이틀 */}
        <Text
          fontFamily='$body'
          fontSize={16}
          color='$colorFocus'
          opacity={0.65}
          lineHeight={26}
          marginBottom='$10'
          maxWidth={400}
        >
          AI 타로 리더가 당신의 질문에 답합니다
        </Text>

        {/* CTA */}
        <XStack gap='$3' flexWrap='wrap'>
          <OraculeButton
            {...queryLink}
            variant='primary'
            customSize='lg'
            minWidth={160}
          >
            타로 리딩 시작
          </OraculeButton>
          <OraculeButton
            {...fortuneLink}
            variant='secondary'
            customSize='lg'
            minWidth={160}
          >
            오늘의 운세
          </OraculeButton>
        </XStack>

        {/* 구분선 */}
        <YStack
          width={40}
          height={1}
          backgroundColor='$borderColor'
          marginTop='$12'
          marginBottom='$8'
        />

        {/* 특징 */}
        <YStack gap='$4'>
          {[
            { label: '78장 타로 덱', desc: '전통 라이더-웨이트 덱 기반' },
            { label: '5가지 스프레드', desc: '싱글, 쓰리카드, 켈틱 크로스 등' },
            { label: 'AI 해석', desc: 'Gemini 기반 맞춤형 타로 해석' },
          ].map((item) => (
            <XStack key={item.label} gap='$4' alignItems='flex-start'>
              <YStack width={4} height={4} borderRadius={2} backgroundColor='#e59c97' marginTop={8} flexShrink={0} />
              <YStack gap='$1'>
                <Text fontFamily='$body' fontSize={14} fontWeight='500' color='$color'>
                  {item.label}
                </Text>
                <Text fontFamily='$body' fontSize={13} color='$colorFocus' opacity={0.6}>
                  {item.desc}
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </YStack>
  )
}
