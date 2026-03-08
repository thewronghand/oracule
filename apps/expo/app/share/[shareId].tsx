import { ShareScreen } from 'app/features/share/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '타로 결과 공유',
        }}
      />
      <ShareScreen />
    </>
  )
}
