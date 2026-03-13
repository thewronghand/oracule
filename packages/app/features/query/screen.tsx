import { useState } from 'react'
import { Paragraph, ScrollView, Separator, XStack, YStack, Text, styled } from 'tamagui'
import { OraculeButton, OraculeTextArea, SpreadSelector } from '@t4/ui'
import type { SpreadType } from 'app/types/spread'
import { CHARACTERS, type CharacterId } from 'app/types/character'
import { useRouter } from 'solito/router'

const EXAMPLE_QUESTIONS = [
  '지금 내 커리어 방향은 올바른가요?',
  '이 관계에서 내가 놓치고 있는 것은?',
  '앞으로 한 달간 집중해야 할 것은?',
]

const SectionLabel = styled(Text, {
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  letterSpacing: 4,
  textTransform: 'uppercase',
  color: '#c9a96e',
  marginBottom: '$3',
})

const SectionTitle = styled(Text, {
  fontFamily: '$heading',
  fontSize: 32,
  fontWeight: '400',
  letterSpacing: -0.5,
  color: '$color',
  lineHeight: 36,
  marginBottom: '$2',
})

const Divider = styled(YStack, {
  width: '100%',
  height: 1,
  backgroundColor: '$borderColor',
  opacity: 0.5,
  marginVertical: '$6',
})

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
        maxWidth={720}
        width='100%'
        alignSelf='center'
        paddingHorizontal={48}
        paddingTop={56}
        paddingBottom={96}
        gap='$0'
        $xs={{ paddingHorizontal: '$5', paddingTop: '$8' }}
        $sm={{ paddingHorizontal: '$6' }}
      >
        {/* 페이지 헤더 */}
        <YStack marginBottom='$8'>
          <SectionLabel>New Reading</SectionLabel>
          <Text
            fontFamily='$heading'
            fontSize={56}
            fontWeight='300'
            letterSpacing={-1.5}
            color='$color'
            lineHeight={54}
            $xs={{ fontSize: 40, lineHeight: 40 }}
          >
            타로 리딩
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={56}
            fontWeight='300'
            fontStyle='italic'
            letterSpacing={-1.5}
            color='#c9a96e'
            lineHeight={54}
            $xs={{ fontSize: 40, lineHeight: 40 }}
          >
            시작하기
          </Text>
        </YStack>

        <Divider />

        {/* 캐릭터 선택 */}
        <YStack gap='$5'>
          <YStack>
            <SectionLabel>01 — Interpreter</SectionLabel>
            <SectionTitle>누가 해석해줄까요?</SectionTitle>
            <Paragraph fontFamily='$body' fontSize='$3' color='$colorFocus' lineHeight='$5'>
              캐릭터마다 해석 스타일이 달라요
            </Paragraph>
          </YStack>

          <XStack flexWrap='wrap' gap='$3'>
            {CHARACTERS.map((character) => {
              const isSelected = selectedCharacter === character.id
              return (
                <YStack
                  key={character.id}
                  flex={1}
                  minWidth='45%'
                  backgroundColor={isSelected ? 'rgba(201,169,110,0.08)' : 'transparent'}
                  borderWidth={1}
                  borderColor={isSelected ? 'rgba(201,169,110,0.6)' : '$borderColor'}
                  padding='$4'
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setSelectedCharacter(character.id)}
                  cursor='pointer'
                  gap='$2'
                  $xs={{ minWidth: '100%' }}
                >
                  <Text fontSize={24}>{character.emoji}</Text>
                  <Text
                    fontFamily='$body'
                    fontSize='$3'
                    fontWeight={isSelected ? '500' : '400'}
                    color={isSelected ? '#c9a96e' : '$color'}
                    letterSpacing={0.3}
                  >
                    {character.name}
                  </Text>
                  <Text
                    fontFamily='$body'
                    fontSize='$2'
                    color='$colorFocus'
                    lineHeight='$4'
                  >
                    {character.description}
                  </Text>
                </YStack>
              )
            })}
          </XStack>
        </YStack>

        <Divider />

        {/* 스프레드 선택 */}
        <YStack gap='$5'>
          <YStack>
            <SectionLabel>02 — Spread</SectionLabel>
            <SectionTitle>어떤 스프레드로 볼까요?</SectionTitle>
            <Paragraph fontFamily='$body' fontSize='$3' color='$colorFocus' lineHeight='$5'>
              질문의 성격에 맞는 스프레드를 선택하세요
            </Paragraph>
          </YStack>

          <SpreadSelector selectedSpread={selectedSpread} onSelect={setSelectedSpread} />
        </YStack>

        <Divider />

        {/* 질문 입력 */}
        <YStack gap='$5'>
          <YStack>
            <SectionLabel>03 — Question</SectionLabel>
            <SectionTitle>질문을 입력해주세요</SectionTitle>
            <Paragraph fontFamily='$body' fontSize='$3' color='$colorFocus' lineHeight='$5'>
              카드에게 솔직하게 물어보세요
            </Paragraph>
          </YStack>

          {/* 예시 질문 */}
          <YStack gap='$2'>
            <Text
              fontFamily='$body'
              fontSize={10}
              fontWeight='500'
              letterSpacing={3}
              textTransform='uppercase'
              color='$colorFocus'
              marginBottom='$1'
            >
              예시 질문
            </Text>
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
                  borderColor={isSelected ? 'rgba(201,169,110,0.5)' : '$borderColor'}
                  backgroundColor={isSelected ? 'rgba(201,169,110,0.06)' : 'transparent'}
                  pressStyle={{ opacity: 0.6 }}
                  onPress={() => setQuestion(q)}
                  cursor='pointer'
                >
                  <YStack
                    width={5}
                    height={5}
                    borderRadius={3}
                    backgroundColor={isSelected ? '#c9a96e' : '$borderColor'}
                    flexShrink={0}
                  />
                  <Text
                    flex={1}
                    fontFamily='$body'
                    fontSize='$3'
                    color={isSelected ? '#c9a96e' : '$colorFocus'}
                    fontWeight={isSelected ? '500' : '400'}
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
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              borderRadius: 0,
              borderColor: question ? 'rgba(201,169,110,0.5)' : undefined,
            }}
          />
        </YStack>

        <Divider />

        {/* CTA */}
        <XStack justifyContent='flex-end'>
          <OraculeButton
            variant='primary'
            customSize='lg'
            onPress={handleDraw}
            disabled={question.trim() === ''}
            opacity={question.trim() === '' ? 0.35 : 1}
            minWidth={200}
          >
            카드 뽑기
          </OraculeButton>
        </XStack>
      </YStack>
    </ScrollView>
  )
}
