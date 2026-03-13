import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { themes as baseThemes, tokens } from '@tamagui/themes'
import { createTamagui, createFont } from 'tamagui'

// 에디토리얼 다크 테마 — 깊은 슬레이트에 크림 & 앰버 강조
const darkOverrides = {
  background: '#0e0d0b',        // 깊은 흑갈색
  backgroundHover: '#161410',
  backgroundPress: '#0a0908',
  backgroundFocus: '#161410',
  backgroundStrong: '#080706',
  backgroundTransparent: 'rgba(14, 13, 11, 0)',
  borderColor: '#2a2620',
  borderColorHover: '#3d3830',
  borderColorFocus: '#c9a96e',
  borderColorPress: '#1e1c17',
  color: '#f0ebe0',             // 따뜻한 크림
  colorHover: '#faf6ed',
  colorPress: '#d9d0be',
  colorFocus: '#b5aa96',
  colorTransparent: 'rgba(240, 235, 224, 0)',
  placeholderColor: '#6b6355',
  shadowColor: 'rgba(0, 0, 0, 0.6)',
  shadowColorHover: 'rgba(0, 0, 0, 0.7)',
  shadowColorPress: 'rgba(0, 0, 0, 0.8)',
  shadowColorFocus: 'rgba(0, 0, 0, 0.6)',
}

const themes = Object.fromEntries(
  Object.entries(baseThemes).map(([key, value]) => {
    if (key === 'dark') {
      return [key, { ...value, ...darkOverrides }]
    }
    if (key.startsWith('dark_')) {
      return [
        key,
        {
          ...value,
          background: darkOverrides.background,
          backgroundHover: darkOverrides.backgroundHover,
          backgroundPress: darkOverrides.backgroundPress,
          backgroundFocus: darkOverrides.backgroundFocus,
          borderColor: darkOverrides.borderColor,
          borderColorHover: darkOverrides.borderColorHover,
          borderColorFocus: darkOverrides.borderColorFocus,
          borderColorPress: darkOverrides.borderColorPress,
          shadowColor: darkOverrides.shadowColor,
          shadowColorHover: darkOverrides.shadowColorHover,
          shadowColorPress: darkOverrides.shadowColorPress,
          shadowColorFocus: darkOverrides.shadowColorFocus,
        },
      ]
    }
    return [key, value]
  })
) as typeof baseThemes

import { animations } from './animations'

// 에디토리얼 디스플레이 폰트: Cormorant Garamond
const headingFont = createFont({
  family: '"Cormorant Garamond", Georgia, serif',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 22,
    6: 28,
    7: 36,
    8: 48,
    9: 60,
    10: 72,
    true: 16,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 22,
    4: 26,
    5: 30,
    6: 36,
    7: 44,
    8: 58,
    9: 70,
    10: 84,
    true: 22,
  },
  weight: {
    1: '300',
    2: '300',
    3: '400',
    4: '400',
    5: '400',
    6: '500',
    7: '500',
    8: '600',
    9: '600',
    10: '600',
    true: '400',
  },
  letterSpacing: {
    1: 2,
    2: 1.5,
    3: 1,
    4: 0.5,
    5: 0,
    6: -0.5,
    7: -1,
    8: -1.5,
    9: -2,
    10: -3,
    true: 0,
  },
  face: {
    300: { normal: 'Cormorant Garamond', italic: 'Cormorant Garamond' },
    400: { normal: 'Cormorant Garamond', italic: 'Cormorant Garamond' },
    500: { normal: 'Cormorant Garamond', italic: 'Cormorant Garamond' },
    600: { normal: 'Cormorant Garamond', italic: 'Cormorant Garamond' },
  },
})

// 본문 폰트: DM Sans
const bodyFont = createFont({
  family: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  size: {
    1: 11,
    2: 12,
    3: 14,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 30,
    9: 38,
    10: 48,
    true: 14,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 24,
    5: 28,
    6: 30,
    7: 34,
    8: 42,
    9: 52,
    10: 64,
    true: 20,
  },
  weight: {
    1: '300',
    2: '300',
    3: '400',
    4: '400',
    5: '400',
    6: '500',
    7: '500',
    8: '500',
    9: '500',
    10: '500',
    true: '400',
  },
  letterSpacing: {
    1: 0.8,
    2: 0.5,
    3: 0.3,
    4: 0,
    5: 0,
    6: -0.2,
    7: -0.3,
    8: -0.5,
    9: -0.8,
    10: -1,
    true: 0,
  },
  face: {
    300: { normal: 'DM Sans', italic: 'DM Sans' },
    400: { normal: 'DM Sans', italic: 'DM Sans' },
    500: { normal: 'DM Sans', italic: 'DM Sans' },
  },
})

export const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})
