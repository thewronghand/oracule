import { describe, it, expect } from 'vitest'
import {
  ReadingTable,
  insertReadingSchema,
  selectReadingSchema,
} from '../src/db/schema'
import type { Reading, InsertReading } from '../src/db/schema'

describe('ReadingTable', () => {
  it('exists and is an object', () => {
    expect(ReadingTable).toBeDefined()
    expect(typeof ReadingTable).toBe('object')
  })

  it('has the table name "Reading"', () => {
    const tableConfig = ReadingTable as unknown as Record<symbol, unknown>
    const symbolName = Object.getOwnPropertySymbols(tableConfig)
      .map((s) => tableConfig[s])
      .find((v) => v === 'Reading')
    expect(symbolName).toBe('Reading')
  })

  it('has an id column', () => {
    expect(ReadingTable.id).toBeDefined()
  })

  it('has a question column', () => {
    expect(ReadingTable.question).toBeDefined()
  })

  it('has a cards column', () => {
    expect(ReadingTable.cards).toBeDefined()
  })

  it('has an interpretation column', () => {
    expect(ReadingTable.interpretation).toBeDefined()
  })

  it('has a spreadType column', () => {
    expect(ReadingTable.spreadType).toBeDefined()
  })

  it('has a shareId column', () => {
    expect(ReadingTable.shareId).toBeDefined()
  })

  it('has a createdAt column', () => {
    expect(ReadingTable.createdAt).toBeDefined()
  })
})

describe('Reading valibot schemas', () => {
  it('insertReadingSchema is defined', () => {
    expect(insertReadingSchema).toBeDefined()
  })

  it('selectReadingSchema is defined', () => {
    expect(selectReadingSchema).toBeDefined()
  })
})

// Type-level checks: these ensure TypeScript compilation succeeds for the expected shapes
describe('Reading type compatibility', () => {
  it('Reading type has required fields at runtime via a plain object check', () => {
    const reading: Reading = {
      id: 'test-id',
      question: 'What will happen?',
      cards: '[]',
      interpretation: 'The cards suggest...',
      spreadType: 'SINGLE',
      shareId: 'share-abc123',
      createdAt: new Date().toISOString(),
    }
    expect(reading.id).toBe('test-id')
    expect(reading.question).toBe('What will happen?')
    expect(reading.spreadType).toBe('SINGLE')
    expect(reading.shareId).toBe('share-abc123')
  })

  it('InsertReading type allows shareId to be null', () => {
    const insert: InsertReading = {
      id: 'new-id',
      question: 'My question',
      cards: JSON.stringify([]),
      interpretation: 'Interpretation text',
      spreadType: 'CELTIC_CROSS',
      shareId: null,
      createdAt: new Date().toISOString(),
    }
    expect(insert.shareId).toBeNull()
  })

  it('InsertReading type allows shareId to be undefined (optional)', () => {
    const insert: InsertReading = {
      id: 'new-id-2',
      question: 'Another question',
      cards: JSON.stringify([]),
      interpretation: 'Some interpretation',
      spreadType: 'TRIPLE_TIMELINE',
      createdAt: new Date().toISOString(),
    }
    expect(insert.shareId).toBeUndefined()
  })
})
