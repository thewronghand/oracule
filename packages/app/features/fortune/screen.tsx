import React, { useState, useMemo, useRef } from 'react'
import { Paragraph, ScrollView, XStack, YStack, Text, styled } from 'tamagui'
import { LoadingSpinner, OraculeButton, TarotCard } from '@t4/ui'
import { useLink } from 'solito/link'
import { trpc } from 'app/utils/trpc'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { tarotDeck } from 'app/data/tarotDeck'
import { getCardImageUrl } from 'app/utils/cardImage'
import { CHARACTERS, type CharacterId } from 'app/types/character'
import { getCharacterById } from 'app/types/character'
import type { DrawnTarotCard } from 'app/types/card'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'

// ─── 파싱 유틸 ────────────────────────────────────────────────────────────────

function parseFortuneInterpretation(raw: string): {
  title: string
  summary: string
  content: string
} {
  const stripCodeBlock = (text: string): string => {
    const trimmed = text.trim()
    if (trimmed.startsWith('```')) {
      return trimmed.replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '')
    }
    return trimmed
  }

  const extractFortune = (
    obj: Record<string, unknown>
  ): { title: string; summary: string; content: string } => {
    const content = typeof obj.content === 'string' ? obj.content : ''
    const innerStr = stripCodeBlock(content)
    try {
      const inner: unknown = JSON.parse(innerStr)
      if (typeof inner === 'object' && inner !== null && 'content' in inner) {
        return extractFortune(inner as Record<string, unknown>)
      }
    } catch {
      // 일반 텍스트
    }
    return {
      title:
        typeof obj.title === 'string' && obj.title !== '타로 리딩 결과' ? obj.title : '오늘의 운세',
      summary: typeof obj.summary === 'string' ? obj.summary : '',
      content,
    }
  }

  try {
    const cleaned = stripCodeBlock(raw)
    const parsed: unknown = JSON.parse(cleaned)
    if (typeof parsed === 'string') return parseFortuneInterpretation(parsed)
    if (typeof parsed === 'object' && parsed !== null && 'content' in parsed) {
      return extractFortune(parsed as Record<string, unknown>)
    }
  } catch {
    // JSON 파싱 실패
  }
  return { title: '오늘의 운세', summary: '', content: raw }
}

function fortuneToDrawnCard(cardId: number, cardDirection: string): DrawnTarotCard {
  const card = tarotDeck[cardId]!
  const direction = cardDirection as '정방향' | '역방향'
  return {
    id: card.id,
    name: card.name,
    arcanaType: card.arcanaType,
    suit: card.suit,
    number: card.number,
    direction,
    keywords: direction === '정방향' ? card.upright.keywords : card.reversed.keywords,
    description: direction === '정방향' ? card.upright.description : card.reversed.description,
    imageDescription: card.imageDescription,
  }
}

// ─── 공통 스타일드 컴포넌트 ──────────────────────────────────────────────────

const Divider = styled(YStack, {
  width: '100%',
  height: 1,
  backgroundColor: '$borderColor',
  
  marginVertical: '$6',
})

// ─── 로그인 필요 ─────────────────────────────────────────────────────────────

function LoginPrompt() {
  const loginLink = useLink({ href: '/login' })
  return (
    <YStack flex={1} justifyContent='center' alignItems='center' padding='$6' gap='$6'>
      <YStack gap='$2'>
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
          Sign In Required
        </Text>
        <Text
          fontFamily='$heading'
          fontSize={32}
          fontWeight='300'
          letterSpacing={-0.5}
          color='$color'
          lineHeight={38}
        >
          로그인이{'\n'}필요해요
        </Text>
      </YStack>
      <Paragraph fontFamily='$body' color='$colorFocus' fontSize='$3' opacity={0.7}>
        오늘의 운세를 보려면 먼저 로그인해주세요.
      </Paragraph>
      <OraculeButton variant='primary' {...loginLink} customSize='lg'>
        로그인하기
      </OraculeButton>
    </YStack>
  )
}

