import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { H2, H3, Paragraph, ScrollView, Text, XStack, YStack } from '@t4/ui'
import { OraculeButton } from '@t4/ui/src/Button'
import { LoadingSpinner } from '@t4/ui/src/LoadingSpinner'
import { SpreadLayout } from '@t4/ui/src/tarot/SpreadLayout'
import { TarotCard } from '@t4/ui/src/tarot/TarotCard'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import type { DrawnTarotCard } from 'app/types/card'
import { SPREAD_INFO, type SpreadType, spreadOptions } from 'app/types/spread'
import { drawRandomCards } from 'app/utils/drawRandomCards'
import { trpc } from 'app/utils/trpc'

const { useParam } = createParam<{ spreadType: string; question: string }>()

type DrawPhase = 'shuffle' | 'cut' | 'draw' | 'reveal'

// 셔플 페이즈에서 카드 더미를 보여주는 컴포넌트
function ShufflePhase({ onShuffle }: { onShuffle: () => void }) {
  const [isShuffling, setIsShuffling] = useState(false)

  const handleShuffle = useCallback(() => {
    setIsShuffling(true)
    // 셔플 애니메이션 시간 후 다음 단계로
    setTimeout(() => {
      onShuffle()
    }, 1200)
  }, [onShuffle])

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$6" padding="$4">
      <H2 textAlign="center" color="$color">카드를 셔플합니다</H2>
      <Paragraph textAlign="center" color="$color3">
        카드를 섞어 운명의 배열을 만듭니다
      </Paragraph>

      {/* 카드 더미 */}
      <YStack
        alignItems="center"
        justifyContent="center"
        height={260}
        width={180}
        position="relative"
      >
        {[4, 3, 2, 1, 0].map((i) => (
          <YStack
            key={i}
            position="absolute"
            width={120}
            height={180}
            borderRadius={12}
            borderWidth={1.5}
            borderColor="$yellow8"
            backgroundColor="$purple10"
            alignItems="center"
            justifyContent="center"
            shadowColor="$shadowColor"
            shadowOpacity={0.3}
            shadowRadius={4}
            shadowOffset={{ width: 0, height: 2 }}
            {...(isShuffling
              ? {
                  x: i % 2 === 0 ? -20 + i * 5 : 20 - i * 5,
                  y: -i * 4 + (isShuffling ? (i % 2 === 0 ? -10 : 10) : 0),
                  rotate: `${(i - 2) * 3}deg`,
                }
              : {
                  y: -i * 4,
                  x: 0,
                })}
          />
        ))}
      </YStack>

      <OraculeButton
        variant="primary"
        customSize="lg"
        onPress={handleShuffle}
        disabled={isShuffling}
        opacity={isShuffling ? 0.6 : 1}
      >
        {isShuffling ? '셔플 중...' : '셔플하기'}
      </OraculeButton>
    </YStack>
  )
}

