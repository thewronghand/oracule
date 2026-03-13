import type { DrawnTarotCard } from 'app/types/card'
import { getCardImageUrl } from 'app/utils/cardImage'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Image, YStack } from 'tamagui'

interface TarotCardProps {
  card: DrawnTarotCard
  isRevealed?: boolean
  size?: 'sm' | 'md' | 'lg'
  onPress?: () => void
  rotate?: string
}

const SIZE_MAP = {
  sm: { width: 80, height: 120 },
  md: { width: 120, height: 180 },
  lg: { width: 160, height: 240 },
} as const

// 웹 전용 3D 플립 컨테이너
function WebFlipCard({
  card,
  isRevealed,
  size,
  onPress,
  rotate,
}: Omit<TarotCardProps, 'size'> & { size: 'sm' | 'md' | 'lg' }) {
  const [flipped, setFlipped] = useState(isRevealed)
  const prevRevealed = useRef(isRevealed)

  useEffect(() => {
    if (prevRevealed.current !== isRevealed) {
      prevRevealed.current = isRevealed
      setFlipped(isRevealed)
    }
  }, [isRevealed])

  const { width, height } = SIZE_MAP[size]
  const isReversed = card.direction === '역방향'

  const cardStyle: React.CSSProperties = {
    width,
    height,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    cursor: onPress ? 'pointer' : 'default',
  }

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: 12,
    overflow: 'hidden',
  }

  const frontStyle: React.CSSProperties = {
    ...faceStyle,
    transform: 'rotateY(180deg)',
  }

  return (
    <div
      style={{
        perspective: '1000px',
        display: 'inline-block',
        transform: rotate ? `rotate(${rotate})` : undefined,
      }}
      onClick={onPress}
    >
      <div style={cardStyle}>
        {/* 뒷면 */}
        <div
          style={{
            ...faceStyle,
            background: '#0a0a0a',
            border: '1.5px solid rgba(229,156,151,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 외부 장식 테두리 */}
          <div
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              right: 6,
              bottom: 6,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
              pointerEvents: 'none',
            }}
          />
          {/* 별 패턴 (SVG) */}
          <svg
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            width={width}
            height={height}
          >
            <defs>
              <pattern id='stars' patternUnits='userSpaceOnUse' width='20' height='20'>
                <circle cx='10' cy='10' r='0.7' fill='rgba(255,255,255,0.25)' />
                <circle cx='3' cy='3' r='0.4' fill='rgba(255,255,255,0.15)' />
                <circle cx='17' cy='5' r='0.5' fill='rgba(255,255,255,0.18)' />
                <circle cx='6' cy='16' r='0.4' fill='rgba(255,255,255,0.12)' />
                <circle cx='15' cy='15' r='0.6' fill='rgba(255,255,255,0.2)' />
              </pattern>
            </defs>
            <rect width={width} height={height} fill='url(#stars)' />
          </svg>
          {/* 중앙 로즈 다이아몬드 */}
          <div
            style={{
              width: 20,
              height: 20,
              border: '1px solid rgba(229,156,151,0.5)',
              transform: 'rotate(45deg)',
              borderRadius: 2,
            }}
          />
          {/* 코너 장식 */}
          {['topleft', 'topright', 'bottomleft', 'bottomright'].map((pos) => (
            <div
              key={pos}
              style={{
                position: 'absolute',
                top: pos.startsWith('top') ? 14 : undefined,
                bottom: pos.startsWith('bottom') ? 14 : undefined,
                left: pos.endsWith('left') ? 14 : undefined,
                right: pos.endsWith('right') ? 14 : undefined,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(229,156,151,0.4)',
              }}
            />
          ))}
        </div>

        {/* 앞면: 카드 이미지 */}
        <div
          style={{
            ...frontStyle,
            background: '#f0f0f0',
            border: isReversed ? '2px solid #e05252' : '1.5px solid rgba(229,156,151,0.5)',
          }}
        >
          <img
            src={getCardImageUrl(card.id)}
            alt={card.name.ko}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isReversed ? 'rotate(180deg)' : undefined,
            }}
            loading='eager'
          />
          {/* 역방향 표시 배너 */}
          {isReversed && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(224,82,82,0.85)',
                padding: '2px 0',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>▼ 역방향</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 네이티브(모바일) 카드 컴포넌트 — 단순 전환
function NativeCard({
  card,
  isRevealed,
  size,
  onPress,
  rotate,
}: Omit<TarotCardProps, 'size'> & { size: 'sm' | 'md' | 'lg' }) {
  const { width, height } = SIZE_MAP[size]
  const isReversed = card.direction === '역방향'

  const pressProps = onPress
    ? {
        onPress,
        pressStyle: { opacity: 0.85, scale: 0.97 },
        cursor: 'pointer' as const,
      }
    : {}

  const rotateStyle = rotate ? { rotate } : {}

  if (!isRevealed) {
    return (
      <YStack
        width={width}
        height={height}
        borderRadius={12}
        borderWidth={1.5}
        borderColor='$yellow8'
        backgroundColor='$purple10'
        alignItems='center'
        justifyContent='center'
        shadowColor='$shadowColor'
        shadowOpacity={0.4}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 4 }}
        {...rotateStyle}
        {...pressProps}
      >
        <YStack
          position='absolute'
          top={6}
          left={6}
          right={6}
          bottom={6}
          borderRadius={8}
          borderWidth={1}
          borderColor='$yellow6'
          opacity={0.5}
        />
        <YStack
          position='absolute'
          top={11}
          left={11}
          right={11}
          bottom={11}
          borderRadius={5}
          borderWidth={0.5}
          borderColor='$yellow5'
          opacity={0.3}
        />
      </YStack>
    )
  }

  return (
    <YStack
      width={width}
      height={height}
      borderRadius={12}
      borderWidth={isReversed ? 2 : 1.5}
      borderColor={isReversed ? '$red8' : '$yellow8'}
      overflow='hidden'
      shadowColor='$shadowColor'
      shadowOpacity={0.3}
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 4 }}
      {...rotateStyle}
      {...pressProps}
    >
      <Image
        source={{ uri: getCardImageUrl(card.id), width, height }}
        width={width}
        height={height}
        resizeMode='cover'
        style={isReversed ? { transform: [{ rotate: '180deg' }] } : undefined}
      />
      {/* 역방향 표시 배너 */}
      {isReversed && (
        <YStack
          position='absolute'
          bottom={0}
          left={0}
          right={0}
          backgroundColor='rgba(224,82,82,0.85)'
          paddingVertical={2}
          alignItems='center'
        />
      )}
    </YStack>
  )
}

export function TarotCard({
  card,
  isRevealed = false,
  size = 'md',
  onPress,
  rotate,
}: TarotCardProps) {
  if (Platform.OS === 'web') {
    return (
      <WebFlipCard
        card={card}
        isRevealed={isRevealed}
        size={size}
        onPress={onPress}
        rotate={rotate}
      />
    )
  }
  return (
    <NativeCard card={card} isRevealed={isRevealed} size={size} onPress={onPress} rotate={rotate} />
  )
}
