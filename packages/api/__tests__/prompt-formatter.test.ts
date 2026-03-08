import { describe, it, expect } from 'vitest'
import { formatReadingPrompt } from '../src/data/prompts/prompt-formatter'
import type { DrawnTarotCard } from 'app/types/card'
import { SPREAD_INFO } from 'app/types/spread'
import { spreadGuides } from '../src/data/prompts/spread-guide'

const mockSingleCard: DrawnTarotCard = {
  id: 0,
  name: { en: 'The Fool', ko: '바보' },
  arcanaType: 'Major',
  suit: null,
  number: 0,
  direction: '정방향',
  keywords: ['new beginnings', 'adventure', 'freedom'],
  description: 'The Fool represents new beginnings and infinite possibilities.',
  imageDescription: {
    scene: 'A young figure steps off a cliff into the unknown.',
    elements: ['white sun', 'small dog', 'knapsack'],
    symbolism: ['freedom', 'naivety', 'potential'],
  },
}

const mockCelticCrossCards: DrawnTarotCard[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: { en: `Card ${i + 1}`, ko: `카드 ${i + 1}` },
  arcanaType: 'Minor' as const,
  suit: 'Cup' as const,
  number: i + 1,
  direction: i % 2 === 0 ? ('정방향' as const) : ('역방향' as const),
  keywords: ['keyword1', 'keyword2'],
  description: `Description for card ${i + 1}`,
  imageDescription: {
    scene: `Scene ${i + 1}`,
    elements: ['element1'],
    symbolism: ['symbol1'],
  },
}))

describe('formatReadingPrompt', () => {
  describe('SINGLE spread', () => {
    it('returns a string', () => {
      const result = formatReadingPrompt('What should I focus on today?', [mockSingleCard], 'SINGLE')
      expect(typeof result).toBe('string')
    })

    it('includes the spread name', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain(SPREAD_INFO.SINGLE.name)
    })

    it('includes the spread guide text', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain(spreadGuides.SINGLE)
    })

    it('includes the card position from SPREAD_INFO', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain(SPREAD_INFO.SINGLE.positions[0])
    })

    it('includes the user question', () => {
      const question = 'What should I focus on today?'
      const result = formatReadingPrompt(question, [mockSingleCard], 'SINGLE')
      expect(result).toContain(question)
    })

    it('includes card data serialized as JSON', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain(mockSingleCard.name.en)
      expect(result).toContain(mockSingleCard.direction)
    })

    it('includes # Spread Information section header', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain('# Spread Information')
    })

    it('includes # Card Layout section header', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain('# Card Layout')
    })

    it('includes # User Question section header', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain('# User Question')
    })

    it('includes the interpretation instruction', () => {
      const result = formatReadingPrompt('Test question', [mockSingleCard], 'SINGLE')
      expect(result).toContain('Please interpret these tarot cards')
    })
  })

  describe('CELTIC_CROSS spread', () => {
    it('returns a string', () => {
      const result = formatReadingPrompt('How will this situation unfold?', mockCelticCrossCards, 'CELTIC_CROSS')
      expect(typeof result).toBe('string')
    })

    it('includes the Celtic Cross spread name', () => {
      const result = formatReadingPrompt('How will this situation unfold?', mockCelticCrossCards, 'CELTIC_CROSS')
      expect(result).toContain(SPREAD_INFO.CELTIC_CROSS.name)
    })

    it('includes the Celtic Cross guide text', () => {
      const result = formatReadingPrompt('How will this situation unfold?', mockCelticCrossCards, 'CELTIC_CROSS')
      expect(result).toContain(spreadGuides.CELTIC_CROSS)
    })

    it('includes all 10 card positions', () => {
      const result = formatReadingPrompt('How will this situation unfold?', mockCelticCrossCards, 'CELTIC_CROSS')
      for (const position of SPREAD_INFO.CELTIC_CROSS.positions) {
        expect(result).toContain(position)
      }
    })

    it('includes all 10 cards data', () => {
      const result = formatReadingPrompt('How will this situation unfold?', mockCelticCrossCards, 'CELTIC_CROSS')
      for (const card of mockCelticCrossCards) {
        expect(result).toContain(card.name.en)
      }
    })

    it('includes the user question', () => {
      const question = 'How will this situation unfold?'
      const result = formatReadingPrompt(question, mockCelticCrossCards, 'CELTIC_CROSS')
      expect(result).toContain(question)
    })
  })

  describe('output format', () => {
    it('sections appear in the correct order', () => {
      const result = formatReadingPrompt('My question', [mockSingleCard], 'SINGLE')
      const spreadInfoIdx = result.indexOf('# Spread Information')
      const cardLayoutIdx = result.indexOf('# Card Layout')
      const userQuestionIdx = result.indexOf('# User Question')

      expect(spreadInfoIdx).toBeLessThan(cardLayoutIdx)
      expect(cardLayoutIdx).toBeLessThan(userQuestionIdx)
    })

    it('returns a non-empty string for all spread types', () => {
      const spreadTypes = ['SINGLE', 'TRIPLE_TIMELINE', 'TRIPLE_CHOICE', 'FIVE_CARD_CROSS', 'CELTIC_CROSS'] as const
      for (const spreadType of spreadTypes) {
        const cardCount = SPREAD_INFO[spreadType].positions.length
        const cards = Array.from({ length: cardCount }, () => mockSingleCard)
        const result = formatReadingPrompt('Test question', cards, spreadType)
        expect(result.length).toBeGreaterThan(0)
      }
    })
  })
})