// ─── 운세 결과 뷰 ─────────────────────────────────────────────────────────────

interface FortuneResultProps {
  cardId: number
  cardDirection: string
  interpretation: string
  characterId: string | null
  date: string
}

function FortuneResult({ cardId, cardDirection, interpretation, characterId, date }: FortuneResultProps) {
  const interp = parseFortuneInterpretation(interpretation)
  const drawnCard = fortuneToDrawnCard(cardId, cardDirection)
  const character = getCharacterById(characterId)
  const homeLink = useLink({ href: '/' })

  return (
    <ScrollView>
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
        {/* 헤더 */}
        <YStack marginBottom='$8' gap='$1'>
          <XStack alignItems='center' gap='$3' marginBottom='$3'>
            <Text
              fontFamily='$body'
              fontSize={11}
              fontWeight='500'
              letterSpacing={3}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.6}
            >
              Daily Fortune
            </Text>
            <YStack flex={1} height={1} backgroundColor='$borderColor' opacity={0.3} />
            <Text
              fontFamily='$body'
              fontSize={11}
              letterSpacing={1}
              color='$colorFocus'
              opacity={0.4}
            >
              {date}
            </Text>
          </XStack>
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
          {interp.summary ? (
            <Text
              fontFamily='$body'
              fontSize={14}
              color='$colorFocus'
              opacity={0.7}
              marginTop='$1'
              lineHeight={22}
            >
              {interp.summary}
            </Text>
          ) : null}
          {character.id !== 'default' && (
            <XStack alignItems='center' gap='$2' marginTop='$2'>
              <Text fontSize={14}>{character.emoji}</Text>
              <Text fontFamily='$body' fontSize={12} color='$colorFocus' opacity={0.6}>
                {character.name}의 해석
              </Text>
            </XStack>
          )}
        </YStack>

        <Divider />

        {/* 카드 + 해석 */}
        <XStack gap='$6' alignItems='flex-start' $xs={{ flexDirection: 'column', alignItems: 'center' }}>
          <YStack alignItems='center' gap='$3' flexShrink={0}>
            <TarotCard card={drawnCard} isRevealed size='lg' />
            <YStack alignItems='center' gap='$1'>
              <Text
                fontFamily='$heading'
                fontSize={18}
                fontWeight='400'
                fontStyle='italic'
                color='$color'
              >
                {drawnCard.name.ko}
              </Text>
              <Text
                fontFamily='$body'
                fontSize={10}
                letterSpacing={2}
                textTransform='uppercase'
                color='$colorFocus'
                opacity={0.6}
              >
                {drawnCard.direction}
              </Text>
            </YStack>
          </YStack>

          {/* 해석 텍스트 */}
          <YStack flex={1} paddingTop='$2'>
            <Text
              fontFamily='$body'
              fontSize={11}
              fontWeight='500'
              letterSpacing={2}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.6}
              marginBottom='$3'
            >
              오늘의 메시지
            </Text>
            <Paragraph
              fontFamily='$body'
              lineHeight={26}
              fontSize={14}
              color='$colorFocus'
              opacity={0.85}
            >
              {interp.content}
            </Paragraph>
          </YStack>
        </XStack>

        <Divider />

        {/* 안내 + 홈 버튼 */}
        <XStack justifyContent='space-between' alignItems='center'>
          <Text
            fontFamily='$body'
            fontSize={13}
            color='$colorFocus'
            opacity={0.4}
            fontStyle='italic'
          >
            내일 새로운 카드가 기다립니다
          </Text>
          <OraculeButton variant='secondary' customSize='md' {...homeLink} borderColor='rgba(0,0,0,0.10)'>
            홈으로
          </OraculeButton>
        </XStack>
      </YStack>
    </ScrollView>
  )
}