// 컷 페이즈 - 3개 더미 중 순서대로 선택
function CutPhase({ onComplete }: { onComplete: () => void }) {
  const [tappedStacks, setTappedStacks] = useState<number[]>([])

  const handleTapStack = useCallback(
    (stackIndex: number) => {
      if (tappedStacks.includes(stackIndex)) return
      const next = [...tappedStacks, stackIndex]
      setTappedStacks(next)

      if (next.length === 3) {
        setTimeout(() => {
          onComplete()
        }, 600)
      }
    },
    [tappedStacks, onComplete]
  )

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$6" padding="$4">
      <H2 textAlign="center" color="$color">카드를 컷합니다</H2>
      <Paragraph textAlign="center" color="$color3">
        세 더미를 순서대로 터치하세요 ({tappedStacks.length}/3)
      </Paragraph>

      <XStack gap="$4" justifyContent="center" alignItems="center">
        {[0, 1, 2].map((stackIndex) => {
          const isTapped = tappedStacks.includes(stackIndex)
          const tapOrder = tappedStacks.indexOf(stackIndex)
          return (
            <YStack
              key={stackIndex}
              width={100}
              height={150}
              borderRadius={12}
              borderWidth={2}
              borderColor={isTapped ? '$green8' : '$yellow8'}
              backgroundColor={isTapped ? '$green3' : '$purple10'}
              alignItems="center"
              justifyContent="center"
              animation="cardReveal"
              enterStyle={{ opacity: 0, scale: 0.8, y: 20 }}
              pressStyle={!isTapped ? { scale: 0.95, opacity: 0.8 } : {}}
              cursor={!isTapped ? 'pointer' : 'default'}
              onPress={() => handleTapStack(stackIndex)}
              shadowColor="$shadowColor"
              shadowOpacity={0.3}
              shadowRadius={6}
              shadowOffset={{ width: 0, height: 3 }}
            >
              {isTapped ? (
                <Text fontSize="$6" fontWeight="700" color="$green10">
                  {tapOrder + 1}
                </Text>
              ) : (
                <Text fontSize="$3" color="$yellow8" fontWeight="600">
                  더미 {stackIndex + 1}
                </Text>
              )}
            </YStack>
          )
        })}
      </XStack>
    </YStack>
  )
}

// 드로우 페이즈 - 카드 선택
function DrawPhaseView({
  cardCount,
  drawnCards,
  onComplete,
}: {
  cardCount: number
  drawnCards: DrawnTarotCard[]
  onComplete: (selectedIndices: number[]) => void
}) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  // 표시할 카드 수: 실제 뽑을 수의 2~3배 (최소 12장, 최대 21장)
  const displayCount = Math.min(Math.max(cardCount * 3, 12), 21)

  const handleSelectCard = useCallback(
    (index: number) => {
      if (selectedIndices.includes(index)) {
        setSelectedIndices(selectedIndices.filter((i) => i !== index))
        return
      }
      if (selectedIndices.length >= cardCount) return

      const next = [...selectedIndices, index]
      setSelectedIndices(next)

      if (next.length === cardCount) {
        setTimeout(() => {
          onComplete(next)
        }, 500)
      }
    },
    [selectedIndices, cardCount, onComplete]
  )

  return (
    <YStack flex={1} gap="$4" padding="$4">
      <YStack alignItems="center" gap="$2">
        <H2 textAlign="center" color="$color">카드를 선택하세요</H2>
        <Paragraph textAlign="center" color="$color3">
          마음이 이끄는 카드를 {cardCount}장 골라주세요
        </Paragraph>
        <Text
          fontSize="$5"
          fontWeight="700"
          color={selectedIndices.length === cardCount ? '$green10' : '$accentBackground'}
        >
          {selectedIndices.length} / {cardCount} 장 선택됨
        </Text>
      </YStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <XStack flexWrap="wrap" justifyContent="center" gap="$3" paddingBottom="$6">
          {Array.from({ length: displayCount }).map((_, index) => {
            const isSelected = selectedIndices.includes(index)
            return (
              <YStack
                key={index}
                animation="cardReveal"
                enterStyle={{ opacity: 0, scale: 0.8 }}
                scale={isSelected ? 1.05 : 1}
                y={isSelected ? -8 : 0}
              >
                <YStack
                  width={80}
                  height={120}
                  borderRadius={12}
                  borderWidth={isSelected ? 2.5 : 1.5}
                  borderColor={isSelected ? '$green8' : '$yellow8'}
                  backgroundColor={isSelected ? '$purple8' : '$purple10'}
                  alignItems="center"
                  justifyContent="center"
                  onPress={() => handleSelectCard(index)}
                  pressStyle={{ scale: 0.95, opacity: 0.85 }}
                  cursor="pointer"
                  shadowColor={isSelected ? '$green8' : '$shadowColor'}
                  shadowOpacity={isSelected ? 0.5 : 0.3}
                  shadowRadius={isSelected ? 8 : 4}
                  shadowOffset={{ width: 0, height: isSelected ? 4 : 2 }}
                >
                  {isSelected && (
                    <Text fontSize="$4" fontWeight="700" color="$green8">
                      {selectedIndices.indexOf(index) + 1}
                    </Text>
                  )}
                </YStack>
              </YStack>
            )
          })}
        </XStack>
      </ScrollView>
    </YStack>
  )
}

