export interface TarotCard {
  id: number
  name: {
    en: string
    ko: string
  }
  arcanaType: 'Major' | 'Minor'
  suit: 'Cup' | 'Pentacle' | 'Sword' | 'Wand' | null
  number: number
  imageDescription: {
    scene: string
    elements: string[]
    symbolism: string[]
  }
  upright: {
    keywords: string[]
    description: string
  }
  reversed: {
    keywords: string[]
    description: string
  }
}

export interface DrawnTarotCard {
  id: number
  name: {
    en: string
    ko: string
  }
  arcanaType: 'Major' | 'Minor'
  suit: 'Cup' | 'Pentacle' | 'Sword' | 'Wand' | null
  number: number
  direction: '정방향' | '역방향'
  keywords: string[]
  description: string
  imageDescription: {
    scene: string
    elements: string[]
    symbolism: string[]
  }
}
