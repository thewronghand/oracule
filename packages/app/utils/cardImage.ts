const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_URL ?? process.env.EXPO_PUBLIC_R2_URL ?? ''

export function getCardImageUrl(cardId: number): string {
  return `${R2_BASE_URL}/deck/default/${cardId}.webp`
}
