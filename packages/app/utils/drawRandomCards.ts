import { tarotDeck } from '../data/tarotDeck'
import { DrawnTarotCard, TarotCard } from '../types/card'

function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }
  return result
}

function randomBool(): boolean {
  return Math.random() > 0.5
}

function processCardDirection(card: TarotCard): DrawnTarotCard {
  const direction: '정방향' | '역방향' = randomBool() ? '정방향' : '역방향'
  return {
    id: card.id,
    name: card.name,
    arcanaType: card.arcanaType,
    suit: card.suit,
    number: card.number,
    direction,
    keywords: direction === '정방향' ? card.upright.keywords : card.reversed.keywords,
    description: direction === '정방향' ? card.upright.description : card.reversed.description,
    imageDescription: card.imageDescription,
  }
}

export function drawRandomCards(cardCount: number): DrawnTarotCard[] {
  const shuffledDeck = shuffle([...tarotDeck])
  return shuffledDeck.slice(0, cardCount).map((card) => processCardDirection(card))
}
