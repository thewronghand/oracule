import { Spinner, Text, YStack } from 'tamagui'

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'large'
}

export function LoadingSpinner({ message, size = 'large' }: LoadingSpinnerProps) {
  return (
    <YStack alignItems='center' justifyContent='center' gap='$3'>
      <Spinner size={size} color='$accentBackground' />
      {message && (
        <Text color='$colorSubtle' fontSize='$3'>
          {message}
        </Text>
      )}
    </YStack>
  )
}
