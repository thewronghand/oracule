import React from 'react'
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
import { Quote } from '@tamagui/lucide-icons'
import { getCharacterById } from 'app/types/character'

const { useParam } = createParam<{ shareId: string }>()

function InterpretationView({ interp }: { interp: ReadingInterpretation }) {
  const hasCardReadings = interp.cardReadings.length > 0

  return (
    <YStack gap='$4'>
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

      {hasCardReadings && (
        <Separator borderColor='$borderColor' opacity={0.3} />
      )}

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
        <H3 color='$accentBackground' fontSize='$2' textTransform='uppercase' letterSpacing={3}>
          {hasCardReadings ? '종합 해석' : '해석'}
        </H3>
        <Paragraph lineHeight='$7' fontSize='$4' color='$color'>
          {interp.content}
        </Paragraph>
      </YStack>
    </YStack>
  )
}

export function ShareScreen(): React.ReactNode {
  const [shareId] = useParam('shareId')

  const readingQuery = trpc.reading.getByShareId.useQuery(
    { shareId: shareId ?? '' },
    { enabled: !!shareId }
  )

  const homeLink = useLink({ href: '/' })

  const content = match(readingQuery)
    .with(error, () => (
      <YStack flex={1} alignItems='center' justifyContent='center' padding='$6'>
        <Paragraph color='$red10' textAlign='center'>
          공유된 리딩을 찾을 수 없습니다.
        </Paragraph>
      </YStack>
    ))
    .with(loading, () => (
      <YStack flex={1} alignItems='center' justifyContent='center'>
        <LoadingSpinner message='리딩을 불러오는 중...' />
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
              <H2 textAlign='center' color='$accentBackground' letterSpacing={1}>
                공유된 타로 리딩
              </H2>
              {character.id !== 'default' && (
                <XStack alignItems='center' gap='$2'>
                  <Text fontSize={18}>{character.emoji}</Text>
                  <Text fontSize='$3' color='$colorSubtle' fontWeight='500'>
                    {character.name}의 해석
                  </Text>
                </XStack>
              )}
              <YStack width={160} height={1} backgroundColor='$borderColor' opacity={0.3} />
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
            <SpreadLayout
              spreadType={reading.spreadType as SpreadType}
              cards={reading.cards}
              revealedIndices={allIndices}
            />

            <Separator borderColor='$borderColor' opacity={0.3} />

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

            <OraculeButton variant='primary' customSize='lg' {...homeLink}>
              나도 타로 보기
            </OraculeButton>
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
