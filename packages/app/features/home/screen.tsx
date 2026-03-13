import { XStack, YStack, Text } from 'tamagui'
import { OraculeButton } from '@t4/ui/src/Button'
import { useLink } from 'solito/link'

// Unsplash 밤하늘 이미지들 (타로 감성)
// https://unsplash.com/photos/starry-night-sky
const HERO_IMAGE = 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1600&q=80&auto=format&fit=crop'

export function HomeScreen() {
  const queryLink = useLink({ href: '/query' })
  const fortuneLink = useLink({ href: '/fortune' })

  return (
    <YStack flex={1} backgroundColor='$background'>
      {/* 히어로 섹션 — 밤하늘 풀블리드 */}
      <YStack
        position='relative'
        minHeight={520}
        $gtSm={{ minHeight: 620 }}
        overflow='hidden'
      >
        {/* 배경 이미지 */}
        <YStack
          position='absolute'
          top={0} left={0} right={0} bottom={0}
          // @ts-ignore
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* 다크 오버레이 — 텍스트 가독성 */}
        <YStack
          position='absolute'
          top={0} left={0} right={0} bottom={0}
          // @ts-ignore
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.88) 100%)',
          }}
        />

        {/* 콘텐츠 */}
        <YStack
          flex={1}
          width='100%'
          maxWidth={640}
          alignSelf='center'
          paddingHorizontal={24}
          paddingTop={80}
          paddingBottom={72}
          $gtSm={{ paddingHorizontal: 48, paddingTop: 120 }}
          justifyContent='flex-end'
        >
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={3}
            textTransform='uppercase'
            color='rgba(255,255,255,0.45)'
            marginBottom='$5'
          >
            AI Tarot Reading
          </Text>

          <Text
            fontFamily='$heading'
            fontSize={72}
            fontWeight='800'
            letterSpacing={-3}
            color='#ffffff'
            lineHeight={72}
            marginBottom='$6'
            $xs={{ fontSize: 52, lineHeight: 54 }}
          >
            Oracule
          </Text>

          <Text
            fontFamily='$body'
            fontSize={16}
            color='rgba(255,255,255,0.65)'
            lineHeight={26}
            marginBottom='$8'
            maxWidth={380}
          >
            AI 타로 리더가 당신의 질문에 답합니다
          </Text>

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
              customSize='lg'
              minWidth={160}
              // @ts-ignore
              style={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.35)',
                color: '#ffffff',
                borderRadius: 8,
              }}
            >
              오늘의 운세
            </OraculeButton>
          </XStack>
        </YStack>
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
