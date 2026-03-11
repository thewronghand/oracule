import React, { useState, useMemo, useRef } from 'react'
import { H2, H3, Paragraph, ScrollView, Separator, XStack, YStack, Text } from 'tamagui'
import { LoadingSpinner, OraculeButton, TarotCard } from '@t4/ui'
import { useLink } from 'solito/link'
import { trpc } from 'app/utils/trpc'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { tarotDeck } from 'app/data/tarotDeck'
import { getCardImageUrl } from 'app/utils/cardImage'
import { CHARACTERS, type CharacterId } from 'app/types/character'
import { getCharacterById } from 'app/types/character'
import type { DrawnTarotCard } from 'app/types/card'
import type { ReadingInterpretation } from 'app/types/reading'
import { LogIn, ChevronLeft, ChevronRight, Calendar, Sun } from '@tamagui/lucide-icons'

// 운세 해석 JSON 파싱 (이중 stringify + 마크다운 코드블록 + content 내 중첩 JSON 대응)
function parseFortuneInterpretation(raw: string): {
  title: string
  summary: string
  content: string
} {
  // 마크다운 코드블록 제거 헬퍼
  const stripCodeBlock = (text: string): string => {
    const trimmed = text.trim()
    if (trimmed.startsWith('```')) {
      return trimmed.replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '')
    }
    return trimmed
  }

  // JSON에서 { title, summary, content } 추출 (content가 또 JSON이면 재귀 파싱)
  const extractFortune = (
    obj: Record<string, unknown>
  ): { title: string; summary: string; content: string } => {
    const content = typeof obj.content === 'string' ? obj.content : ''

    // content가 마크다운 코드블록이거나 JSON 문자열이면 내부를 한 번 더 파싱
    const innerStr = stripCodeBlock(content)
    try {
      const inner: unknown = JSON.parse(innerStr)
      if (typeof inner === 'object' && inner !== null && 'content' in inner) {
        return extractFortune(inner as Record<string, unknown>)
      }
    } catch {
      // content는 일반 텍스트
    }

    return {
      title: typeof obj.title === 'string' && obj.title !== '타로 리딩 결과' ? obj.title : '오늘의 운세',
      summary: typeof obj.summary === 'string' ? obj.summary : '',
      content,
    }
  }

  try {
    const cleaned = stripCodeBlock(raw)
    const parsed: unknown = JSON.parse(cleaned)

    // 이중 stringify: 파싱 결과가 문자열이면 한 번 더 파싱
    if (typeof parsed === 'string') {
      return parseFortuneInterpretation(parsed)
    }

    if (typeof parsed === 'object' && parsed !== null && 'content' in parsed) {
      return extractFortune(parsed as Record<string, unknown>)
    }
  } catch {
    // JSON 파싱 실패
  }

  return { title: '오늘의 운세', summary: '', content: raw }
}

// DB fortune → DrawnTarotCard 변환
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

function LoginPrompt() {
  const loginLink = useLink({ href: '/login' })

  return (
    <YStack flex={1} justifyContent='center' alignItems='center' padding='$6' gap='$4'>
      <LogIn size={48} color='$purple8' />
      <H2 textAlign='center' color='$color'>
        로그인이 필요해요
      </H2>
      <Paragraph textAlign='center' color='$colorSubtle'>
        오늘의 운세를 보려면 먼저 로그인해주세요.
      </Paragraph>
      <OraculeButton variant='primary' {...loginLink}>
        로그인하기
      </OraculeButton>
    </YStack>
  )
}

interface FortuneResultProps {
  cardId: number
  cardDirection: string
  interpretation: string
  characterId: string | null
  date: string
}

