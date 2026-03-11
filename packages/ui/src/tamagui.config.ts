import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { themes as baseThemes, tokens } from '@tamagui/themes'
import { createTamagui } from 'tamagui'

// 보라빛 신비로운 다크 테마 커스터마이징
const darkOverrides = {
  background: '#1e1a2e',
  backgroundHover: '#262137',
  backgroundPress: '#1a1625',
  backgroundFocus: '#262137',
  backgroundStrong: '#181425',
  backgroundTransparent: 'rgba(26, 22, 37, 0)',
  borderColor: '#2d2640',
  borderColorHover: '#3d3555',
  borderColorFocus: '#4a3f6b',
  borderColorPress: '#231e33',
  color: '#ede9f6',
  colorHover: '#f5f0ff',
  colorPress: '#d4cce6',
  colorFocus: '#b8b0cc',
  colorTransparent: 'rgba(237, 233, 246, 0)',
  placeholderColor: '#7a7190',
  shadowColor: 'rgba(20, 15, 30, 0.5)',
  shadowColorHover: 'rgba(20, 15, 30, 0.6)',
  shadowColorPress: 'rgba(20, 15, 30, 0.7)',
  shadowColorFocus: 'rgba(20, 15, 30, 0.5)',
}

const themes = Object.fromEntries(
  Object.entries(baseThemes).map(([key, value]) => {
    if (key === 'dark') {
      return [key, { ...value, ...darkOverrides }]
    }
    if (key.startsWith('dark_')) {
      return [key, {
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
      }]
    }
    return [key, value]
  })
) as typeof baseThemes

import { animations } from './animations'

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
)

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