// 리빌 페이즈 - 카드 순차 공개
function RevealPhase({
  spreadType,
  drawnCards,
  readingId,
  isApiLoading,
}: {
  spreadType: SpreadType
  drawnCards: DrawnTarotCard[]
  readingId: string | null
  isApiLoading: boolean
}) {
  const router = useRouter()
  const [revealedIndices, setRevealedIndices] = useState<number[]>([])
  const [allRevealed, setAllRevealed] = useState(false)

  // 순차적으로 카드 공개
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (revealedIndices.length < drawnCards.length) {
      timeout = setTimeout(() => {
        setRevealedIndices((prev) => [...prev, prev.length])
      }, 600)
    } else if (revealedIndices.length === drawnCards.length && drawnCards.length > 0) {
      setAllRevealed(true)
    }
    return () => clearTimeout(timeout)
  }, [revealedIndices.length, drawnCards.length])

  const handleViewResult = useCallback(() => {
    if (readingId) {
      router.push(`/result/${readingId}`)
    }
  }, [readingId, router])

  return (
    <YStack flex={1} gap="$4" padding="$4">
      <YStack alignItems="center" gap="$2">
        <H2 textAlign="center" color="$color">카드가 공개됩니다</H2>
        <Paragraph textAlign="center" color="$color3">
          {allRevealed
            ? '모든 카드가 공개되었습니다'
            : `${revealedIndices.length} / ${drawnCards.length} 카드 공개 중...`}
        </Paragraph>
      </YStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
        <SpreadLayout
          spreadType={spreadType}
          cards={drawnCards}
          revealedIndices={revealedIndices}
        />
      </ScrollView>

      {allRevealed && (
        <YStack
          alignItems="center"
          gap="$3"
          paddingBottom="$4"
          animation="fadeIn"
          enterStyle={{ opacity: 0, y: 20 }}
        >
          {isApiLoading ? (
            <YStack gap="$3" alignItems="center">
              <LoadingSpinner message="해석을 준비하고 있습니다..." />
              <Paragraph fontSize="$2" color="$color3" textAlign="center">
                카드의 의미를 깊이 분석하고 있어요
              </Paragraph>
            </YStack>
          ) : readingId ? (
            <OraculeButton variant="primary" customSize="lg" onPress={handleViewResult}>
              결과 보기
            </OraculeButton>
          ) : (
            <YStack gap="$2" alignItems="center">
              <Paragraph color="$red10" textAlign="center">
                해석 생성에 실패했습니다
              </Paragraph>
              <OraculeButton variant="secondary" customSize="md" onPress={handleViewResult}>
                다시 시도
              </OraculeButton>
            </YStack>
          )}
        </YStack>
      )}
    </YStack>
  )
}

