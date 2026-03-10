import { useEffect, useState } from 'react'
import { H1, Paragraph, XStack, YStack, Text, styled } from 'tamagui'
import { OraculeButton } from '@t4/ui/src/Button'
import { useLink } from 'solito/link'
import { Moon, Star, Sparkles } from '@tamagui/lucide-icons'

const GlowText = styled(H1, {
  textAlign: 'center',
  fontSize: '$12',
  fontWeight: '800',
  letterSpacing: 6,
  color: '$purple10',
})

const StarDot = styled(YStack, {
  position: 'absolute',
  borderRadius: 999,
  backgroundColor: '$yellow8',
  opacity: 0.7,
})

function DecorStar({
  size,
  top,
  left,
  right,
  bottom,
  opacity = 0.6,
}: {
  size: number
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  opacity?: number
}) {
  return (
    <StarDot
      width={size}
      height={size}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      opacity={opacity}
    />
  )
}

export function HomeScreen() {
  const queryLink = useLink({ href: '/query' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <YStack
      flex={1}
      jc='center'
      ai='center'
      p='$6'
      gap='$0'
      backgroundColor='$background'
      overflow='hidden'
    >
      {/* 배경 장식: 별 점들 */}
      <DecorStar size={3} top={60} left={40} opacity={0.5} />
      <DecorStar size={2} top={90} left={130} opacity={0.4} />
      <DecorStar size={4} top={120} right={50} opacity={0.6} />
      <DecorStar size={2} top={200} left={70} opacity={0.3} />
      <DecorStar size={3} top={180} right={100} opacity={0.5} />
      <DecorStar size={2} top={300} left={20} opacity={0.4} />
      <DecorStar size={3} top={350} right={30} opacity={0.35} />
      <DecorStar size={2} bottom={200} left={50} opacity={0.4} />
      <DecorStar size={3} bottom={160} right={60} opacity={0.5} />
      <DecorStar size={2} bottom={100} left={100} opacity={0.3} />
      <DecorStar size={4} bottom={80} right={40} opacity={0.4} />

      {/* 달 장식 (우측 상단) */}
      <YStack position='absolute' top={50} right={30} opacity={0.35}>
        <Moon size={40} color='#c4b5fd' />
      </YStack>

      {/* 별 장식 (좌측 하단) */}
      <YStack position='absolute' bottom={120} left={30} opacity={0.3}>
        <Star size={28} color='#fde68a' />
      </YStack>

      {/* 스파클 (좌측 상단) */}
      <YStack position='absolute' top={140} left={24} opacity={0.25}>
        <Sparkles size={22} color='#c4b5fd' />
      </YStack>

      {/* 메인 콘텐츠 */}
      <YStack ai='center' gap='$5' opacity={visible ? 1 : 0} y={visible ? 0 : 24}>
        {/* 스파클 아이콘 */}
        <XStack ai='center' gap='$2' opacity={0.8}>
          <Sparkles size={16} color='#c4b5fd' />
          <Text fontSize='$3' color='$purple8' letterSpacing={3} fontWeight='500'>
            TAROT READING
          </Text>
          <Sparkles size={16} color='#c4b5fd' />
        </XStack>

        {/* 타이틀 */}
        <YStack ai='center' gap='$2'>
          <GlowText>Oracule</GlowText>
          <Paragraph
            textAlign='center'
            size='$4'
            color='$purple7'
            letterSpacing={2}
            fontWeight='400'
          >
            신비로운 타로의 세계로
          </Paragraph>
        </YStack>

        {/* 구분선 */}
        <XStack ai='center' gap='$3' width={260} jc='center'>
          <YStack flex={1} height={1} backgroundColor='$purple6' opacity={0.4} />
          <Star size={12} color='#a78bfa' />
          <YStack flex={1} height={1} backgroundColor='$purple6' opacity={0.4} />
        </XStack>

        {/* 설명 */}
        <Paragraph
          textAlign='center'
          size='$4'
          color='$colorFocus'
          maxWidth={280}
          lineHeight='$6'
          opacity={0.85}
        >
          AI 타로 리더가 당신의 질문에 답합니다
        </Paragraph>

        {/* CTA 버튼 영역 */}
        <YStack ai='center' gap='$3' mt='$3'>
          {/* 버튼 글로우 효과 (뒤에 깔리는 레이어) */}
          <YStack position='relative' ai='center' jc='center'>
            <YStack
              position='absolute'
              width={240}
              height={60}
              borderRadius='$6'
              backgroundColor='$purple8'
              opacity={0.18}
              scale={1.08}
            />
            <OraculeButton {...queryLink} variant='primary' customSize='lg' minWidth={220}>
              타로 리딩 시작하기
            </OraculeButton>
          </YStack>
        </YStack>
      </YStack>

      {/* 하단 문구 */}
      <YStack position='absolute' bottom={40} ai='center' opacity={visible ? 0.45 : 0}>
        <Text fontSize='$2' color='$purple6' letterSpacing={1.5}>
          ✦ 별이 답을 알고 있습니다 ✦
        </Text>
      </YStack>
    </YStack>
  )
}
