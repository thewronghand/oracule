import { ColorScheme, NextThemeProvider, useRootTheme } from '@tamagui/next-theme'

export const TamaguiThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode => {
  const [_, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      defaultTheme='light'
      forcedTheme='light'
      onChangeTheme={(next) => {
        setTheme(next as ColorScheme)
      }}
    >
      {children}
    </NextThemeProvider>
  )
}

export { useRootTheme } from '@tamagui/next-theme'
