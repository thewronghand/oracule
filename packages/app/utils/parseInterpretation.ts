import type { ReadingInterpretation } from 'app/types/reading'

const FALLBACK: ReadingInterpretation = {
  title: '타로 리딩 결과',
  summary: '',
  cardReadings: [],
  content: '',
}

export function parseInterpretation(raw: string): ReadingInterpretation {
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed === 'object' && parsed !== null && 'content' in parsed) {
      const obj = parsed as Record<string, unknown>
      return {
        cardReadings: Array.isArray(obj.cardReadings)
          ? (obj.cardReadings as ReadingInterpretation['cardReadings'])
          : [],
        content: typeof obj.content === 'string' ? obj.content : '',
        title: typeof obj.title === 'string' ? obj.title : FALLBACK.title,
        summary: typeof obj.summary === 'string' ? obj.summary : '',
      }
    }
  } catch {
    // 기존 평문 데이터 fallback
  }

  return { ...FALLBACK, content: raw }
}
