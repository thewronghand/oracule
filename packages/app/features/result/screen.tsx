import React, { useState } from 'react'
import { Paragraph, ScrollView, Separator, XStack, YStack, Text, styled } from 'tamagui'
import { LoadingSpinner, OraculeButton, SpreadLayout } from '@t4/ui'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import { parseInterpretation } from 'app/utils/parseInterpretation'
import type { SpreadType } from 'app/types/spread'
import type { ReadingInterpretation } from 'app/types/reading'
import { Share2, RefreshCw, MessageCircle } from '@tamagui/lucide-icons'
import { shareToKakao } from 'app/utils/kakaoShare'
import { getCharacterById } from 'app/types/character'

const { useParam } = createParam<{ id: string }>()

const SectionLabel = styled(Text, {
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  letterSpacing: 4,
  textTransform: 'uppercase',
  color: '#c9a96e',
})

const Divider = styled(YStack, {
  width: '100%',
  height: 1,
  backgroundColor: '$borderColor',
  opacity: 0.5,
  marginVertical: '$6',
})

function InterpretationView({ interp }: { interp: ReadingInterpretation }) {
  const hasCardReadings = interp.cardReadings.length > 0

  return (
    <YStack gap='$6'>
      {/* 카드별 해석 */}
      {hasCardReadings && (
        <YStack gap='$4'>
          {interp.cardReadings.map((card, i) => (
            <YStack
              key={i}
              gap='$3'
              paddingVertical='$5'
              paddingHorizontal='$5'
              borderWidth={1}
              borderColor='$borderColor'
              borderLeftWidth={2}
              borderLeftColor='#c9a96e'
            >
              <XStack alignItems='center' gap='$3'>
                <Text
                  fontFamily='$body'
                  fontSize={10}
                  fontWeight='500'
                  letterSpacing={3}
                  textTransform='uppercase'
                  color='#c9a96e'
                >
                  {card.position}
                </Text>
                <YStack width={20} height={1} backgroundColor='$borderColor' opacity={0.5} />
                <Text
                  fontFamily='$heading'
                  fontSize={18}
                  fontWeight='400'
                  fontStyle='italic'
                  color='$color'
                >
                  {card.cardName}
                </Text>
              </XStack>
              <Paragraph fontFamily='$body' lineHeight='$6' fontSize='$3' color='$colorFocus'>
                {card.interpretation}
              </Paragraph>
            </YStack>
          ))}
        </YStack>
      )}

      {hasCardReadings && <Divider />}

      {/* 종합 해석 */}
      <YStack
        gap='$4'
        paddingVertical='$6'
        paddingHorizontal='$5'
        borderWidth={1}
        borderColor='rgba(201,169,110,0.3)'
        backgroundColor='rgba(201,169,110,0.04)'
      >
        <SectionLabel>{hasCardReadings ? '종합 해석' : '해석'}</SectionLabel>
        <Paragraph fontFamily='$body' lineHeight='$7' fontSize='$4' color='$color'>
          {interp.content}
        </Paragraph>
      </YStack>
    </YStack>
  )
}

