import { createAnimations } from '@tamagui/animations-react-native'
import type { AnimationDriver } from '@tamagui/web'

export const animations: AnimationDriver = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  cardFlip: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 180,
  },
  cardReveal: {
    type: 'spring',
    damping: 12,
    mass: 0.8,
    stiffness: 120,
  },
  fadeIn: {
    type: 'spring',
    damping: 20,
    mass: 1,
    stiffness: 80,
  },
})
