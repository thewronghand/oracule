import { QueryScreen } from 'app/features/query/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '타로 질문',
        }}
      />
      <QueryScreen />
    </>
  )
}
