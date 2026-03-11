import { useEffect, useState } from 'react'
import { H1, Paragraph, XStack, YStack, Text, styled } from 'tamagui'
import { OraculeButton } from '@t4/ui/src/Button'
import { useLink } from 'solito/link'

const GlowText = styled(H1, {
  textAlign: 'center',
  fontSize: '$12',
  fontWeight: '800',
  letterSpacing: 6,
  color: '$purple10',
})

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
      {/* 메인 콘텐츠 */}
      <YStack ai='center' gap='$5' opacity={visible ? 1 : 0} y={visible ? 0 : 24}>
        <Text fontSize='$3' color='$purple8' letterSpacing={3} fontWeight='500' opacity={0.8}>
          TAROT READING
        </Text>

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
        <YStack width={260} height={1} backgroundColor='$purple6' opacity={0.2} />

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
          당신의 이야기를 들려주세요
        </Text>
      </YStack>
    </YStack>
  )
}
