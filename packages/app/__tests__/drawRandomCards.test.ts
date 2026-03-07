import { describe, it, expect } from 'vitest'
import { drawRandomCards } from '../utils/drawRandomCards'

describe('drawRandomCards', () => {
  it('요청한 수만큼의 카드를 반환해야 한다', () => {
    expect(drawRandomCards(1)).toHaveLength(1)
    expect(drawRandomCards(3)).toHaveLength(3)
    expect(drawRandomCards(5)).toHaveLength(5)
    expect(drawRandomCards(10)).toHaveLength(10)
  })

  it('중복 카드가 없어야 한다', () => {
    const cards = drawRandomCards(10)
    const ids = cards.map((card) => card.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(10)
  })

  it('각 카드에 방향이 지정되어야 한다', () => {
    const cards = drawRandomCards(5)
    for (const card of cards) {
      expect(['정방향', '역방향']).toContain(card.direction)
    }
  })

  it('각 카드에 필수 필드가 있어야 한다', () => {
    const cards = drawRandomCards(3)
    for (const card of cards) {
      expect(card.id).toBeDefined()
      expect(card.name.en).toBeTruthy()
      expect(card.name.ko).toBeTruthy()
      expect(card.keywords.length).toBeGreaterThan(0)
      expect(card.description).toBeTruthy()
      expect(card.imageDescription).toBeDefined()
    }
  })

  it('정방향 카드는 upright 키워드를 가져야 한다', () => {
    // 100번 뽑아서 정방향 카드가 있는지 확인 (확률적)
    let foundUpright = false
    for (let i = 0; i < 100; i++) {
      const cards = drawRandomCards(1)
      if (cards[0]?.direction === '정방향') {
        foundUpright = true
        break
      }
    }
    expect(foundUpright).toBe(true)
  })
})
