import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { themes as baseThemes, tokens } from '@tamagui/themes'
import { createTamagui, createFont } from 'tamagui'

// 모던 미니멀 라이트 테마 — Vercel 스타일, 로즈 액센트
const lightOverrides = {
  background: '#fafafa',
  backgroundHover: '#f5f5f5',
  backgroundPress: '#efefef',
  backgroundFocus: '#f5f5f5',
  backgroundStrong: '#ffffff',
  backgroundTransparent: 'rgba(250, 250, 250, 0)',
  borderColor: '#e5e5e5',
  borderColorHover: '#d4d4d4',
  borderColorFocus: '#e59c97',
  borderColorPress: '#d4d4d4',
  color: '#111111',
  colorHover: '#000000',
  colorPress: '#333333',
  colorFocus: '#666666',
  colorTransparent: 'rgba(17, 17, 17, 0)',
  placeholderColor: '#a3a3a3',
  shadowColor: 'rgba(0, 0, 0, 0.06)',
  shadowColorHover: 'rgba(0, 0, 0, 0.1)',
  shadowColorPress: 'rgba(0, 0, 0, 0.12)',
  shadowColorFocus: 'rgba(229, 156, 151, 0.2)',
}

const themes = Object.fromEntries(
  Object.entries(baseThemes).map(([key, value]) => {
    if (key === 'light') {
      return [key, { ...value, ...lightOverrides }]
    }
    if (key.startsWith('light_')) {
      return [
        key,
        {
          ...value,
          background: lightOverrides.background,
          backgroundHover: lightOverrides.backgroundHover,
          backgroundPress: lightOverrides.backgroundPress,
          backgroundFocus: lightOverrides.backgroundFocus,
          borderColor: lightOverrides.borderColor,
          borderColorHover: lightOverrides.borderColorHover,
          borderColorFocus: lightOverrides.borderColorFocus,
          borderColorPress: lightOverrides.borderColorPress,
          shadowColor: lightOverrides.shadowColor,
          shadowColorHover: lightOverrides.shadowColorHover,
          shadowColorPress: lightOverrides.shadowColorPress,
          shadowColorFocus: lightOverrides.shadowColorFocus,
        },
      ]
    }
    return [key, value]
  })
) as typeof baseThemes

import { animations } from './animations'

// 디스플레이/헤딩 폰트: Inter (모던 산세리프)
const headingFont = createFont({
  family: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
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
    1: 18,
    2: 20,
    3: 24,
    4: 28,
    5: 32,
    6: 38,
    7: 46,
    8: 60,
    9: 72,
    10: 86,
    true: 24,
  },
  weight: {
    1: '400',
    2: '400',
    3: '500',
    4: '500',
    5: '500',
    6: '600',
    7: '600',
    8: '700',
    9: '700',
    10: '700',
    true: '500',
  },
  letterSpacing: {
    1: 0.2,
    2: 0.1,
    3: 0,
    4: -0.2,
    5: -0.3,
    6: -0.5,
    7: -0.8,
    8: -1.2,
    9: -1.5,
    10: -2,
    true: -0.2,
  },
  face: {
    400: { normal: 'Inter', italic: 'Inter' },
    500: { normal: 'Inter', italic: 'Inter' },
    600: { normal: 'Inter', italic: 'Inter' },
    700: { normal: 'Inter', italic: 'Inter' },
  },
})

// 본문 폰트: Inter
const bodyFont = createFont({
  family: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
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
    1: '400',
    2: '400',
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
    1: 0.2,
    2: 0.1,
    3: 0,
    4: -0.1,
    5: -0.2,
    6: -0.3,
    7: -0.4,
    8: -0.6,
    9: -0.8,
    10: -1,
    true: 0,
  },
  face: {
    400: { normal: 'Inter', italic: 'Inter' },
    500: { normal: 'Inter', italic: 'Inter' },
    600: { normal: 'Inter', italic: 'Inter' },
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