// ─── 카드 뒷면 (셔플용) ───────────────────────────────────────────────────────

type DrawPhase = 'idle' | 'shuffling' | 'picking' | 'revealing' | 'done'

function ShuffleCard({ index, phase }: { index: number; phase: DrawPhase }) {
  const isShuffling = phase === 'shuffling'
  const offsets = [
    { x: 0, y: 0, rotate: '0deg' },
    { x: -30, y: -8, rotate: '-12deg' },
    { x: 30, y: -8, rotate: '12deg' },
    { x: -15, y: -16, rotate: '-6deg' },
    { x: 15, y: -16, rotate: '6deg' },
  ]
  const offset = offsets[index]!

  return (
    <YStack
      position='absolute'
      width={90}
      height={135}
      borderWidth={1}
      borderColor='rgba(229,156,151,0.3)'
      overflow='hidden'
      animation='bouncy'
      x={isShuffling ? offset.x : 0}
      y={isShuffling ? offset.y : 0}
      rotate={isShuffling ? offset.rotate : '0deg'}
      scale={isShuffling ? 1 : 0.95}
      zIndex={5 - index}
      backgroundColor='#f5f5f5'
    >
      <YStack flex={1} alignItems='center' justifyContent='center'>
        <YStack
          width={70}
          height={115}
          borderWidth={1}
          borderColor='rgba(229,156,151,0.15)'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize={20} opacity={0.3} color='#e59c97'>✦</Text>
        </YStack>
      </YStack>
    </YStack>
  )
}

function PickCard({ index, onPick, disabled }: { index: number; onPick: () => void; disabled: boolean }) {
  const angles = [-20, -10, 0, 10, 20]
  const xOffsets = [-80, -40, 0, 40, 80]

  return (
    <YStack
      width={80}
      height={120}
      borderWidth={1}
      borderColor='rgba(229,156,151,0.3)'
      overflow='hidden'
      animation='bouncy'
      x={xOffsets[index]}
      rotate={`${angles[index]}deg`}
      cursor={disabled ? 'default' : 'pointer'}
      pressStyle={disabled ? undefined : { scale: 1.08, y: -12, borderColor: 'rgba(229,156,151,0.7)' }}
      hoverStyle={disabled ? undefined : { scale: 1.05, y: -8, borderColor: 'rgba(229,156,151,0.5)' }}
      onPress={disabled ? undefined : onPick}
      backgroundColor='#f5f5f5'
    >
      <YStack flex={1} alignItems='center' justifyContent='center'>
        <YStack
          width={62}
          height={100}
          borderWidth={1}
          borderColor='rgba(229,156,151,0.15)'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize={16} opacity={0.3} color='#e59c97'>✦</Text>
        </YStack>
      </YStack>
    </YStack>
  )
}

// ─── 드로우 뷰 ────────────────────────────────────────────────────────────────

