import { createAnimations } from '@tamagui/animations-react-native'

export const animations = createAnimations({
  // 빠른 피드백 (버튼 hover/press)
  quick: {
    type: 'timing',
    duration: 80,
  },
  // 일반 상태 전환
  medium: {
    type: 'spring',
    damping: 20,
    stiffness: 200,
    mass: 0.8,
  },
  // 느린 등장 애니메이션
  slow: {
    type: 'spring',
    damping: 22,
    stiffness: 150,
    mass: 1,
  },
  // 카드 플립
  cardFlip: {
    type: 'spring',
    damping: 20,
    stiffness: 120,
    mass: 1,
  },
  // 카드 등장
  cardReveal: {
    type: 'spring',
    damping: 22,
    stiffness: 140,
    mass: 0.9,
  },
  // 페이드 인
  fadeIn: {
    type: 'timing',
    duration: 250,
  },
  // 스프링감 (pressStyle 등)
  bouncy: {
    type: 'spring',
    damping: 10,
    stiffness: 140,
    mass: 0.8,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
})
