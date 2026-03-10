import { DrawnTarotCard } from './card'
import { SpreadType } from './spread'

export interface CardReading {
  cardName: string
  position: string
  interpretation: string
}

export interface ReadingInterpretation {
  cardReadings: CardReading[]
  content: string
  title: string
  summary: string
}

export interface TarotReading {
  id: string
  spreadType: SpreadType
  question: string
  interpretation: string
  cards: DrawnTarotCard[]
  createdAt: string
  shareId?: string
}
