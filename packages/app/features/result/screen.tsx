import React, { useState, useEffect } from 'react'
import { Paragraph, ScrollView, XStack, YStack, Text, styled } from 'tamagui'
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

const Divider = styled(YStack, {
  width: '100%',
  height: 1,
  backgroundColor: '$borderColor',
  marginVertical: '$6',
})

function InterpretationView({ interp }: { interp: ReadingInterpretation }) {
  const hasCardReadings = interp.cardReadings.length > 0

  return (
    <YStack gap='$5'>
      {/* 카드별 해석 */}
      {hasCardReadings && (
        <YStack gap='$0'>
          {interp.cardReadings.map((card, i) => (
            <YStack
              key={card.position ?? i}
              gap='$3'
              paddingVertical='$5'
              borderBottomWidth={1}
              borderBottomColor='rgba(0,0,0,0.07)'
            >
              <XStack alignItems='center' gap='$3'>
                <Text
                  fontFamily='$body'
                  fontSize={10}
                  fontWeight='500'
                  letterSpacing={2}
                  textTransform='uppercase'
                  color='$colorFocus'
                  opacity={0.6}
                >
                  {card.position}
                </Text>
                <YStack width={1} height={12} backgroundColor='rgba(0,0,0,0.12)' />
                <Text
                  fontFamily='$heading'
                  fontSize={16}
                  fontWeight='400'
                  fontStyle='italic'
                  color='$color'
                >
                  {card.cardName}
                </Text>
              </XStack>
              <Paragraph fontFamily='$body' lineHeight={24} fontSize={14} color='$colorFocus' opacity={0.8}>
                {card.interpretation}
              </Paragraph>
            </YStack>
          ))}
        </YStack>
      )}

      {hasCardReadings && <Divider />}

      {/* 종합 해석 */}
      <YStack gap='$3'>
        <Text
          fontFamily='$body'
          fontSize={11}
          fontWeight='500'
          letterSpacing={2}
          textTransform='uppercase'
          color='$colorFocus'
          opacity={0.6}
        >
          {hasCardReadings ? '종합 해석' : '해석'}
        </Text>
        <Paragraph fontFamily='$body' lineHeight={26} fontSize={14} color='$colorFocus' opacity={0.85}>
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
        <Paragraph fontFamily='$body' color='$red10' textAlign='center' fontSize={14}>
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
            maxWidth={640}
            width='100%'
            alignSelf='center'
            paddingHorizontal={24}
            paddingTop={40}
            paddingBottom={80}
            gap='$0'
            $gtSm={{ paddingHorizontal: 48, paddingTop: 56 }}
          >
            {/* 페이지 헤더 */}
            <YStack
              marginBottom='$8'
              gap='$2'
              // @ts-ignore
              style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
            >
              <Text
                fontFamily='$body'
                fontSize={11}
                fontWeight='500'
                letterSpacing={3}
                textTransform='uppercase'
                color='$colorFocus'
                opacity={0.6}
                marginBottom='$2'
              >
                Reading Result
              </Text>
              <Text
                fontFamily='$heading'
                fontSize={34}
                fontWeight='300'
                letterSpacing={-0.5}
                color='$color'
                lineHeight={40}
              >
                {interp.title}
              </Text>
              {interp.summary && (
                <Text
                  fontFamily='$body'
                  fontSize={14}
                  color='$colorFocus'
                  opacity={0.65}
                  marginTop='$1'
                  lineHeight={22}
                >
                  {interp.summary}
                </Text>
              )}
              {character.id !== 'default' && (
                <XStack alignItems='center' gap='$2' marginTop='$2'>
                  <Text fontSize={14}>{character.emoji}</Text>
                  <Text fontFamily='$body' fontSize={12} color='$colorFocus' opacity={0.5}>
                    {character.name}의 해석
                  </Text>
                </XStack>
              )}
            </YStack>

            <Divider />

            {/* 질문 */}
            <YStack marginBottom='$0' gap='$2'
              // @ts-ignore
              style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
            >
              <Text
                fontFamily='$body'
                fontSize={11}
                fontWeight='500'
                letterSpacing={2}
                textTransform='uppercase'
                color='$colorFocus'
                opacity={0.6}
              >
                질문
              </Text>
              <Text
                fontFamily='$heading'
                fontSize={20}
                fontWeight='400'
                color='$color'
                lineHeight={28}
                fontStyle='italic'
              >
                {reading.question}
              </Text>
            </YStack>

            <Divider />

            {/* 스프레드 레이아웃 */}
            <YStack
              // @ts-ignore
              style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}
            >
              <SpreadLayout
                spreadType={reading.spreadType as SpreadType}
                cards={reading.cards}
                revealedIndices={allIndices}
              />
            </YStack>

            <Divider />

            {/* 해석 */}
            <YStack
              // @ts-ignore
              style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.3s both' }}
            >
              <InterpretationView interp={interp} />
            </YStack>

            <Divider />

            {/* 액션 버튼 */}
            <XStack gap='$3' flexWrap='wrap' justifyContent='flex-end'>
              {reading.shareId && (
                <>
                  <OraculeButton
                    variant='secondary'
                    customSize='md'
                    onPress={handleShare}
                    borderColor='rgba(0,0,0,0.10)'
                  >
                    <XStack alignItems='center' gap='$2'>
                      <Share2 size={16} color='$colorFocus' />
                      <Text fontFamily='$body' fontSize={12} color='$colorFocus' letterSpacing={1}>
                        {copied ? '복사됨 ✓' : '링크 복사'}
                      </Text>
                    </XStack>
                  </OraculeButton>
                  <OraculeButton
                    variant='secondary'
                    customSize='md'
                    onPress={handleKakaoShare}
                    borderColor='rgba(229,156,151,0.3)'
                  >
                    <XStack alignItems='center' gap='$2'>
                      <MessageCircle size={16} color='#e59c97' />
                      <Text fontFamily='$body' fontSize={12} color='#e59c97' letterSpacing={1}>
                        카카오 공유
                      </Text>
                    </XStack>
                  </OraculeButton>
                </>
              )}
              <OraculeButton variant='primary' customSize='md' {...queryLink}>
                <XStack alignItems='center' gap='$2'>
                  <RefreshCw size={16} color='$background' />
                  <Text fontFamily='$body' fontSize={12} color='$background' letterSpacing={1}>
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

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <YStack flex={1} backgroundColor='$background'>
      {content}
    </YStack>
  )
}