function FortuneResult({
  cardId,
  cardDirection,
  interpretation,
  characterId,
  date,
}: FortuneResultProps) {
  const interp = parseFortuneInterpretation(interpretation)
  const drawnCard = fortuneToDrawnCard(cardId, cardDirection)
  const character = getCharacterById(characterId)
  const homeLink = useLink({ href: '/' })

  return (
    <ScrollView>
      <YStack
        padding='$4'
        gap='$6'
        paddingBottom='$12'
        maxWidth={640}
        width='100%'
        alignSelf='center'
      >
        {/* 헤더 */}
        <YStack alignItems='center' gap='$3' paddingTop='$2'>
          <Text fontSize='$2' color='$colorSubtle'>
            {date}
          </Text>
          <H2 textAlign='center' color='$accentBackground' letterSpacing={1}>
            {interp.title}
          </H2>
          {character.id !== 'default' && (
            <XStack alignItems='center' gap='$2'>
              <Text fontSize={18}>{character.emoji}</Text>
              <Text fontSize='$3' color='$colorSubtle' fontWeight='500'>
                {character.name}의 해석
              </Text>
            </XStack>
          )}
          {interp.summary ? (
            <Paragraph textAlign='center' color='$colorSubtle' fontSize='$3' fontStyle='italic'>
              {interp.summary}
            </Paragraph>
          ) : null}
          <YStack width={160} height={1} backgroundColor='$borderColor' opacity={0.3} />
        </YStack>

        {/* 카드 */}
        <YStack alignItems='center'>
          <TarotCard card={drawnCard} isRevealed size='lg' />
          <XStack alignItems='center' gap='$2' marginTop='$3'>
            <Text fontSize='$4' fontWeight='600' color='$color'>
              {drawnCard.name.ko}
            </Text>
            <Text fontSize='$3' color='$colorSubtle'>
              ({drawnCard.direction})
            </Text>
          </XStack>
        </YStack>

        <Separator borderColor='$borderColor' opacity={0.3} />

        {/* 해석 */}
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
          <Paragraph lineHeight='$7' fontSize='$4' color='$color'>
            {interp.content}
          </Paragraph>
        </YStack>

        {/* 안내 */}
        <YStack alignItems='center' gap='$2' paddingVertical='$4'>
          <Text fontSize='$3' color='$purple8' fontWeight='500'>
            내일 다시 만나요
          </Text>
          <Text fontSize='$2' color='$colorSubtle'>
            매일 새로운 카드가 당신을 기다립니다
          </Text>
        </YStack>

        <OraculeButton variant='secondary' customSize='md' {...homeLink}>
          홈으로 돌아가기
        </OraculeButton>
      </YStack>
    </ScrollView>
  )
}

type DrawPhase = 'idle' | 'shuffling' | 'picking' | 'revealing' | 'done'

// 셔플 중 카드 뒷면 컴포넌트
function ShuffleCard({ index, phase }: { index: number; phase: DrawPhase }) {
  const isShuffling = phase === 'shuffling'
  // 각 카드마다 다른 위치/회전으로 셔플 애니메이션
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
      borderRadius='$3'
      borderWidth={1.5}
      borderColor='$purple8'
      overflow='hidden'
      animation='bouncy'
      x={isShuffling ? offset.x : 0}
      y={isShuffling ? offset.y : 0}
      rotate={isShuffling ? offset.rotate : '0deg'}
      opacity={1}
      scale={isShuffling ? 1 : 0.95}
      zIndex={5 - index}
    >
      {/* 카드 뒷면 디자인 */}
      <YStack
        flex={1}
        backgroundColor='$purple10'
        alignItems='center'
        justifyContent='center'
      >
        <YStack
          width={70}
          height={115}
          borderRadius='$2'
          borderWidth={1}
          borderColor='$purple8'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize={24} opacity={0.6}>
            ✦
          </Text>
        </YStack>
      </YStack>
    </YStack>
  )
}