function DrawFortuneView() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>('default')
  const [phase, setPhase] = useState<DrawPhase>('idle')
  const [pickedIndex, setPickedIndex] = useState<number | null>(null)
  const mutationCompletedAtRef = useRef<number | null>(null)
  const mutationDataRef = useRef<{
    cardId: number
    cardDirection: string
    interpretation: string
    characterId: string | null
    date: string
  } | null>(null)
  const imageLoadedRef = useRef(false)
  const drawnCardRef = useRef<{ cardId: number; direction: '정방향' | '역방향' } | null>(null)
  const utils = trpc.useUtils()

  const createMutation = trpc.fortune.create.useMutation({
    onSuccess: (data) => {
      mutationCompletedAtRef.current = Date.now()
      mutationDataRef.current = data
    },
  })

  const handleStart = () => {
    const cardId = Math.floor(Math.random() * 78)
    const direction: '정방향' | '역방향' = Math.random() > 0.5 ? '정방향' : '역방향'
    drawnCardRef.current = { cardId, direction }
    imageLoadedRef.current = false
    if (typeof window !== 'undefined') {
      const img = new window.Image()
      img.onload = () => { imageLoadedRef.current = true }
      img.src = getCardImageUrl(cardId)
    }
    setPhase('shuffling')
    createMutation.mutate({ cardId, direction, characterId: selectedCharacter })
    setTimeout(() => { setPhase('picking') }, 1500)
  }

  const handlePick = (index: number) => {
    setPickedIndex(index)
    setPhase('revealing')
    const checkAndTransition = () => {
      if (mutationCompletedAtRef.current && imageLoadedRef.current) {
        const elapsed = Date.now() - mutationCompletedAtRef.current
        const remaining = Math.max(0, 2000 - elapsed)
        setTimeout(() => { utils.fortune.getToday.invalidate() }, remaining)
      } else {
        setTimeout(checkAndTransition, 100)
      }
    }
    setTimeout(checkAndTransition, 600)
  }

  const revealData = mutationDataRef.current
  const revealCard = revealData ? fortuneToDrawnCard(revealData.cardId, revealData.cardDirection) : null

  return (
    <>
      {/* idle */}
      {phase === 'idle' && (
        <ScrollView>
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
            {/* 헤더 */}
            <YStack marginBottom='$8'>
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
                Daily Fortune
              </Text>
              <Text
                fontFamily='$heading'
                fontSize={34}
                fontWeight='300'
                letterSpacing={-0.5}
                color='$color'
                lineHeight={40}
                marginBottom='$2'
              >
                오늘의 운세
              </Text>
              <Text fontFamily='$body' fontSize={14} color='$colorFocus' opacity={0.6} lineHeight={22}>
                카드 한 장으로 오늘 하루를 점쳐보세요
              </Text>
            </YStack>

            <Divider />

            {/* 캐릭터 선택 */}
            <YStack marginBottom='$8'>
              <Text
                fontFamily='$body'
                fontSize={11}
                fontWeight='500'
                letterSpacing={2}
                textTransform='uppercase'
                color='$colorFocus'
                opacity={0.6}
                marginBottom='$4'
              >
                해석자 선택
              </Text>
              <YStack gap='$2'>
                {CHARACTERS.map((character) => {
                  const isSelected = selectedCharacter === character.id
                  return (
                    <XStack
                      key={character.id}
                      alignItems='center'
                      gap='$4'
                      paddingVertical='$4'
                      paddingHorizontal='$4'
                      borderWidth={1}
                      borderColor={isSelected ? 'rgba(229,156,151,0.4)' : 'rgba(0,0,0,0.07)'}
                      backgroundColor={isSelected ? 'rgba(229,156,151,0.05)' : 'transparent'}
                      pressStyle={{ opacity: 0.7 }}
                      onPress={() => setSelectedCharacter(character.id)}
                      cursor='pointer'
                      // @ts-ignore
                      style={{ transition: 'all 0.15s ease' }}
                    >
                      <YStack
                        width={16}
                        height={16}
                        borderRadius={8}
                        borderWidth={1}
                        borderColor={isSelected ? '#e59c97' : 'rgba(0,0,0,0.15)'}
                        alignItems='center'
                        justifyContent='center'
                        flexShrink={0}
                      >
                        {isSelected && (
                          <YStack width={8} height={8} borderRadius={4} backgroundColor='#e59c97' />
                        )}
                      </YStack>
                      <YStack flex={1}>
                        <Text
                          fontFamily='$body'
                          fontSize={14}
                          fontWeight={isSelected ? '500' : '400'}
                          color={isSelected ? '$color' : '$colorFocus'}
                          letterSpacing={0.2}
                        >
                          {character.name}
                        </Text>
                        <Text
                          fontFamily='$body'
                          fontSize={12}
                          color='$colorFocus'
                          opacity={0.6}
                          marginTop={2}
                        >
                          {character.description}
                        </Text>
                      </YStack>
                      <Text fontSize={20} opacity={isSelected ? 1 : 0.4}>
                        {character.emoji}
                      </Text>
                    </XStack>
                  )
                })}
              </YStack>
            </YStack>

            <XStack justifyContent='flex-end'>
              <OraculeButton
                variant='primary'
                customSize='lg'
                minWidth={200}
                onPress={handleStart}
              >
                오늘의 카드 뽑기
              </OraculeButton>
            </XStack>

            {createMutation.isError && (
              <Paragraph fontFamily='$body' textAlign='center' color='$red10' fontSize='$3' marginTop='$4'>
                {createMutation.error?.message ?? '오류가 발생했습니다.'}
              </Paragraph>
            )}
          </YStack>
        </ScrollView>
      )}

      {/* shuffling */}
      {phase === 'shuffling' && (
        <YStack flex={1} justifyContent='center' alignItems='center' gap='$8'>
          <YStack gap='$1' alignItems='center'>
            <Text
              fontFamily='$body'
              fontSize={11}
              letterSpacing={3}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.6}
              marginBottom='$2'
            >
              Shuffling
            </Text>
            <Text fontFamily='$heading' fontSize={32} fontWeight='300' color='$color' letterSpacing={-0.5}>
              카드를 섞는 중
            </Text>
          </YStack>
          <YStack width={200} height={200} alignItems='center' justifyContent='center' position='relative'>
            {[0, 1, 2, 3, 4].map((i) => (
              <ShuffleCard key={i} index={i} phase={phase} />
            ))}
          </YStack>
          <Text fontFamily='$body' fontSize={13} color='$colorFocus' opacity={0.4} fontStyle='italic'>
            마음을 가다듬고 카드를 고르세요
          </Text>
        </YStack>
      )}

      {/* picking */}
      {phase === 'picking' && (
        <YStack flex={1} justifyContent='center' alignItems='center' gap='$8'>
          <YStack gap='$1' alignItems='center'>
            <Text
              fontFamily='$body'
              fontSize={11}
              letterSpacing={3}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.6}
              marginBottom='$2'
            >
              Choose
            </Text>
            <Text fontFamily='$heading' fontSize={32} fontWeight='300' color='$color' letterSpacing={-0.5}>
              카드를 골라주세요
            </Text>
          </YStack>
          <Text fontFamily='$body' fontSize={13} color='$colorFocus' opacity={0.4} fontStyle='italic'>
            끌리는 카드 하나를 선택하세요
          </Text>
          <XStack justifyContent='center' alignItems='center' height={180} width='100%' position='relative'>
            {[0, 1, 2, 3, 4].map((i) => (
              <PickCard key={i} index={i} onPick={() => handlePick(i)} disabled={false} />
            ))}
          </XStack>
        </YStack>
      )}

      {/* revealing */}
      {phase === 'revealing' && (
        <YStack flex={1} justifyContent='center' alignItems='center' gap='$8'>
          <YStack gap='$1' alignItems='center'>
            <Text
              fontFamily='$body'
              fontSize={11}
              letterSpacing={3}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.6}
              marginBottom='$2'
            >
              Revealing
            </Text>
            <Text fontFamily='$heading' fontSize={32} fontWeight='300' color='$color' letterSpacing={-0.5}>
              카드를 확인하는 중
            </Text>
          </YStack>
          <YStack alignItems='center'>
            {revealCard ? (
              <TarotCard card={revealCard} isRevealed size='lg' />
            ) : (
              <YStack
                width={160}
                height={240}
                borderWidth={1}
                borderColor='rgba(229,156,151,0.3)'
                backgroundColor='#f5f5f5'
                alignItems='center'
                justifyContent='center'
              >
                <Text fontSize={28} opacity={0.25} color='#e59c97'>✦</Text>
              </YStack>
            )}
          </YStack>
          <LoadingSpinner />
        </YStack>
      )}
    </>
  )
}

