import { DrawnTarotCard } from './card'
import { SpreadType } from './spread'

export interface TarotReading {
  id: string
  spreadType: SpreadType
  question: string
  interpretation: string
  cards: DrawnTarotCard[]
  createdAt: string
  shareId?: string
}
