import React from 'react'
import { H2, Paragraph, ScrollView, Separator, YStack } from 'tamagui'
import { LoadingSpinner, OraculeButton, SpreadLayout } from '@t4/ui'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import type { SpreadType } from 'app/types/spread'

const { useParam } = createParam<{ shareId: string }>()

export function ShareScreen(): React.ReactNode {
  const [shareId] = useParam('shareId')

  const readingQuery = trpc.reading.getByShareId.useQuery(
    { shareId: shareId ?? '' },
    { enabled: !!shareId }
  )

  const homeLink = useLink({ href: '/' })

  const content = match(readingQuery)
    .with(error, () => (
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
        <Paragraph color="$red10" textAlign="center">
          공유된 리딩을 찾을 수 없습니다.
        </Paragraph>
      </YStack>
    ))
    .with(loading, () => (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <LoadingSpinner message="리딩을 불러오는 중..." />
      </YStack>
    ))
    .with(success, () => {
      const reading = readingQuery.data
      if (!reading) return null

      const allIndices = reading.cards.map((_, i) => i)

      return (
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$6">
            <H2 textAlign="center">공유된 타로 리딩</H2>

            <YStack gap="$2">
              <Paragraph color="$colorSubtle" fontSize="$2" textAlign="center">
                질문
              </Paragraph>
              <Paragraph textAlign="center" fontWeight="600">
                {reading.question}
              </Paragraph>
            </YStack>

            <SpreadLayout
              spreadType={reading.spreadType as SpreadType}
              cards={reading.cards}
              revealedIndices={allIndices}
            />

            <Separator />

            <YStack gap="$3">
              <Paragraph color="$colorSubtle" fontSize="$2">
                해석
              </Paragraph>
              <Paragraph lineHeight="$5">{reading.interpretation}</Paragraph>
            </YStack>

            <OraculeButton {...homeLink}>나도 타로 보기</OraculeButton>
          </YStack>
        </ScrollView>
      )
    })
    .otherwise(() => null)

  return (
    <YStack flex={1} backgroundColor="$background">
      {content}
    </YStack>
  )
}
