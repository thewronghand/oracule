import { useCallback, useEffect, useRef, useState } from 'react'
import { H2, H3, Paragraph, ScrollView, Text, XStack, YStack, styled } from '@t4/ui'
import { OraculeButton } from '@t4/ui/src/Button'
import { LoadingSpinner } from '@t4/ui/src/LoadingSpinner'
import { SpreadLayout } from '@t4/ui/src/tarot/SpreadLayout'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import type { DrawnTarotCard } from 'app/types/card'
import { SPREAD_INFO, type SpreadType, spreadOptions } from 'app/types/spread'
import { drawRandomCards } from 'app/utils/drawRandomCards'
import { getCardImageUrl } from 'app/utils/cardImage'
import { trpc } from 'app/utils/trpc'

function preloadCardImages(cards: DrawnTarotCard[]) {
  if (typeof window === 'undefined') return
  for (const card of cards) {
    const img = new window.Image()
    img.src = getCardImageUrl(card.id)
  }
}

const { useParam } = createParam<{ spreadType: string; question: string; character: string }>()

type DrawPhase = 'shuffle' | 'cut' | 'draw' | 'reveal'

// 카드 뒷면 미니 컴포넌트 (재사용)
function CardBack({
  width = 120,
  height = 180,
  opacity = 1,
  glowColor,
  children,
}: {
  width?: number
  height?: number
  opacity?: number
  borderColor?: string
  glowColor?: string
  children?: React.ReactNode
}) {
  return (
    <YStack
      width={width}
      height={height}
      borderRadius={12}
      borderWidth={1.5}
      borderColor='rgba(229,156,151,0.4)'
      backgroundColor='#0a0a0a'
      alignItems='center'
      justifyContent='center'
      opacity={opacity}
      shadowColor={glowColor ?? 'rgba(0,0,0,0.4)'}
      shadowOpacity={glowColor ? 0.6 : 0.35}
      shadowRadius={glowColor ? 10 : 5}
      shadowOffset={{ width: 0, height: 3 }}
    >
      {/* 안쪽 테두리 */}
      <YStack
        position='absolute'
        top={6}
        left={6}
        right={6}
        bottom={6}
        borderRadius={8}
        borderWidth={1}
        borderColor='rgba(255,255,255,0.06)'
      />
      {/* 중앙 로즈 다이아몬드 */}
      <YStack
        width={18}
        height={18}
        borderWidth={1}
        borderColor='rgba(229,156,151,0.5)'
        rotate='45deg'
        borderRadius={2}
      />
      {children}
    </YStack>
  )
}

