import React, { useState } from 'react'
import { H2, Paragraph, ScrollView, Separator, XStack, YStack, Text } from 'tamagui'
import { LoadingSpinner, OraculeButton, SpreadLayout } from '@t4/ui'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import type { SpreadType } from 'app/types/spread'
import { Quote, Share2, Sparkles, RefreshCw } from '@tamagui/lucide-icons'

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
          <YStack
            padding="$4"
            gap="$6"
            paddingBottom="$10"
            animation="fadeIn"
            enterStyle={{ opacity: 0, y: 16 }}
          >
            {/* 제목 */}
            <YStack alignItems="center" gap="$2">
              <XStack alignItems="center" gap="$2">
                <Sparkles size={18} color="var(--accentBackground)" />
                <H2 textAlign="center" color="$accentBackground">
                  타로 리딩 결과
                </H2>
                <Sparkles size={18} color="var(--accentBackground)" />
              </XStack>
            </YStack>

            {/* 질문 박스 */}
            <YStack
              backgroundColor="$backgroundHover"
              borderRadius="$4"
              padding="$4"
              gap="$2"
              borderWidth={1}
              borderColor="$borderColor"
              position="relative"
            >
              <XStack position="absolute" top="$3" left="$3" opacity={0.3}>
                <Quote size={20} color="var(--accentBackground)" />
              </XStack>
              <Paragraph
                color="$colorSubtle"
                fontSize="$2"
                textAlign="center"
                textTransform="uppercase"
                letterSpacing={2}
              >
                질문
              </Paragraph>
              <Paragraph
                textAlign="center"
                fontWeight="600"
                fontSize="$5"
                paddingHorizontal="$4"
                color="$color"
                lineHeight="$6"
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

            {/* 장식 구분선 */}
            <XStack alignItems="center" gap="$3">
              <Separator flex={1} borderColor="$borderColor" />
              <XStack gap="$2" alignItems="center">
                <Text fontSize="$2" color="$colorSubtle">✦</Text>
                <Text fontSize="$2" color="$accentBackground">✦</Text>
                <Text fontSize="$2" color="$colorSubtle">✦</Text>
              </XStack>
              <Separator flex={1} borderColor="$borderColor" />
            </XStack>

            {/* 해석 박스 */}
            <YStack
              gap="$3"
              backgroundColor="$backgroundHover"
              borderRadius="$4"
              padding="$4"
              borderLeftWidth={3}
              borderLeftColor="$accentBackground"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <Paragraph
                color="$colorSubtle"
                fontSize="$2"
                textTransform="uppercase"
                letterSpacing={2}
              >
                해석
              </Paragraph>
              <Paragraph
                lineHeight="$6"
                fontSize="$4"
                color="$color"
              >
                {reading.interpretation}
              </Paragraph>
            </YStack>

            {/* 버튼 영역 */}
            <YStack gap="$3">
              {reading.shareId && (
                <OraculeButton variant="secondary" onPress={handleShare}>
                  <XStack alignItems="center" gap="$2">
                    <Share2 size={16} color="var(--color)" />
                    <Text color="$color" fontWeight="600">
                      {copied ? '링크가 복사되었습니다 ✓' : '공유 링크 복사'}
                    </Text>
                  </XStack>
                </OraculeButton>
              )}
              <OraculeButton {...queryLink}>
                <XStack alignItems="center" gap="$2">
                  <RefreshCw size={16} color="var(--accentColor)" />
                  <Text color="$accentColor" fontWeight="600">
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
    <YStack flex={1} backgroundColor="$background">
      {content}
    </YStack>
  )
}
