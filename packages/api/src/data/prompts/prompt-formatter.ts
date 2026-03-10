import type { DrawnTarotCard } from 'app/types/card'
import type { SpreadType } from 'app/types/spread'
import { SPREAD_INFO } from 'app/types/spread'
import { spreadGuides } from './spread-guide'

export function formatReadingPrompt(
  userInput: string,
  cards: DrawnTarotCard[],
  spreadType: SpreadType,
  characterRpPrompt?: string
): string {
  const spreadInfo = SPREAD_INFO[spreadType]
  const guide = spreadGuides[spreadType]

  const cardLayout = cards
    .map((card, index) => {
      const position = spreadInfo.positions[index] ?? `Card ${index + 1}`
      return `${position}:\n${JSON.stringify(card, null, 2)}`
    })
    .join('\n\n')

  const characterSection = characterRpPrompt
    ? `# Character Role-Play
${characterRpPrompt}

`
    : ''

  return `${characterSection}# Spread Information
${spreadInfo.name}
${guide}

# Card Layout
${cardLayout}

# User Question
${userInput}

Please interpret these tarot cards based on the spread layout and the user's question.`
}
