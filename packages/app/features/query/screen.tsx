import { useState } from 'react'
import { Paragraph, ScrollView, XStack, YStack, Text } from 'tamagui'
import { OraculeButton, OraculeTextArea, SpreadSelector } from '@t4/ui'
import type { SpreadType } from 'app/types/spread'
import { CHARACTERS, type CharacterId } from 'app/types/character'
import { useRouter } from 'solito/router'

const EXAMPLE_QUESTIONS = [
  '지금 내 커리어 방향은 올바른가요?',
  '이 관계에서 내가 놓치고 있는 것은?',
  '앞으로 한 달간 집중해야 할 것은?',
]

export function QueryScreen() {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('SINGLE')
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>('default')
  const [question, setQuestion] = useState('')
  const router = useRouter()

  const handleDraw = () => {
    router.push(
      `/draw?spreadType=${selectedSpread}&question=${encodeURIComponent(question)}&character=${selectedCharacter}`
    )
  }

  return (
    <ScrollView backgroundColor='$background'>
      <YStack
        maxWidth={640}
        width='100%'
        alignSelf='center'
        paddingHorizontal={24}
        paddingTop={40}
        paddingBottom={80}
        gap='$0'
        $gtSm={{ paddingHorizontal: 48, paddingTop: 56 }}
      >
        {/* 페이지 헤더 */}
        <YStack
          marginBottom='$8'
          // @ts-ignore
          style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={3}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
            marginBottom='$3'
          >
            New Reading
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={34}
            fontWeight='300'
            letterSpacing={-0.5}
            color='$color'
            lineHeight={40}
          >
            타로 리딩
          </Text>
        </YStack>

        {/* 캐릭터 선택 */}
        <YStack
          marginBottom='$8'
          // @ts-ignore
          style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.08s both' }}
        >
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={2}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
            marginBottom='$4'
          >
            해석자 선택
          </Text>
          <YStack gap='$2'>
            {CHARACTERS.map((character) => {
              const isSelected = selectedCharacter === character.id
              return (
                <XStack
                  key={character.id}
                  alignItems='center'
                  gap='$4'
                  paddingVertical='$4'
                  paddingHorizontal='$4'
                  borderWidth={1}
                  borderColor={isSelected ? 'rgba(229,156,151,0.4)' : 'rgba(0,0,0,0.07)'}
                  backgroundColor={isSelected ? 'rgba(229,156,151,0.05)' : 'transparent'}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setSelectedCharacter(character.id)}
                  cursor='pointer'
                  accessibilityRole='radio'
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={`${character.name}: ${character.description}`}
                  // @ts-ignore
                  style={{ transition: 'all 0.15s ease' }}
                >
                  {/* 라디오 인디케이터 */}
                  <YStack
                    width={16}
                    height={16}
                    borderRadius={8}
                    borderWidth={1}
                    borderColor={isSelected ? '#e59c97' : 'rgba(0,0,0,0.15)'}
                    alignItems='center'
                    justifyContent='center'
                    flexShrink={0}
                  >
                    {isSelected && (
                      <YStack width={8} height={8} borderRadius={4} backgroundColor='#e59c97' />
                    )}
                  </YStack>

                  <YStack flex={1}>
                    <Text
                      fontFamily='$body'
                      fontSize={14}
                      fontWeight={isSelected ? '500' : '400'}
                      color={isSelected ? '$color' : '$colorFocus'}
                      letterSpacing={0.2}
                    >
                      {character.name}
                    </Text>
                    <Text
                      fontFamily='$body'
                      fontSize={12}
                      color='$colorFocus'
                      opacity={0.6}
                      marginTop={2}
                    >
                      {character.description}
                    </Text>
                  </YStack>

                  <Text fontSize={20} opacity={isSelected ? 1 : 0.4}>
                    {character.emoji}
                  </Text>
                </XStack>
              )
            })}
          </YStack>
        </YStack>

        {/* 스프레드 선택 */}
        <YStack
          marginBottom='$8'
          // @ts-ignore
          style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.16s both' }}
        >
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={2}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
            marginBottom='$4'
          >
            스프레드 선택
          </Text>
          <SpreadSelector selectedSpread={selectedSpread} onSelect={setSelectedSpread} />
        </YStack>

        {/* 질문 입력 */}
        <YStack
          marginBottom='$8'
          // @ts-ignore
          style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.24s both' }}
        >
          <Text
            fontFamily='$body'
            fontSize={11}
            fontWeight='500'
            letterSpacing={2}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
            marginBottom='$4'
          >
            질문 입력
          </Text>

          {/* 예시 질문 */}
          <YStack gap='$2' marginBottom='$4'>
            {EXAMPLE_QUESTIONS.map((q) => {
              const isSelected = question === q
              return (
                <XStack
                  key={q}
                  alignItems='center'
                  gap='$3'
                  paddingVertical='$3'
                  paddingHorizontal='$4'
                  borderWidth={1}
                  borderColor={isSelected ? 'rgba(229,156,151,0.4)' : 'rgba(0,0,0,0.07)'}
                  backgroundColor={isSelected ? 'rgba(229,156,151,0.05)' : 'transparent'}
                  pressStyle={{ opacity: 0.6 }}
                  onPress={() => setQuestion(q)}
                  cursor='pointer'
                  accessibilityRole='radio'
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={q}
                  // @ts-ignore
                  style={{ transition: 'all 0.15s ease' }}
                >
                  <YStack
                    width={16}
                    height={16}
                    borderRadius={8}
                    borderWidth={1}
                    borderColor={isSelected ? '#e59c97' : 'rgba(0,0,0,0.15)'}
                    alignItems='center'
                    justifyContent='center'
                    flexShrink={0}
                  >
                    {isSelected && (
                      <YStack width={8} height={8} borderRadius={4} backgroundColor='#e59c97' />
                    )}
                  </YStack>
                  <Text
                    flex={1}
                    fontFamily='$body'
                    fontSize={13}
                    color={isSelected ? '$color' : '$colorFocus'}
                    opacity={isSelected ? 1 : 0.7}
                    lineHeight={20}
                  >
                    {q}
                  </Text>
                </XStack>
              )
            })}
          </YStack>

          {/* 직접 입력 */}
          <OraculeTextArea
            placeholder='또는 직접 질문을 입력해주세요...'
            value={question}
            onChangeText={setQuestion}
            // @ts-ignore
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              borderRadius: 8,
              borderColor: question ? 'rgba(229,156,151,0.6)' : undefined,
            }}
          />
        </YStack>

        {/* CTA */}
        <YStack
          // @ts-ignore
          style={{ animation: 'phaseEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s both' }}
        >
          <XStack justifyContent='flex-end'>
            <OraculeButton
              variant='primary'
              customSize='lg'
              onPress={handleDraw}
              disabled={question.trim() === ''}
              opacity={question.trim() === '' ? 0.35 : 1}
              minWidth={160}
              cursor={question.trim() === '' ? 'not-allowed' : 'pointer'}
            >
              카드 뽑기
            </OraculeButton>
          </XStack>
          {question.trim() === '' && (
            <Text
              fontFamily='$body'
              fontSize={12}
              color='$colorFocus'
              opacity={0.45}
              textAlign='right'
              marginTop='$2'
            >
              질문을 입력하거나 선택해주세요
            </Text>
          )}
        </YStack>
      </YStack>
    </ScrollView>
  )
}