export function ResultScreen(): React.ReactNode {
  const [id] = useParam('id')
  const [copied, setCopied] = useState(false)

  const readingQuery = trpc.reading.getById.useQuery({ id: id ?? '' }, { enabled: !!id })
  const queryLink = useLink({ href: '/query' })

  const handleShare = async () => {
    if (!readingQuery.data?.shareId) return
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = `${origin}/share/${readingQuery.data.shareId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 접근 불가 시 무시
    }
  }

  const handleKakaoShare = () => {
    if (!readingQuery.data?.shareId) return
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const shareUrl = `${origin}/share/${readingQuery.data.shareId}`
    const interp = parseInterpretation(readingQuery.data.interpretation)
    shareToKakao({
      title: interp.title,
      description: interp.summary || '나만의 타로 리딩 결과를 확인해보세요',
      shareUrl,
    })
  }

  const content = match(readingQuery)
    .with(error, () => (
      <YStack flex={1} alignItems='center' justifyContent='center' padding='$6' gap='$4'>
        <Paragraph fontFamily='$body' color='$red10' textAlign='center' fontSize='$4'>
          리딩 결과를 불러오지 못했습니다.
        </Paragraph>
      </YStack>
    ))
    .with(loading, () => (
      <YStack flex={1} alignItems='center' justifyContent='center'>
        <LoadingSpinner message='리딩 결과를 불러오는 중...' />
      </YStack>
    ))
    .with(success, () => {
      const reading = readingQuery.data
      if (!reading) return null

      const interp = parseInterpretation(reading.interpretation)
      const allIndices = reading.cards.map((_, i) => i)
      const character = getCharacterById(reading.characterId)

      return (
        <ScrollView flex={1}>
          <YStack
            maxWidth={720}
            width='100%'
            alignSelf='center'
            paddingHorizontal={48}
            paddingTop={56}
            paddingBottom={96}
            gap='$0'
            $xs={{ paddingHorizontal: '$5', paddingTop: '$8' }}
            $sm={{ paddingHorizontal: '$6' }}
          >
            {/* 페이지 헤더 */}
            <YStack marginBottom='$8' gap='$2'>
              <SectionLabel>Reading Result</SectionLabel>
              <Text
                fontFamily='$heading'
                fontSize={48}
                fontWeight='300'
                letterSpacing={-1}
                color='$color'
                lineHeight={50}
                $xs={{ fontSize: 36, lineHeight: 38 }}
              >
                {interp.title}
              </Text>
              {interp.summary && (
                <Text
                  fontFamily='$heading'
                  fontSize={18}
                  fontStyle='italic'
                  color='#c9a96e'
                  letterSpacing={0.3}
                  marginTop='$1'
                >
                  {interp.summary}
                </Text>
              )}
              {character.id !== 'default' && (
                <XStack alignItems='center' gap='$2' marginTop='$2'>
                  <Text fontSize={16}>{character.emoji}</Text>
                  <Text fontFamily='$body' fontSize='$2' color='$colorFocus' letterSpacing={0.3}>
                    {character.name}의 해석
                  </Text>
                </XStack>
              )}
            </YStack>

            <Divider />

            {/* 질문 박스 */}
            <YStack
              paddingVertical='$5'
              paddingHorizontal='$6'
              borderWidth={1}
              borderColor='rgba(201,169,110,0.4)'
              marginBottom='$0'
            >
              <Text
                fontFamily='$body'
                fontSize={10}
                fontWeight='500'
                letterSpacing={4}
                textTransform='uppercase'
                color='#c9a96e'
                marginBottom='$3'
              >
                질문
              </Text>
              <Text
                fontFamily='$heading'
                fontSize={22}
                fontWeight='400'
                color='$color'
                lineHeight={30}
                fontStyle='italic'
              >
                {reading.question}
              </Text>
            </YStack>

            <Divider />

            {/* 스프레드 레이아웃 */}
            <SpreadLayout
              spreadType={reading.spreadType as SpreadType}
              cards={reading.cards}
              revealedIndices={allIndices}
            />

            <Divider />

            {/* 해석 */}
            <InterpretationView interp={interp} />

            <Divider />

            {/* 액션 버튼 */}
            <XStack gap='$3' flexWrap='wrap' justifyContent='flex-end'>
              {reading.shareId && (
                <>
                  <OraculeButton
                    variant='secondary'
                    customSize='md'
                    onPress={handleShare}
                    borderColor='$borderColor'
                  >
                    <XStack alignItems='center' gap='$2'>
                      <Share2 size={13} color='$colorFocus' />
                      <Text fontFamily='$body' fontSize='$2' color='$colorFocus' letterSpacing={1.5} textTransform='uppercase'>
                        {copied ? '복사됨 ✓' : '링크 복사'}
                      </Text>
                    </XStack>
                  </OraculeButton>
                  <OraculeButton
                    variant='secondary'
                    customSize='md'
                    onPress={handleKakaoShare}
                    borderColor='rgba(201,169,110,0.4)'
                  >
                    <XStack alignItems='center' gap='$2'>
                      <MessageCircle size={13} color='#c9a96e' />
                      <Text fontFamily='$body' fontSize='$2' color='#c9a96e' letterSpacing={1.5} textTransform='uppercase'>
                        카카오 공유
                      </Text>
                    </XStack>
                  </OraculeButton>
                </>
              )}
              <OraculeButton variant='primary' customSize='md' {...queryLink}>
                <XStack alignItems='center' gap='$2'>
                  <RefreshCw size={13} color='$background' />
                  <Text fontFamily='$body' fontSize='$2' color='$background' letterSpacing={1.5} textTransform='uppercase'>
                    새 리딩
                  </Text>
                </XStack>
              </OraculeButton>
            </XStack>
          </YStack>
        </ScrollView>
      )
    })
    .otherwise(() => null)

  return (
    <YStack flex={1} backgroundColor='$background'>
      {content}
    </YStack>
  )
}