// 뽑기용 펼쳐진 카드
function PickCard({
  index,
  onPick,
  disabled,
}: {
  index: number
  onPick: () => void
  disabled: boolean
}) {
  // 5장 부채꼴 배치
  const angles = [-20, -10, 0, 10, 20]
  const xOffsets = [-80, -40, 0, 40, 80]

  return (
    <YStack
      width={80}
      height={120}
      borderRadius='$3'
      borderWidth={1.5}
      borderColor='$purple8'
      overflow='hidden'
      animation='bouncy'
      x={xOffsets[index]}
      rotate={`${angles[index]}deg`}
      cursor={disabled ? 'default' : 'pointer'}
      pressStyle={disabled ? undefined : { scale: 1.08, y: -10 }}
      hoverStyle={disabled ? undefined : { scale: 1.05, y: -6, borderColor: '$yellow8' }}
      onPress={disabled ? undefined : onPick}
    >
      <YStack
        flex={1}
        backgroundColor='$purple10'
        alignItems='center'
        justifyContent='center'
      >
        <YStack
          width={62}
          height={100}
          borderRadius='$2'
          borderWidth={1}
          borderColor='$purple8'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize={18} opacity={0.6}>
            ✦
          </Text>
        </YStack>
      </YStack>
    </YStack>
  )
}

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
    // 프론트에서 카드 뽑기 → 즉시 이미지 프리로드
    const cardId = Math.floor(Math.random() * 78)
    const direction: '정방향' | '역방향' = Math.random() > 0.5 ? '정방향' : '역방향'
    drawnCardRef.current = { cardId, direction }

    imageLoadedRef.current = false
    if (typeof window !== 'undefined') {
      const img = new window.Image()
      img.onload = () => {
        imageLoadedRef.current = true
      }
      img.src = getCardImageUrl(cardId)
    }

    setPhase('shuffling')
    createMutation.mutate({ cardId, direction, characterId: selectedCharacter })

    // 1.5초 셔플 후 picking으로 전환
    setTimeout(() => {
      setPhase('picking')
    }, 1500)
  }

  const handlePick = (index: number) => {
    setPickedIndex(index)
    setPhase('revealing')

    // 리빌 지연 로직: API 응답 + 이미지 로드 + 최소 2초 대기
    const checkAndTransition = () => {
      if (mutationCompletedAtRef.current && imageLoadedRef.current) {
        // 응답 도착 + 이미지 로드 완료 → 2초 의도적 지연
        const elapsed = Date.now() - mutationCompletedAtRef.current
        const remaining = Math.max(0, 2000 - elapsed)
        setTimeout(() => {
          utils.fortune.getToday.invalidate()
        }, remaining)
      } else {
        // 아직 대기 중 → 100ms마다 폴링
        setTimeout(checkAndTransition, 100)
      }
    }

    // 플립 애니메이션 시간(600ms) 후 체크 시작
    setTimeout(checkAndTransition, 600)
  }

  const revealData = mutationDataRef.current
  const revealCard = revealData
    ? fortuneToDrawnCard(revealData.cardId, revealData.cardDirection)
    : null

  return (
    <>
      {/* idle 상태 */}
      {phase === 'idle' && (
        <ScrollView>
          <YStack
            padding='$4'
            gap='$6'
            paddingBottom='$12'
            maxWidth={640}
            width='100%'
            alignSelf='center'
          >
            <YStack alignItems='center' gap='$3' paddingTop='$4'>
              <Sun size={40} color='$yellow8' />
              <Text fontSize='$8' fontWeight='700' textAlign='center' color='$accentBackground' letterSpacing={1}>
                오늘의 운세
              </Text>
              <Paragraph textAlign='center' color='$colorSubtle' fontSize='$3'>
                카드 한 장으로 오늘 하루를 점쳐보세요
              </Paragraph>
              <YStack width={160} height={1} backgroundColor='$borderColor' opacity={0.3} />
            </YStack>

            <YStack gap='$3'>
              <Text fontSize='$6' fontWeight='700' color='$accentBackground' letterSpacing={0.5}>
                누가 해석해줄까요?
              </Text>
              <XStack flexWrap='wrap' gap='$3'>
                {CHARACTERS.map((character) => {
                  const isSelected = selectedCharacter === character.id
                  return (
                    <YStack
                      key={character.id}
                      flex={1}
                      minWidth='45%'
                      backgroundColor={isSelected ? '$purple10' : '$backgroundHover'}
                      borderRadius='$4'
                      padding='$3'
                      borderWidth={isSelected ? 1.5 : 1}
                      borderColor={isSelected ? '$yellow8' : '$borderColor'}
                      pressStyle={{ opacity: 0.7, scale: 0.98 }}
                      onPress={() => setSelectedCharacter(character.id)}
                      cursor='pointer'
                      alignItems='center'
                      gap='$1'
                    >
                      <Text fontSize={28}>{character.emoji}</Text>
                      <Text
                        fontSize='$3'
                        fontWeight={isSelected ? '700' : '500'}
                        color={isSelected ? '$color' : '$colorSubtle'}
                        textAlign='center'
                      >
                        {character.name}
                      </Text>
                      <Text
                        fontSize='$1'
                        color={isSelected ? '$color3' : '$colorSubtle'}
                        textAlign='center'
                      >
                        {character.description}
                      </Text>
                    </YStack>
                  )
                })}
              </XStack>
            </YStack>

            <Separator borderColor='$borderColor' opacity={0.3} />

            <YStack alignItems='center' gap='$3'>
              <YStack position='relative' alignItems='center' justifyContent='center'>
                <YStack
                  position='absolute'
                  width={240}
                  height={60}
                  borderRadius='$6'
                  backgroundColor='$purple8'
                  opacity={0.18}
                  scale={1.08}
                />
                <OraculeButton
                  variant='primary'
                  customSize='lg'
                  minWidth={220}
                  onPress={handleStart}
                >
                  오늘의 카드 뽑기
                </OraculeButton>
              </YStack>
            </YStack>

            {createMutation.isError && (
              <Paragraph textAlign='center' color='$red10' fontSize='$3'>
                {createMutation.error?.message ?? '오류가 발생했습니다.'}
              </Paragraph>
            )}
          </YStack>
        </ScrollView>
      )}

      {/* shuffling 상태 */}
      {phase === 'shuffling' && (
        <YStack flex={1} justifyContent='center' alignItems='center' gap='$6'>
          <Text fontSize='$8' fontWeight='700' color='$accentBackground' letterSpacing={1}>
            카드를 섞는 중...
          </Text>
          <YStack
            width={200}
            height={200}
            alignItems='center'
            justifyContent='center'
            position='relative'
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <ShuffleCard key={i} index={i} phase={phase} />
            ))}
          </YStack>
          <Paragraph color='$colorSubtle' fontSize='$3'>
            마음을 가다듬고 카드를 고르세요
          </Paragraph>
        </YStack>
      )}

      {/* picking 상태 */}
      {phase === 'picking' && (
        <YStack flex={1} justifyContent='center' alignItems='center' gap='$6'>
          <Text fontSize='$8' fontWeight='700' color='$accentBackground' letterSpacing={1}>
            카드를 골라주세요
          </Text>
          <Paragraph color='$colorSubtle' fontSize='$3'>
            끌리는 카드 하나를 선택하세요
          </Paragraph>
          <XStack
            justifyContent='center'
            alignItems='center'
            height={180}
            width='100%'
            position='relative'
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <PickCard key={i} index={i} onPick={() => handlePick(i)} disabled={false} />
            ))}
          </XStack>
        </YStack>
      )}

      {/* revealing 상태 */}
      {phase === 'revealing' && (
        <YStack flex={1} justifyContent='center' alignItems='center' gap='$6'>
          <Text fontSize='$8' fontWeight='700' color='$accentBackground' letterSpacing={1}>
            카드를 확인하는 중...
          </Text>
          <YStack alignItems='center'>
            {revealCard ? (
              <TarotCard card={revealCard} isRevealed size='lg' />
            ) : (
              <YStack
                width={160}
                height={240}
                borderRadius='$4'
                borderWidth={1.5}
                borderColor='$purple8'
                backgroundColor='$purple10'
                alignItems='center'
                justifyContent='center'
              >
                <Text fontSize={32} opacity={0.6}>
                  ✦
                </Text>
              </YStack>
            )}
          </YStack>
          <LoadingSpinner />
        </YStack>
      )}
    </>
  )
}

