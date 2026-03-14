import { Spinner, Text, YStack } from 'tamagui'

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'large'
}

export function LoadingSpinner({ message, size = 'large' }: LoadingSpinnerProps) {
  return (
    <YStack
      alignItems='center'
      justifyContent='center'
      gap='$3'
      // @ts-ignore
      role='status'
      aria-live='polite'
      accessibilityLabel='로딩 중'
    >
      <Spinner size={size} color='$accentBackground' />
      {message && (
        <Text color='$colorSubtle' fontSize='$3'>
          {message}
        </Text>
      )}
    </YStack>
  )
}
