import { describe, it, expect } from 'vitest'
import { tarotDeck } from '../data/tarotDeck'

describe('tarotDeck', () => {
  it('78장의 카드가 있어야 한다', () => {
    expect(tarotDeck).toHaveLength(78)
  })

  it('모든 카드가 고유한 id를 가져야 한다', () => {
    const ids = tarotDeck.map((card) => card.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(78)
  })

  it('Major Arcana 22장이 있어야 한다', () => {
    const majorCards = tarotDeck.filter((card) => card.arcanaType === 'Major')
    expect(majorCards).toHaveLength(22)
  })

  it('Minor Arcana 56장이 있어야 한다', () => {
    const minorCards = tarotDeck.filter((card) => card.arcanaType === 'Minor')
    expect(minorCards).toHaveLength(56)
  })

  it('Minor Arcana는 4개 슈트에 각 14장이어야 한다', () => {
    const suits = ['Cup', 'Pentacle', 'Sword', 'Wand'] as const
    for (const suit of suits) {
      const suitCards = tarotDeck.filter((card) => card.suit === suit)
      expect(suitCards).toHaveLength(14)
    }
  })

  it('Major Arcana의 suit은 null이어야 한다', () => {
    const majorCards = tarotDeck.filter((card) => card.arcanaType === 'Major')
    for (const card of majorCards) {
      expect(card.suit).toBeNull()
    }
  })

  it('모든 카드가 필수 필드를 가져야 한다', () => {
    for (const card of tarotDeck) {
      expect(card.name.en).toBeTruthy()
      expect(card.name.ko).toBeTruthy()
      expect(card.upright.keywords.length).toBeGreaterThan(0)
      expect(card.reversed.keywords.length).toBeGreaterThan(0)
      expect(card.upright.description).toBeTruthy()
      expect(card.reversed.description).toBeTruthy()
      expect(card.imageDescription.scene).toBeTruthy()
      expect(card.imageDescription.elements.length).toBeGreaterThan(0)
      expect(card.imageDescription.symbolism.length).toBeGreaterThan(0)
    }
  })
})
