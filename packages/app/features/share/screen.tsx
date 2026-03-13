import React from 'react'
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
import { getCharacterById } from 'app/types/character'

const { useParam } = createParam<{ shareId: string }>()

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
        <Paragraph fontFamily='$body' color='$red10' textAlign='center'>
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
            {/* 공유 배지 */}
            <XStack alignItems='center' gap='$3' marginBottom='$8'>
              <YStack width={24} height={1} backgroundColor='#c9a96e' opacity={0.6} />
              <SectionLabel>Shared Reading</SectionLabel>
            </XStack>

            {/* 페이지 헤더 */}
            <YStack marginBottom='$8' gap='$2'>
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

            {/* 스프레드 */}
            <SpreadLayout
              spreadType={reading.spreadType as SpreadType}
              cards={reading.cards}
              revealedIndices={allIndices}
            />

            <Divider />

            {/* 해석 */}
            <InterpretationView interp={interp} />

            <Divider />

            {/* CTA */}
            <XStack justifyContent='flex-end'>
              <OraculeButton variant='primary' customSize='lg' {...homeLink} minWidth={200}>
                나도 타로 보기
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