// 셔플 페이즈
function ShufflePhase({ onShuffle }: { onShuffle: () => void }) {
  const [isShuffling, setIsShuffling] = useState(false)

  const handleShuffle = useCallback(() => {
    setIsShuffling(true)
    setTimeout(() => {
      onShuffle()
    }, 1200)
  }, [onShuffle])

  return (
    <YStack
      flex={1}
      alignItems='center'
      justifyContent='center'
      gap='$6'
      padding='$4'
      // @ts-ignore
      style={{ animation: 'phaseEnter 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <YStack alignItems='center' gap='$2'>
        <Text fontFamily='$heading' fontSize={34} fontWeight='300' letterSpacing={-0.5} color='$color' lineHeight={40} textAlign='center'>
          카드를 셔플합니다
        </Text>
        <Text fontFamily='$body' fontSize={14} color='$colorFocus' opacity={0.55} textAlign='center'>
          카드를 섞어 운명의 배열을 만듭니다
        </Text>
      </YStack>

      {/* 카드 더미 */}
      <YStack
        alignItems='center'
        justifyContent='center'
        height={260}
        width={180}
        position='relative'
      >
        {[4, 3, 2, 1, 0].map((i) => (
          <YStack
            key={i}
            position='absolute'
            y={-i * 5}
            rotate={`${(i - 2) * 0.5}deg`}
            // @ts-ignore
            style={isShuffling ? {
              animation: `cardShuffle 0.4s cubic-bezier(0.25,1,0.5,1) ${i * 40}ms both`,
            } : {
              transition: 'transform 0.3s cubic-bezier(0.25,1,0.5,1)',
            }}
          >
            <CardBack width={120} height={180} opacity={1 - i * 0.05} />
          </YStack>
        ))}
      </YStack>

      <OraculeButton
        variant='primary'
        customSize='lg'
        onPress={handleShuffle}
        disabled={isShuffling}
        opacity={isShuffling ? 0.6 : 1}
      >
        {isShuffling ? '셔플 중...' : '셔플하기'}
      </OraculeButton>
    </YStack>
  )
}

// 컷 페이즈 - 3개 더미 순서대로 선택
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
    <YStack
      flex={1}
      alignItems='center'
      justifyContent='center'
      gap='$6'
      padding='$4'
      // @ts-ignore
      style={{ animation: 'phaseEnter 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <YStack alignItems='center' gap='$2'>
        <Text fontFamily='$heading' fontSize={34} fontWeight='300' letterSpacing={-0.5} color='$color' lineHeight={40} textAlign='center'>
          카드를 컷합니다
        </Text>
        <Text fontFamily='$body' fontSize={14} color='$colorFocus' opacity={0.55} textAlign='center'>
          세 더미를 순서대로 터치하세요
        </Text>
        <Text fontSize='$4' fontWeight='700' color='#e59c97'>
          {tappedStacks.length} / 3
        </Text>
      </YStack>

      <XStack gap='$5' justifyContent='center' alignItems='flex-end'>
        {[0, 1, 2].map((stackIndex) => {
          const isTapped = tappedStacks.includes(stackIndex)
          const tapOrder = tappedStacks.indexOf(stackIndex)
          // 가운데 더미를 살짝 높게
          const heightBonus = stackIndex === 1 ? 20 : 0
          return (
            <YStack
              key={stackIndex}
              scale={isTapped ? 0.92 : 1}
              y={isTapped ? 4 : 0}
              onPress={() => handleTapStack(stackIndex)}
              cursor={!isTapped ? 'pointer' : 'default'}
              // @ts-ignore
              style={{ transition: 'transform 0.2s cubic-bezier(0.25,1,0.5,1)', animation: `cardAppear 0.35s cubic-bezier(0.22,1,0.36,1) ${stackIndex * 80}ms both` }}
            >
              {/* 카드 여러 장 쌓인 효과 */}
              <YStack
                position='relative'
                width={100}
                height={150 + heightBonus}
                alignItems='center'
              >
                {[2, 1, 0].map((layer) => (
                  <YStack key={layer} position='absolute' top={layer * 3} left={layer * 2}>
                    <CardBack
                      width={96}
                      height={144 + heightBonus}
                      opacity={1 - layer * 0.08}
                      borderColor={isTapped ? '#111111' : 'rgba(229,156,151,0.4)'}
                    >
                      {layer === 0 && isTapped && (
                        <Text fontFamily='$heading' fontSize={28} fontWeight='300' color='rgba(255,255,255,0.7)'>
                          {tapOrder + 1}
                        </Text>
                      )}
                    </CardBack>
                  </YStack>
                ))}
              </YStack>
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
  onComplete,
}: {
  cardCount: number
  drawnCards: DrawnTarotCard[]
  onComplete: (selectedIndices: number[]) => void
}) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
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
    <YStack
      flex={1}
      gap='$4'
      padding='$4'
      // @ts-ignore
      style={{ animation: 'phaseEnter 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <YStack alignItems='center' gap='$2'>
        <Text fontFamily='$heading' fontSize={34} fontWeight='300' letterSpacing={-0.5} color='$color' lineHeight={40} textAlign='center'>
          카드를 선택하세요
        </Text>
        <Text fontFamily='$body' fontSize={14} color='$colorFocus' opacity={0.55} textAlign='center'>
          마음이 이끄는 카드를 {cardCount}장 골라주세요
        </Text>
        <Text
          fontSize='$5'
          fontWeight='700'
          color={selectedIndices.length === cardCount ? '#111111' : '#e59c97'}
        >
          {selectedIndices.length} / {cardCount} 장 선택됨
        </Text>
      </YStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <XStack flexWrap='wrap' justifyContent='center' gap='$3' paddingBottom='$6'>
          {Array.from({ length: displayCount }).map((_, index) => {
            const isSelected = selectedIndices.includes(index)
            const selectOrder = selectedIndices.indexOf(index)
            return (
              <YStack
                key={index}
                scale={isSelected ? 1.08 : 1}
                y={isSelected ? -10 : 0}
                onPress={() => handleSelectCard(index)}
                cursor='pointer'
                // @ts-ignore
                style={{
                  transition: 'transform 0.2s cubic-bezier(0.25,1,0.5,1)',
                  animation: `cardAppear 0.35s cubic-bezier(0.22,1,0.36,1) ${(index % 7) * 30}ms both`,
                }}
              >
                <CardBack
                  width={80}
                  height={120}
                  borderColor={isSelected ? '#e59c97' : 'rgba(229,156,151,0.25)'}
                  glowColor={isSelected ? '$green8' : undefined}
                >
                  {isSelected && (
                    <Text fontSize='$5' fontWeight='700' color='$green8'>
                      {selectOrder + 1}
                    </Text>
                  )}
                </CardBack>
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
    <YStack
      flex={1}
      gap='$4'
      padding='$4'
      // @ts-ignore
      style={{ animation: 'phaseEnter 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <YStack alignItems='center' gap='$2'>
        <Text fontFamily='$heading' fontSize={34} fontWeight='300' letterSpacing={-0.5} color='$color' lineHeight={40} textAlign='center'>
          카드가 공개됩니다
        </Text>
        <Text fontFamily='$body' fontSize={14} color='$colorFocus' opacity={0.55} textAlign='center'>
          {allRevealed
            ? '모든 카드가 공개되었습니다'
            : `${revealedIndices.length} / ${drawnCards.length} 카드 공개 중...`}
        </Text>
      </YStack>

      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <SpreadLayout
          spreadType={spreadType}
          cards={drawnCards}
          revealedIndices={revealedIndices}
        />
      </ScrollView>

      {allRevealed && (
        <YStack
          alignItems='center'
          gap='$3'
          paddingBottom='$4'
          // @ts-ignore
          style={{ animation: 'phaseEnter 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          {isApiLoading ? (
            <YStack gap='$3' alignItems='center'>
              <LoadingSpinner message='해석을 준비하고 있습니다...' />
              <Paragraph fontSize='$2' color='$color3' textAlign='center'>
                카드의 의미를 깊이 분석하고 있어요
              </Paragraph>
            </YStack>
          ) : readingId ? (
            <OraculeButton variant='primary' customSize='lg' onPress={handleViewResult}>
              결과 보기
            </OraculeButton>
          ) : (
            <YStack gap='$2' alignItems='center'>
              <Paragraph color='$red10' textAlign='center'>
                해석 생성에 실패했습니다
              </Paragraph>
              <OraculeButton variant='secondary' customSize='md' onPress={handleViewResult}>
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
    <XStack justifyContent='center' alignItems='center' paddingVertical='$4' paddingHorizontal='$2'>
      {phases.map((p, index) => {
        const isActive = index === currentIndex
        const isDone = index < currentIndex
        return (
          <XStack key={p.key} alignItems='center'>
            {/* 단계 원 + 라벨 */}
            <YStack alignItems='center' gap='$1'>
              <YStack
                width={32}
                height={32}
                borderRadius={16}
                backgroundColor={
                  isDone ? '#111111' : isActive ? '#111111' : 'transparent'
                }
                alignItems='center'
                justifyContent='center'
                borderWidth={isActive || isDone ? 0 : 1}
                borderColor='rgba(0,0,0,0.15)'
                shadowColor={undefined}
                shadowOpacity={0}
                shadowRadius={0}
              >
                <Text
                  fontSize='$2'
                  fontWeight='700'
                  color={isDone || isActive ? 'white' : '$color4'}
                >
                  {isDone ? '✓' : index + 1}
                </Text>
              </YStack>
              <Text
                fontSize='$1'
                fontWeight={isActive ? '700' : '400'}
                color={isActive ? '$color' : isDone ? '$green10' : '$color4'}
              >
                {p.label}
              </Text>
            </YStack>

            {/* 구분선 */}
            {index < phases.length - 1 && (
              <YStack
                width={40}
                height={2}
                marginHorizontal='$1'
                marginBottom='$4'
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
  const [characterParam] = useParam('character')

  const spreadType = (spreadTypeParam ?? 'SINGLE') as SpreadType
  const question = questionParam ? decodeURIComponent(questionParam) : ''
  const characterId = characterParam ?? 'default'

  const spreadInfo = SPREAD_INFO[spreadType]
  const cardCount = spreadOptions.find((s) => s.value === spreadType)?.cardCount ?? 1

  const [phase, setPhase] = useState<DrawPhase>('shuffle')
  const [drawnCards, setDrawnCards] = useState<DrawnTarotCard[]>([])
  const [readingId, setReadingId] = useState<string | null>(null)
  const [isApiLoading, setIsApiLoading] = useState(false)

  const createReading = trpc.reading.create.useMutation()

  const apiCalledRef = useRef(false)
  useEffect(() => {
    if (apiCalledRef.current) return
    // 파라미터가 아직 준비되지 않았으면 대기 (Next.js router.isReady 전)
    if (!questionParam) return
    apiCalledRef.current = true

    const cards = drawRandomCards(cardCount)
    setDrawnCards(cards)
    preloadCardImages(cards)
    setIsApiLoading(true)

    createReading
      .mutateAsync({
        question,
        cards,
        spreadType,
        characterId,
      })
      .then((result) => {
        setReadingId(result.id)
        setIsApiLoading(false)
      })
      .catch((error) => {
        console.error('리딩 생성 실패:', error)
        setIsApiLoading(false)
      })
  }, [questionParam]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShuffleComplete = useCallback(() => {
    setPhase('cut')
  }, [])

  const handleCutComplete = useCallback(() => {
    setPhase('draw')
  }, [])

  const handleDrawComplete = useCallback((_selectedIndices: number[]) => {
    setPhase('reveal')
  }, [])

  return (
    <YStack flex={1} backgroundColor='$background'>
      <PhaseIndicator currentPhase={phase} />

      <YStack alignItems='center' paddingHorizontal='$4' paddingBottom='$2'>
        <H3 color='$colorFocus' fontSize='$3' opacity={0.6}>
          {spreadInfo.name}
        </H3>
      </YStack>

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
