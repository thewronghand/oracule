import React from 'react'
import { Paragraph, ScrollView, XStack, YStack, Text, styled } from 'tamagui'
import { LoadingSpinner, OraculeButton } from '@t4/ui'
import { useLink } from 'solito/link'
import { match } from 'ts-pattern'
import { trpc } from 'app/utils/trpc'
import { error, loading, success } from 'app/utils/trpc/patterns'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { SPREAD_INFO, type SpreadType } from 'app/types/spread'
import { getCharacterById } from 'app/types/character'
import { parseInterpretation } from 'app/utils/parseInterpretation'
import { Trash2 } from '@tamagui/lucide-icons'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}.${day}  ${hours}:${minutes}`
}

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
    <XStack
      borderBottomWidth={1}
      borderBottomColor='rgba(0,0,0,0.07)'
      paddingVertical='$5'
      gap='$4'
      cursor='pointer'
      pressStyle={{ opacity: 0.6 }}
      hoverStyle={{ backgroundColor: 'rgba(229,156,151,0.02)' }}
      {...link}
    >
      {/* 날짜 컬럼 */}
      <YStack width={56} flexShrink={0} gap='$1' paddingTop='$1'>
        <Text fontFamily='$body' fontSize={11} letterSpacing={0.5} color='$colorFocus' opacity={0.5}>
          {formatDate(createdAt).split('  ')[0]}
        </Text>
        <Text fontFamily='$body' fontSize={11} letterSpacing={0.5} color='$colorFocus' opacity={0.35}>
          {formatDate(createdAt).split('  ')[1]}
        </Text>
      </YStack>

      {/* 세로 구분선 */}
      <YStack width={1} backgroundColor='rgba(0,0,0,0.07)' />

      {/* 콘텐츠 */}
      <YStack flex={1} gap='$2'>
        <Text
          fontFamily='$heading'
          fontSize={18}
          fontWeight='400'
          fontStyle='italic'
          color='$color'
          numberOfLines={2}
          lineHeight={24}
        >
          {question}
        </Text>

        <XStack gap='$3' alignItems='center' marginTop='$1'>
          <Text
            fontFamily='$body'
            fontSize={10}
            fontWeight='500'
            letterSpacing={2}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
          >
            {spreadName}
          </Text>
          {character.id !== 'default' && (
            <>
              <YStack width={2} height={2} borderRadius={1} backgroundColor='rgba(240,235,224,0.2)' />
              <Text
                fontFamily='$body'
                fontSize={10}
                letterSpacing={1}
                color='$colorFocus'
                opacity={0.4}
              >
                {character.name}
              </Text>
            </>
          )}
        </XStack>

        {summary && (
          <Text
            fontFamily='$body'
            fontSize={12}
            color='$colorFocus'
            numberOfLines={2}
            lineHeight={18}
            marginTop='$1'
            opacity={0.6}
          >
            {summary}
          </Text>
        )}
      </YStack>

      {/* 삭제 버튼 */}
      <YStack
        padding='$2'
        cursor='pointer'
        pressStyle={{ opacity: 0.5 }}
        opacity={isDeleting ? 0.15 : 0.3}
        onPress={(e) => {
          e.stopPropagation()
          if (!isDeleting) onDelete(id)
        }}
        alignSelf='flex-start'
        marginTop='$1'
      >
        <Trash2 size={14} color='$colorFocus' />
      </YStack>
    </XStack>
  )
}

function LoginPrompt() {
  const loginLink = useLink({ href: '/login' })
  return (
    <YStack flex={1} position='relative' justifyContent='center' alignItems='center'>
      {/* 배경 이미지 */}
      <YStack
        position='absolute'
        top={0} left={0} right={0} bottom={0}
        // @ts-ignore
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1200&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      />
      <YStack
        position='absolute'
        top={0} left={0} right={0} bottom={0}
        // @ts-ignore
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />
      {/* 콘텐츠 */}
      <YStack position='relative' alignItems='center' padding='$6' gap='$6'>
        <YStack gap='$2' alignItems='center'>
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={3}
            textTransform='uppercase'
            color='rgba(255,255,255,0.5)'
            marginBottom='$2'
          >
            Access Required
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={40}
            fontWeight='300'
            letterSpacing={-0.5}
            color='#ffffff'
            lineHeight={46}
            textAlign='center'
          >
            로그인이{'\n'}필요해요
          </Text>
        </YStack>
        <Text fontFamily='$body' color='rgba(255,255,255,0.6)' fontSize={14} textAlign='center'>
          타로 리딩 기록을 보려면 먼저 로그인해주세요.
        </Text>
        <OraculeButton variant='primary' {...loginLink} customSize='lg'>
          로그인하기
        </OraculeButton>
      </YStack>
    </YStack>
  )
}

function EmptyState() {
  const homeLink = useLink({ href: '/' })
  return (
    <YStack paddingVertical='$12' alignItems='center' gap='$5'>
      <YStack gap='$2' alignItems='center'>
        <Text
          fontFamily='$heading'
          fontSize={28}
          fontWeight='300'
          fontStyle='italic'
          color='$colorFocus'
          opacity={0.6}
          textAlign='center'
        >
          아직 기록이 없어요
        </Text>
      </YStack>
      <Paragraph fontFamily='$body' color='$colorFocus' fontSize={13} textAlign='center' opacity={0.5}>
        타로 리딩을 받으면 이곳에 기록이 쌓여요.
      </Paragraph>
      <OraculeButton variant='secondary' {...homeLink} customSize='md' borderColor='rgba(0,0,0,0.10)'>
        타로 보러 가기
      </OraculeButton>
    </YStack>
  )
}

export function HistoryScreen() {
  const { user, isLoading: isUserLoading } = useUser()
  const utils = trpc.useUtils()

  const readingsQuery = trpc.reading.listByUser.useQuery(
    { limit: 50, offset: 0 },
    { enabled: !!user }
  )

  const deleteMutation = trpc.reading.delete.useMutation({
    onSuccess: () => {
      utils.reading.listByUser.invalidate()
    },
  })

  if (isUserLoading) {
    return (
      <YStack flex={1} justifyContent='center' alignItems='center'>
        <LoadingSpinner />
      </YStack>
    )
  }

  if (!user) return <LoginPrompt />

  return (
    <ScrollView backgroundColor='$background'>
      <YStack
        maxWidth={640}
        width='100%'
        alignSelf='center'
        paddingHorizontal={24}
        paddingTop={40}
        paddingBottom={80}
        $gtSm={{ paddingHorizontal: 48, paddingTop: 56 }}
      >
        {/* 페이지 헤더 */}
        <YStack
          marginBottom='$8'
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
            marginBottom='$3'
          >
            Archive
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={34}
            fontWeight='300'
            letterSpacing={-0.5}
            color='$color'
            lineHeight={40}
          >
            리딩 히스토리
          </Text>
        </YStack>

        <YStack width='100%' height={1} backgroundColor='rgba(0,0,0,0.07)' marginBottom='$0' />

        {match(readingsQuery)
          .with(loading, () => (
            <YStack paddingVertical='$12' justifyContent='center' alignItems='center'>
              <LoadingSpinner />
            </YStack>
          ))
          .with(error, () => (
            <YStack paddingVertical='$8' alignItems='center'>
              <Paragraph fontFamily='$body' color='$red10' fontSize={14}>기록을 불러오지 못했어요.</Paragraph>
            </YStack>
          ))
          .with(success, ({ data }) => {
            if (!data || data.length === 0) return <EmptyState />
            return (
              <YStack>
                {data.map((reading, i) => (
                  <YStack
                    key={reading.id}
                    // @ts-ignore
                    style={{ animation: `phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms both` }}
                  >
                    <ReadingItem
                      id={reading.id}
                      question={reading.question}
                      spreadType={reading.spreadType}
                      characterId={reading.characterId}
                      interpretation={reading.interpretation}
                      createdAt={reading.createdAt}
                      onDelete={(id) => deleteMutation.mutate({ id })}
                      isDeleting={deleteMutation.isLoading}
                    />
                  </YStack>
                ))}
              </YStack>
            )
          })
          .otherwise(() => null)}
      </YStack>
    </ScrollView>
  )
}
