import { DrawScreen } from 'app/features/draw/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '카드 뽑기',
        }}
      />
      <DrawScreen />
    </>
  )
}
