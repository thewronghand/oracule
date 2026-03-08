import React, { useState } from 'react'
import { H2, Paragraph, ScrollView, Separator, XStack, YStack } from 'tamagui'
import { LoadingSpinner, OraculeButton, SpreadLayout } from '@t4/ui'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import type { SpreadType } from 'app/types/spread'

const { useParam } = createParam<{ id: string }>()

export function ResultScreen(): React.ReactNode {
  const [id] = useParam('id')
  const [copied, setCopied] = useState(false)

  const readingQuery = trpc.reading.getById.useQuery(
    { id: id ?? '' },
    { enabled: !!id }
  )

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

  const content = match(readingQuery)
    .with(error, () => (
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
        <Paragraph color="$red10" textAlign="center">
          리딩 결과를 불러오지 못했습니다.
        </Paragraph>
      </YStack>
    ))
    .with(loading, () => (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <LoadingSpinner message="리딩 결과를 불러오는 중..." />
      </YStack>
    ))
    .with(success, () => {
      const reading = readingQuery.data
      if (!reading) return null

      const allIndices = reading.cards.map((_, i) => i)

      return (
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$6">
            <H2 textAlign="center">타로 리딩 결과</H2>

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

            <YStack gap="$3">
              {reading.shareId && (
                <OraculeButton variant="secondary" onPress={handleShare}>
                  {copied ? '링크가 복사되었습니다' : '공유 링크 복사'}
                </OraculeButton>
              )}
              <OraculeButton {...queryLink}>새로운 리딩 시작</OraculeButton>
            </YStack>
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
