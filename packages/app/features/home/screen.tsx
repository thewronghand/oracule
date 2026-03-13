import { useEffect, useState } from 'react'
import { Paragraph, XStack, YStack, Text, styled } from 'tamagui'
import { OraculeButton } from '@t4/ui/src/Button'
import { useLink } from 'solito/link'

// 에디토리얼 타이틀 — Cormorant Garamond 세리프
const HeroTitle = styled(Text, {
  fontFamily: '$heading',
  fontSize: 96,
  fontWeight: '300',
  letterSpacing: -2,
  color: '#f0ebe0',
  lineHeight: 88,
  $xs: { fontSize: 56, lineHeight: 52 },
  $sm: { fontSize: 72, lineHeight: 66 },
})

const HeroSubtitle = styled(Text, {
  fontFamily: '$heading',
  fontSize: 20,
  fontWeight: '300',
  fontStyle: 'italic',
  letterSpacing: 1,
  color: '#c9a96e',
  $xs: { fontSize: 16 },
})

const Label = styled(Text, {
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  letterSpacing: 4,
  textTransform: 'uppercase',
  color: '#c9a96e',
  opacity: 0.9,
})

export function HomeScreen() {
  const queryLink = useLink({ href: '/query' })
  const fortuneLink = useLink({ href: '/fortune' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <YStack flex={1} backgroundColor='$background' overflow='hidden'>
      {/* 풀블리드 히어로 이미지 영역 */}
      <YStack
        position='relative'
        flex={1}
        minHeight={600}
        $gtMd={{ minHeight: 700 }}
      >
        {/* Unsplash 배경 — 신비로운 달빛 숲/타로 분위기 */}
        <YStack
          position='absolute'
          top={0} left={0} right={0} bottom={0}
          // @ts-ignore
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />

        {/* 다크 그라데이션 오버레이 — 하단에서 텍스트 가독성 */}
        <YStack
          position='absolute'
          top={0} left={0} right={0} bottom={0}
          // @ts-ignore
          style={{
            background: 'linear-gradient(to bottom, rgba(14,13,11,0.3) 0%, rgba(14,13,11,0.55) 50%, rgba(14,13,11,0.95) 100%)',
          }}
        />

        {/* 좌측 세로 라인 + 에디토리얼 넘버링 */}
        <YStack
          position='absolute'
          left={40}
          top={0}
          bottom={0}
          width={1}
          backgroundColor='rgba(201, 169, 110, 0.2)'
          $xs={{ display: 'none' }}
        />

        {/* 콘텐츠 레이어 */}
        <YStack
          flex={1}
          justifyContent='flex-end'
          paddingHorizontal={48}
          paddingBottom={72}
          gap='$0'
          opacity={visible ? 1 : 0}
          y={visible ? 0 : 32}
          animation='lazy'
          $xs={{ paddingHorizontal: '$5', paddingBottom: 56 }}
        >
          {/* 에디토리얼 라벨 */}
          <XStack alignItems='center' gap='$3' marginBottom='$5'>
            <YStack width={32} height={1} backgroundColor='#c9a96e' opacity={0.7} />
            <Label>AI Tarot Reading</Label>
          </XStack>

          {/* 메인 타이틀 */}
          <HeroTitle>Ora&shy;cule</HeroTitle>

          {/* 이탤릭 서브타이틀 */}
          <HeroSubtitle marginTop='$3' marginBottom='$8'>
            신비로운 타로의 세계로
          </HeroSubtitle>

          {/* CTA 영역 */}
          <XStack gap='$4' flexWrap='wrap'>
            <OraculeButton
              {...queryLink}
              variant='primary'
              customSize='lg'
              minWidth={180}
            >
              타로 리딩 시작
            </OraculeButton>
            <OraculeButton
              {...fortuneLink}
              variant='secondary'
              customSize='lg'
              minWidth={180}
              borderColor='rgba(201,169,110,0.5)'
              color='#c9a96e'
            >
              오늘의 운세
            </OraculeButton>
          </XStack>

          {/* 하단 설명 */}
          <Paragraph
            fontFamily='$body'
            fontSize='$2'
            color='$colorFocus'
            marginTop='$6'
            opacity={0.6}
            letterSpacing={0.3}
          >
            AI 타로 리더가 당신의 질문에 답합니다
          </Paragraph>
        </YStack>
      </YStack>
    </YStack>
  )
}
