import { createAnimations } from '@tamagui/animations-css'
import type { AnimationDriver } from '@tamagui/web'

export const animations: AnimationDriver = createAnimations({
  // 빠른 피드백 (버튼 hover/press)
  quick: 'ease-out 80ms',
  // 일반 상태 전환
  medium: 'cubic-bezier(0.25, 1, 0.5, 1) 200ms',
  // 느린 등장 애니메이션
  slow: 'cubic-bezier(0.22, 1, 0.36, 1) 350ms',
  // 카드 플립 (TarotCard에서 CSS로 직접 처리하지만 fallback용)
  cardFlip: 'cubic-bezier(0.25, 1, 0.5, 1) 500ms',
  // 카드 등장
  cardReveal: 'cubic-bezier(0.22, 1, 0.36, 1) 400ms',
  // 페이드 인
  fadeIn: 'ease-out 250ms',
  // 스프링감 (Tamagui 내장 pressStyle 등)
  bouncy: 'cubic-bezier(0.34, 1.2, 0.64, 1) 300ms',
  lazy: 'cubic-bezier(0.25, 1, 0.5, 1) 400ms',
})
