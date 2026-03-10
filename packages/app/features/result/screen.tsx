import React, { useState } from 'react'
import { H2, H3, Paragraph, ScrollView, Separator, XStack, YStack, Text } from 'tamagui'
import { LoadingSpinner, OraculeButton, SpreadLayout } from '@t4/ui'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import { parseInterpretation } from 'app/utils/parseInterpretation'
import type { SpreadType } from 'app/types/spread'
import type { ReadingInterpretation } from 'app/types/reading'
import { Quote, Share2, Sparkles, RefreshCw, Star, MessageCircle } from '@tamagui/lucide-icons'
import { shareToKakao } from 'app/utils/kakaoShare'
import { getCharacterById } from 'app/types/character'

const { useParam } = createParam<{ id: string }>()

function InterpretationView({ interp }: { interp: ReadingInterpretation }) {
  const hasCardReadings = interp.cardReadings.length > 0

  return (
    <YStack gap='$4'>
      {/* 카드별 해석 */}
      {hasCardReadings && (
        <YStack gap='$4'>
          {interp.cardReadings.map((card, i) => (
            <YStack
              key={i}
              gap='$2'
              backgroundColor='$backgroundHover'
              borderRadius='$4'
              padding='$4'
              borderWidth={1}
              borderColor='$borderColor'
              borderLeftWidth={3}
              borderLeftColor='$yellow8'
            >
              <XStack alignItems='center' gap='$2'>
                <Text color='$yellow8' fontSize='$2' fontWeight='700'>
                  {card.position}
                </Text>
                <Text color='$colorSubtle' fontSize='$2'>
                  —
                </Text>
                <Text color='$accentBackground' fontSize='$2' fontWeight='600'>
                  {card.cardName}
                </Text>
              </XStack>
              <Paragraph lineHeight='$6' fontSize='$3' color='$color'>
                {card.interpretation}
              </Paragraph>
            </YStack>
          ))}
        </YStack>
      )}

      {/* 장식 구분선 (카드별 해석이 있을 때만) */}
      {hasCardReadings && (
        <XStack alignItems='center' gap='$3'>
          <Separator flex={1} borderColor='$yellow8' opacity={0.2} />
          <XStack gap='$2' alignItems='center'>
            <Text fontSize='$2' color='$yellow8' opacity={0.4}>
              ✦
            </Text>
            <Text fontSize='$3' color='$accentBackground'>
              ✦
            </Text>
            <Text fontSize='$2' color='$yellow8' opacity={0.4}>
              ✦
            </Text>
          </XStack>
          <Separator flex={1} borderColor='$yellow8' opacity={0.2} />
        </XStack>
      )}

      {/* 종합 해석 */}
      <YStack
        gap='$4'
        backgroundColor='$backgroundHover'
        borderRadius='$4'
        padding='$5'
        borderWidth={1}
        borderColor='$borderColor'
        borderLeftWidth={3}
        borderLeftColor='$accentBackground'
      >
        <XStack alignItems='center' gap='$2'>
          <Sparkles size={14} color='$accentBackground' />
          <H3 color='$accentBackground' fontSize='$2' textTransform='uppercase' letterSpacing={3}>
            {hasCardReadings ? '종합 해석' : '해석'}
          </H3>
        </XStack>
        <Paragraph lineHeight='$7' fontSize='$4' color='$color'>
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
        <Star size={32} color='$red8' opacity={0.5} />
        <Paragraph color='$red10' textAlign='center' fontSize='$4'>
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
          <YStack padding='$4' gap='$6' paddingBottom='$12'>
            {/* 제목 */}
            <YStack alignItems='center' gap='$3' paddingTop='$2'>
              <XStack alignItems='center' gap='$3'>
                <Sparkles size={20} color='$accentBackground' />
                <H2 textAlign='center' color='$accentBackground' letterSpacing={1}>
                  타로 리딩 결과
                </H2>
                <Sparkles size={20} color='$accentBackground' />
              </XStack>
              {character.id !== 'default' && (
                <XStack alignItems='center' gap='$2'>
                  <Text fontSize={18}>{character.emoji}</Text>
                  <Text fontSize='$3' color='$colorSubtle' fontWeight='500'>
                    {character.name}의 해석
                  </Text>
                </XStack>
              )}
              <XStack alignItems='center' gap='$2' width={160}>
                <YStack flex={1} height={1} backgroundColor='$yellow8' opacity={0.4} />
                <Star size={10} color='$yellow8' />
                <YStack flex={1} height={1} backgroundColor='$yellow8' opacity={0.4} />
              </XStack>
            </YStack>

            {/* 질문 박스 */}
            <YStack
              backgroundColor='$purple10'
              borderRadius='$4'
              padding='$5'
              gap='$3'
              borderWidth={1.5}
              borderColor='$yellow8'
              position='relative'
            >
              {/* 이중 안쪽 테두리 */}
              <YStack
                position='absolute'
                top={6}
                left={6}
                right={6}
                bottom={6}
                borderRadius={10}
                borderWidth={1}
                borderColor='$yellow6'
                opacity={0.3}
                pointerEvents='none'
              />
              <XStack position='absolute' top='$3' left='$3' opacity={0.25}>
                <Quote size={22} color='$yellow8' />
              </XStack>
              <Paragraph
                color='$yellow8'
                fontSize='$1'
                textAlign='center'
                textTransform='uppercase'
                letterSpacing={3}
                opacity={0.8}
              >
                질문
              </Paragraph>
              <Paragraph
                textAlign='center'
                fontWeight='600'
                fontSize='$5'
                paddingHorizontal='$4'
                color='$color'
                lineHeight='$7'
              >
                {reading.question}
              </Paragraph>
            </YStack>

            {/* 스프레드 레이아웃 */}
            <YStack>
              <SpreadLayout
                spreadType={reading.spreadType as SpreadType}
                cards={reading.cards}
                revealedIndices={allIndices}
              />
            </YStack>

            {/* 장식 구분선 */}
            <XStack alignItems='center' gap='$3'>
              <Separator flex={1} borderColor='$yellow8' opacity={0.2} />
              <XStack gap='$2' alignItems='center'>
                <Text fontSize='$2' color='$yellow8' opacity={0.4}>
                  ✦
                </Text>
                <Text fontSize='$3' color='$accentBackground'>
                  ✦
                </Text>
                <Text fontSize='$2' color='$yellow8' opacity={0.4}>
                  ✦
                </Text>
              </XStack>
              <Separator flex={1} borderColor='$yellow8' opacity={0.2} />
            </XStack>

            {/* AI 생성 제목 + 요약 */}
            <YStack alignItems='center' gap='$2'>
              <H2 textAlign='center' color='$accentBackground' letterSpacing={1}>
                {interp.title}
              </H2>
              {interp.summary ? (
                <Paragraph textAlign='center' color='$colorSubtle' fontSize='$3' fontStyle='italic'>
                  {interp.summary}
                </Paragraph>
              ) : null}
            </YStack>

            {/* 해석 영역 */}
            <InterpretationView interp={interp} />

            {/* 버튼 영역 */}
            <YStack gap='$3'>
              {reading.shareId && (
                <XStack gap='$3'>
                  <OraculeButton
                    variant='secondary'
                    customSize='md'
                    onPress={handleShare}
                    scale={copied ? 0.98 : 1}
                    flex={1}
                  >
                    <XStack alignItems='center' gap='$2'>
                      <Share2 size={16} color='$color' />
                      <Text color='$color' fontWeight='600'>
                        {copied ? '복사됨 ✓' : '링크 복사'}
                      </Text>
                    </XStack>
                  </OraculeButton>
                  <OraculeButton
                    variant='secondary'
                    customSize='md'
                    onPress={handleKakaoShare}
                    flex={1}
                  >
                    <XStack alignItems='center' gap='$2'>
                      <MessageCircle size={16} color='$yellow10' />
                      <Text color='$yellow10' fontWeight='600'>
                        카카오톡 공유
                      </Text>
                    </XStack>
                  </OraculeButton>
                </XStack>
              )}
              <OraculeButton variant='primary' customSize='lg' {...queryLink}>
                <XStack alignItems='center' gap='$2'>
                  <RefreshCw size={16} color='$accentColor' />
                  <Text color='$accentColor' fontWeight='600'>
                    새로운 리딩 시작
                  </Text>
                </XStack>
              </OraculeButton>
            </YStack>
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
