import { Button, styled } from 'tamagui'

export const OraculeButton = styled(Button, {
  name: 'OraculeButton',
  borderRadius: 0,           // 에디토리얼: 둥근 모서리 없이 날카롭게
  fontWeight: '500',
  fontFamily: '$body',
  letterSpacing: 1.5,
  pressStyle: {
    opacity: 0.75,
    scale: 0.98,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$color',      // 크림 배경
        color: '$background',           // 다크 텍스트 — 반전
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '$color',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$colorFocus',
        borderWidth: 0,
        letterSpacing: 1,
      },
    },
    customSize: {
      sm: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        fontSize: '$2',
      },
      md: {
        paddingHorizontal: '$5',
        paddingVertical: '$3',
        fontSize: '$2',
      },
      lg: {
        paddingHorizontal: '$7',
        paddingVertical: '$4',
        fontSize: '$3',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    customSize: 'md',
  },
})