// 상단 진행 표시기
function PhaseIndicator({ currentPhase }: { currentPhase: DrawPhase }) {
  const phases: { key: DrawPhase; label: string }[] = [
    { key: 'shuffle', label: '셔플' },
    { key: 'cut', label: '컷' },
    { key: 'draw', label: '드로우' },
    { key: 'reveal', label: '리빌' },
  ]

  const currentIndex = phases.findIndex((p) => p.key === currentPhase)

  return (
    <XStack justifyContent="center" alignItems="center" gap="$2" paddingVertical="$3">
      {phases.map((p, index) => {
        const isActive = index === currentIndex
        const isDone = index < currentIndex
        return (
          <XStack key={p.key} alignItems="center" gap="$2">
            <YStack
              width={28}
              height={28}
              borderRadius={14}
              backgroundColor={isDone ? '$green8' : isActive ? '$accentBackground' : '$backgroundStrong'}
              alignItems="center"
              justifyContent="center"
              borderWidth={isActive ? 2 : 0}
              borderColor="$accentBackground"
            >
              <Text
                fontSize="$1"
                fontWeight="700"
                color={isDone || isActive ? 'white' : '$color3'}
              >
                {isDone ? '✓' : index + 1}
              </Text>
            </YStack>
            <Text
              fontSize="$2"
              fontWeight={isActive ? '700' : '400'}
              color={isActive ? '$color' : '$color3'}
            >
              {p.label}
            </Text>
            {index < phases.length - 1 && (
              <YStack
                width={20}
                height={2}
                backgroundColor={isDone ? '$green8' : '$backgroundStrong'}
                borderRadius={1}
              />
            )}
          </XStack>
        )
      })}
    </XStack>
  )
}

export function DrawScreen() {
  const [spreadTypeParam] = useParam('spreadType')
  const [questionParam] = useParam('question')

  const spreadType = (spreadTypeParam ?? 'SINGLE') as SpreadType
  const question = questionParam ? decodeURIComponent(questionParam) : ''

  const spreadInfo = SPREAD_INFO[spreadType]
  const cardCount = spreadOptions.find((s) => s.value === spreadType)?.cardCount ?? 1

  const [phase, setPhase] = useState<DrawPhase>('shuffle')
  const [drawnCards, setDrawnCards] = useState<DrawnTarotCard[]>([])
  const [readingId, setReadingId] = useState<string | null>(null)
  const [isApiLoading, setIsApiLoading] = useState(false)

  const createReading = trpc.reading.create.useMutation()

  // 컴포넌트 마운트 시 카드를 뽑고 API 호출 시작
  const apiCalledRef = useRef(false)
  useEffect(() => {
    if (apiCalledRef.current) return
    apiCalledRef.current = true

    const cards = drawRandomCards(cardCount)
    setDrawnCards(cards)
    setIsApiLoading(true)

    createReading
      .mutateAsync({
        question,
        cards,
        spreadType,
      })
      .then((result) => {
        setReadingId(result.id)
        setIsApiLoading(false)
      })
      .catch((error) => {
        console.error('리딩 생성 실패:', error)
        setIsApiLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShuffleComplete = useCallback(() => {
    setPhase('cut')
  }, [])

  const handleCutComplete = useCallback(() => {
    setPhase('draw')
  }, [])

  const handleDrawComplete = useCallback(
    (_selectedIndices: number[]) => {
      // 선택 인덱스와 무관하게 이미 뽑힌 카드를 사용 (LLM에 이미 전송됨)
      setPhase('reveal')
    },
    []
  )

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* 상단 진행 표시기 */}
      <PhaseIndicator currentPhase={phase} />

      {/* 스프레드 정보 */}
      <YStack alignItems="center" paddingHorizontal="$4" paddingBottom="$2">
        <H3 color="$accentBackground" fontSize="$3">
          {spreadInfo.name}
        </H3>
      </YStack>

      {/* 페이즈별 컨텐츠 */}
      {phase === 'shuffle' && <ShufflePhase onShuffle={handleShuffleComplete} />}
      {phase === 'cut' && <CutPhase onComplete={handleCutComplete} />}
      {phase === 'draw' && (
        <DrawPhaseView
          cardCount={cardCount}
          drawnCards={drawnCards}
          onComplete={handleDrawComplete}
        />
      )}
      {phase === 'reveal' && (
        <RevealPhase
          spreadType={spreadType}
          drawnCards={drawnCards}
          readingId={readingId}
          isApiLoading={isApiLoading}
        />
      )}
    </YStack>
  )
}
