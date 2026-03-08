import { describe, it, expect } from 'vitest'
import { spreadOptions, SPREAD_INFO } from '../types/spread'
import type { SpreadType } from '../types/spread'

describe('spreadOptions', () => {
  it('5가지 스프레드 옵션이 있어야 한다', () => {
    expect(spreadOptions).toHaveLength(5)
  })

  it('각 옵션에 올바른 cardCount가 지정되어야 한다', () => {
    const expected: Record<SpreadType, number> = {
      SINGLE: 1,
      TRIPLE_TIMELINE: 3,
      TRIPLE_CHOICE: 3,
      FIVE_CARD_CROSS: 5,
      CELTIC_CROSS: 10,
    }
    for (const option of spreadOptions) {
      expect(option.cardCount).toBe(expected[option.value])
    }
  })
})

describe('SPREAD_INFO', () => {
  it('5가지 스프레드 정보가 있어야 한다', () => {
    const keys = Object.keys(SPREAD_INFO)
    expect(keys).toHaveLength(5)
  })

  it('각 스프레드의 positions 수가 cardCount와 일치해야 한다', () => {
    for (const option of spreadOptions) {
      const info = SPREAD_INFO[option.value]
      expect(info.positions).toHaveLength(option.cardCount)
    }
  })
})
