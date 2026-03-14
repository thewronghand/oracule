import { Button, styled } from 'tamagui'
import { ROSE } from 'app/utils/colors'

export const OraculeButton = styled(Button, {
  name: 'OraculeButton',
  borderRadius: 8,
  fontWeight: '500',
  fontFamily: '$body',
  letterSpacing: 0.3,
  pressStyle: {
    opacity: 0.75,
    scale: 0.98,
  },
  focusStyle: {
    outlineColor: ROSE,
    outlineWidth: 2,
    outlineOffset: 2,
    outlineStyle: 'solid',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$color',
        color: '$background',
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
