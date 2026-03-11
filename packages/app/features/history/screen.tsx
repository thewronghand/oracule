import React from 'react'
import { H2, Paragraph, ScrollView, XStack, YStack, Text, styled } from 'tamagui'
import { LoadingSpinner, OraculeButton } from '@t4/ui'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { SPREAD_INFO, type SpreadType } from 'app/types/spread'
import { getCharacterById } from 'app/types/character'
import { parseInterpretation } from 'app/utils/parseInterpretation'
import { Clock, Trash2, BookOpen, LogIn } from '@tamagui/lucide-icons'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}/${day} ${hours}:${minutes}`
}

const ReadingCard = styled(YStack, {
  backgroundColor: '$backgroundHover',
  borderRadius: '$4',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  cursor: 'pointer',
  pressStyle: { opacity: 0.8, scale: 0.99 },
})

interface ReadingItemProps {
  id: string
  question: string
  spreadType: string
  characterId: string | null
  interpretation: string
  createdAt: string
  onDelete: (id: string) => void
  isDeleting: boolean
}

function ReadingItem({
  id,
  question,
  spreadType,
  characterId,
  interpretation,
  createdAt,
  onDelete,
  isDeleting,
}: ReadingItemProps) {
  const link = useLink({ href: `/result/${id}` })
  const spreadName = SPREAD_INFO[spreadType as SpreadType]?.name ?? spreadType
  const character = getCharacterById(characterId)
  const parsed = parseInterpretation(interpretation)
  const summary = parsed?.summary

  return (
    <ReadingCard {...link}>
      <XStack justifyContent="space-between" alignItems="flex-start">
        <YStack flex={1} gap="$2">
          <XStack alignItems="center" gap="$2">
            <Clock size={14} color="$purple8" />
            <Text fontSize="$2" color="$colorSubtle">
              {formatDate(createdAt)}
            </Text>
          </XStack>

          <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={2}>
            {question}
          </Text>

          <XStack gap="$2" flexWrap="wrap">
            <Text
              fontSize="$2"
              color="$purple10"
              backgroundColor="$purple3"
              paddingHorizontal="$2"
              paddingVertical="$1"
              borderRadius="$2"
            >
              {spreadName}
            </Text>
            {character.id !== 'default' && (
              <Text
                fontSize="$2"
                color="$yellow10"
                backgroundColor="$yellow3"
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius="$2"
              >
                {character.name}
              </Text>
            )}
          </XStack>

          {summary && (
            <Text fontSize="$3" color="$colorSubtle" numberOfLines={2}>
              {summary}
            </Text>
          )}
        </YStack>

        <YStack
          padding="$2"
          cursor="pointer"
          pressStyle={{ opacity: 0.6 }}
          opacity={isDeleting ? 0.3 : 0.6}
          onPress={(e) => {
            e.stopPropagation()
            if (!isDeleting) onDelete(id)
          }}
        >
          <Trash2 size={18} color="$red9" />
        </YStack>
      </XStack>
    </ReadingCard>
  )
}

function LoginPrompt() {
  const loginLink = useLink({ href: '/login' })

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$6" gap="$4">
      <LogIn size={48} color="$purple8" />
      <H2 textAlign="center" color="$color">
        로그인이 필요해요
      </H2>
      <Paragraph textAlign="center" color="$colorSubtle">
        타로 리딩 기록을 보려면 먼저 로그인해주세요.
      </Paragraph>
      <OraculeButton variant="primary" {...loginLink}>
        로그인하기
      </OraculeButton>
    </YStack>
  )
}

function EmptyState() {
  const homeLink = useLink({ href: '/' })

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$6" gap="$4">
      <BookOpen size={48} color="$purple8" />
      <H2 textAlign="center" color="$color">
        아직 리딩 기록이 없어요
      </H2>
      <Paragraph textAlign="center" color="$colorSubtle">
        타로 리딩을 받으면 이곳에 기록이 쌓여요.
      </Paragraph>
      <OraculeButton variant="primary" {...homeLink}>
        타로 보러 가기
      </OraculeButton>
    </YStack>
  )
}

export function HistoryScreen() {
  const { user, isLoading: isUserLoading } = useUser()
  const utils = trpc.useUtils()

  const readingsQuery = trpc.reading.listByUser.useQuery(
    { limit: 50 },
    { enabled: !!user }
  )

  const deleteMutation = trpc.reading.delete.useMutation({
    onSuccess: () => {
      utils.reading.listByUser.invalidate()
    },
  })

  if (isUserLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <LoadingSpinner />
      </YStack>
    )
  }

  if (!user) {
    return <LoginPrompt />
  }

  return (
    <ScrollView>
      <YStack
        flex={1}
        padding="$4"
        gap="$4"
        maxWidth={640}
        width="100%"
        alignSelf="center"
      >
        <H2 color="$purple10">리딩 히스토리</H2>

        {match(readingsQuery)
          .with(loading, () => (
            <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
              <LoadingSpinner />
            </YStack>
          ))
          .with(error, () => (
            <YStack padding="$4" alignItems="center">
              <Paragraph color="$red9">기록을 불러오지 못했어요.</Paragraph>
            </YStack>
          ))
          .with(success, ({ data }) => {
            if (!data || data.length === 0) {
              return <EmptyState />
            }

            return (
              <YStack gap="$3">
                {data.map((reading) => (
                  <ReadingItem
                    key={reading.id}
                    id={reading.id}
                    question={reading.question}
                    spreadType={reading.spreadType}
                    characterId={reading.characterId}
                    interpretation={reading.interpretation}
                    createdAt={reading.createdAt}
                    onDelete={(id) => deleteMutation.mutate({ id })}
                    isDeleting={deleteMutation.isPending}
                  />
                ))}
              </YStack>
            )
          })
          .otherwise(() => null)}
      </YStack>
    </ScrollView>
  )
}