// ─── 캘린더 ───────────────────────────────────────────────────────────────────

function FortuneCalendar() {
  const now = new Date()
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  const [year, setYear] = useState(kstNow.getUTCFullYear())
  const [month, setMonth] = useState(kstNow.getUTCMonth() + 1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const monthQuery = trpc.fortune.listByMonth.useQuery({ year, month })

  const fortuneMap = useMemo(() => {
    const map = new Map<string, NonNullable<typeof monthQuery.data>[number]>()
    if (monthQuery.data) {
      for (const f of monthQuery.data) map.set(f.date, f)
    }
    return map
  }, [monthQuery.data])

  const selectedFortune = selectedDate ? fortuneMap.get(selectedDate) : null
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay()
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

  const handlePrevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1) }
    else setMonth(month - 1)
    setSelectedDate(null)
  }
  const handleNextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1) }
    else setMonth(month + 1)
    setSelectedDate(null)
  }

  return (
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
      {/* 헤더 */}
      <YStack marginBottom='$8'>
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
        <XStack alignItems='center' justifyContent='space-between'>
          <Text
            fontFamily='$heading'
            fontSize={34}
            fontWeight='300'
            letterSpacing={-0.5}
            color='$color'
            lineHeight={40}
          >
            {year}년 {month}월
          </Text>
          <XStack gap='$2'>
            <YStack
              padding='$2'
              cursor='pointer'
              pressStyle={{ opacity: 0.5 }}
              borderWidth={1}
              borderColor='rgba(0,0,0,0.10)'
              onPress={handlePrevMonth}
            >
              <ChevronLeft size={16} color='$colorFocus' />
            </YStack>
            <YStack
              padding='$2'
              cursor='pointer'
              pressStyle={{ opacity: 0.5 }}
              borderWidth={1}
              borderColor='rgba(0,0,0,0.10)'
              onPress={handleNextMonth}
            >
              <ChevronRight size={16} color='$colorFocus' />
            </YStack>
          </XStack>
        </XStack>
      </YStack>

      <YStack width='100%' height={1} backgroundColor='$borderColor' opacity={0.3} marginBottom='$4' />

      {/* 요일 헤더 */}
      <XStack marginBottom='$2'>
        {WEEKDAYS.map((day) => (
          <YStack key={day} flex={1} alignItems='center' paddingVertical='$2'>
            <Text
              fontFamily='$body'
              fontSize={10}
              letterSpacing={2}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.4}
            >
              {day}
            </Text>
          </YStack>
        ))}
      </XStack>

      {/* 날짜 그리드 */}
      <YStack gap='$1'>
        {Array.from({ length: Math.ceil((daysInMonth + firstDayOfWeek) / 7) }).map((_, weekIdx) => (
          <XStack key={weekIdx}>
            {Array.from({ length: 7 }).map((_, dayIdx) => {
              const dayNum = weekIdx * 7 + dayIdx - firstDayOfWeek + 1
              if (dayNum < 1 || dayNum > daysInMonth) {
                return <YStack key={dayIdx} flex={1} height={44} />
              }
              const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
              const hasFortune = fortuneMap.has(dateStr)
              const isSelected = selectedDate === dateStr

              return (
                <YStack
                  key={dayIdx}
                  flex={1}
                  height={44}
                  alignItems='center'
                  justifyContent='center'
                  backgroundColor={isSelected ? 'rgba(229,156,151,0.08)' : 'transparent'}
                  borderWidth={isSelected ? 1 : 0}
                  borderColor='rgba(229,156,151,0.4)'
                  cursor={hasFortune ? 'pointer' : 'default'}
                  opacity={hasFortune ? 1 : 0.25}
                  pressStyle={hasFortune ? { opacity: 0.6 } : undefined}
                  onPress={() => { if (hasFortune) setSelectedDate(dateStr) }}
                >
                  <Text
                    fontFamily='$body'
                    fontSize={13}
                    fontWeight={hasFortune ? '500' : '300'}
                    color={isSelected ? '#e59c97' : '$color'}
                  >
                    {dayNum}
                  </Text>
                  {hasFortune && (
                    <YStack
                      width={3}
                      height={3}
                      borderRadius={2}
                      backgroundColor={isSelected ? '#e59c97' : 'rgba(229,156,151,0.5)'}
                      position='absolute'
                      bottom={5}
                    />
                  )}
                </YStack>
              )
            })}
          </XStack>
        ))}
      </YStack>

      {/* 선택된 날짜 운세 */}
      {selectedFortune && (
        <YStack marginTop='$6'>
          <Divider />
          <FortuneResult
            cardId={selectedFortune.cardId}
            cardDirection={selectedFortune.cardDirection}
            interpretation={selectedFortune.interpretation}
            characterId={selectedFortune.characterId}
            date={selectedFortune.date}
          />
        </YStack>
      )}

      {monthQuery.isLoading && (
        <YStack alignItems='center' paddingVertical='$6'>
          <LoadingSpinner />
        </YStack>
      )}
    </YStack>
  )
}

