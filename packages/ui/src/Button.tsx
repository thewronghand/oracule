import { type TamaguiComponent, Button, styled } from 'tamagui'

export const OraculeButton: TamaguiComponent = styled(Button, {
  name: 'OraculeButton',
  borderRadius: '$4',
  fontWeight: '600',
  pressStyle: {
    opacity: 0.8,
    scale: 0.97,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$accentBackground',
        color: '$accentColor',
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
        color: '$color',
        borderWidth: 0,
      },
    },
    size: {
      sm: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        fontSize: '$3',
      },
      md: {
        paddingHorizontal: '$4',
        paddingVertical: '$3',
        fontSize: '$4',
      },
      lg: {
        paddingHorizontal: '$6',
        paddingVertical: '$4',
        fontSize: '$5',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