// 캘린더 컴포넌트
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
      for (const f of monthQuery.data) {
        map.set(f.date, f)
      }
    }
    return map
  }, [monthQuery.data])

  const selectedFortune = selectedDate ? fortuneMap.get(selectedDate) : null

  // 캘린더 그리드 데이터
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay()
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setSelectedDate(null)
  }

  return (
    <YStack gap='$4' maxWidth={640} width='100%' alignSelf='center'>
      {/* 월 네비게이션 */}
      <XStack justifyContent='space-between' alignItems='center' paddingHorizontal='$2'>
        <YStack
          padding='$2'
          cursor='pointer'
          pressStyle={{ opacity: 0.6 }}
          onPress={handlePrevMonth}
        >
          <ChevronLeft size={24} color='$color' />
        </YStack>
        <Text fontSize='$5' fontWeight='600' color='$color'>
          {year}년 {month}월
        </Text>
        <YStack
          padding='$2'
          cursor='pointer'
          pressStyle={{ opacity: 0.6 }}
          onPress={handleNextMonth}
        >
          <ChevronRight size={24} color='$color' />
        </YStack>
      </XStack>

      {/* 요일 헤더 */}
      <XStack>
        {WEEKDAYS.map((day) => (
          <YStack key={day} flex={1} alignItems='center' padding='$1'>
            <Text fontSize='$2' color='$colorSubtle' fontWeight='600'>
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
              const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(
                2,
                '0'
              )}`
              const hasFortune = fortuneMap.has(dateStr)
              const isSelected = selectedDate === dateStr

              return (
                <YStack
                  key={dayIdx}
                  flex={1}
                  height={44}
                  alignItems='center'
                  justifyContent='center'
                  borderRadius='$2'
                  backgroundColor={isSelected ? '$purple10' : 'transparent'}
                  borderWidth={isSelected ? 1 : 0}
                  borderColor='$yellow8'
                  cursor={hasFortune ? 'pointer' : 'default'}
                  opacity={hasFortune ? 1 : 0.4}
                  pressStyle={hasFortune ? { opacity: 0.7 } : undefined}
                  onPress={() => {
                    if (hasFortune) setSelectedDate(dateStr)
                  }}
                >
                  <Text
                    fontSize='$3'
                    fontWeight={hasFortune ? '600' : '400'}
                    color={isSelected ? '$color' : hasFortune ? '$color' : '$colorSubtle'}
                  >
                    {dayNum}
                  </Text>
                  {hasFortune && (
                    <YStack
                      width={6}
                      height={6}
                      borderRadius={3}
                      backgroundColor={isSelected ? '$yellow8' : '$purple8'}
                      position='absolute'
                      bottom={4}
                    />
                  )}
                </YStack>
              )
            })}
          </XStack>
        ))}
      </YStack>

      {/* 선택된 날짜의 운세 미리보기 */}
      {selectedFortune && (
        <YStack
          backgroundColor='$backgroundHover'
          borderRadius='$4'
          padding='$4'
          borderWidth={1}
          borderColor='$borderColor'
          gap='$3'
        >
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
        <YStack alignItems='center' paddingVertical='$4'>
          <LoadingSpinner />
        </YStack>
      )}
    </YStack>
  )
}

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
        paddingHorizontal='$4'
        paddingTop='$4'
        gap='$3'
        maxWidth={640}
        width='100%'
        alignSelf='center'
      >
        <YStack
          flex={1}
          paddingVertical='$2'
          alignItems='center'
          borderBottomWidth={2}
          borderBottomColor={activeTab === 'today' ? '$accentBackground' : 'transparent'}
          cursor='pointer'
          pressStyle={{ opacity: 0.7 }}
          onPress={() => setActiveTab('today')}
        >
          <XStack alignItems='center' gap='$2'>
            <Sun size={16} color={activeTab === 'today' ? '$accentBackground' : '$colorSubtle'} />
            <Text
              fontSize='$3'
              fontWeight={activeTab === 'today' ? '700' : '400'}
              color={activeTab === 'today' ? '$accentBackground' : '$colorSubtle'}
            >
              오늘의 운세
            </Text>
          </XStack>
        </YStack>
        <YStack
          flex={1}
          paddingVertical='$2'
          alignItems='center'
          borderBottomWidth={2}
          borderBottomColor={activeTab === 'calendar' ? '$accentBackground' : 'transparent'}
          cursor='pointer'
          pressStyle={{ opacity: 0.7 }}
          onPress={() => setActiveTab('calendar')}
        >
          <XStack alignItems='center' gap='$2'>
            <Calendar
              size={16}
              color={activeTab === 'calendar' ? '$accentBackground' : '$colorSubtle'}
            />
            <Text
              fontSize='$3'
              fontWeight={activeTab === 'calendar' ? '700' : '400'}
              color={activeTab === 'calendar' ? '$accentBackground' : '$colorSubtle'}
            >
              히스토리
            </Text>
          </XStack>
        </YStack>
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
          <YStack padding='$4' paddingBottom='$12'>
            <FortuneCalendar />
          </YStack>
        </ScrollView>
      )}
    </YStack>
  )
}