// ─── 메인 FortuneScreen ───────────────────────────────────────────────────────

type TabType = 'today' | 'calendar'

export function FortuneScreen() {
  const { user, isLoading: isUserLoading, session } = useUser()
  const [activeTab, setActiveTab] = useState<TabType>('today')

  const todayQuery = trpc.fortune.getToday.useQuery(undefined, {
    enabled: !!session,
    retry: 2,
    retryDelay: 1000,
  })

  if (isUserLoading) {
    return (
      <YStack flex={1} justifyContent='center' alignItems='center' backgroundColor='$background'>
        <LoadingSpinner />
      </YStack>
    )
  }

  if (!user) {
    return (
      <YStack flex={1} backgroundColor='$background'>
        <LoginPrompt />
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor='$background'>
      {/* 탭 바 */}
      <XStack
        borderBottomWidth={1}
        borderBottomColor='rgba(0,0,0,0.07)'
        paddingHorizontal={24}
        $gtSm={{ paddingHorizontal: 48 }}
      >
        {(['today', 'calendar'] as TabType[]).map((tab) => (
          <YStack
            key={tab}
            paddingVertical='$3'
            paddingHorizontal='$2'
            marginRight='$5'
            borderBottomWidth={2}
            borderBottomColor={activeTab === tab ? '#111111' : 'transparent'}
            cursor='pointer'
            pressStyle={{ opacity: 0.6 }}
            onPress={() => setActiveTab(tab)}
            // @ts-ignore
            style={{ transition: 'border-color 0.15s ease' }}
          >
            <Text
              fontFamily='$body'
              fontSize={11}
              fontWeight='500'
              letterSpacing={2}
              textTransform='uppercase'
              color={activeTab === tab ? '$color' : '$colorFocus'}
              opacity={activeTab === tab ? 1 : 0.5}
            >
              {tab === 'today' ? 'Today' : 'History'}
            </Text>
          </YStack>
        ))}
      </XStack>

      {/* 탭 콘텐츠 */}
      {activeTab === 'today' ? (
        todayQuery.isLoading || todayQuery.fetchStatus === 'fetching' ? (
          <YStack flex={1} justifyContent='center' alignItems='center'>
            <LoadingSpinner />
          </YStack>
        ) : todayQuery.data ? (
          <FortuneResult
            cardId={todayQuery.data.cardId}
            cardDirection={todayQuery.data.cardDirection}
            interpretation={todayQuery.data.interpretation}
            characterId={todayQuery.data.characterId}
            date={todayQuery.data.date}
          />
        ) : (
          <DrawFortuneView />
        )
      ) : (
        <ScrollView>
          <FortuneCalendar />
        </ScrollView>
      )}
    </YStack>
  )
}
