import { TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { eq } from 'drizzle-orm'
import type { DrawnTarotCard } from 'app/types/card'
import type { SpreadType } from 'app/types/spread'
import { ReadingTable } from '../db/schema'
import { formatReadingPrompt } from '../data/prompts/prompt-formatter'
import { generateTarotReading } from '../services/gemini.service'
import { systemPrompt } from '../data/prompts/system-prompt'
import { publicProcedure, router } from '../trpc'

const DrawnTarotCardSchema = v.object({
  id: v.number(),
  name: v.object({
    en: v.string(),
    ko: v.string(),
  }),
  arcanaType: v.picklist(['Major', 'Minor']),
  suit: v.nullable(v.picklist(['Cup', 'Pentacle', 'Sword', 'Wand'])),
  number: v.number(),
  direction: v.picklist(['정방향', '역방향']),
  keywords: v.array(v.string()),
  description: v.string(),
  imageDescription: v.object({
    scene: v.string(),
    elements: v.array(v.string()),
    symbolism: v.array(v.string()),
  }),
})

const SpreadTypeSchema = v.picklist([
  'SINGLE',
  'TRIPLE_CHOICE',
  'TRIPLE_TIMELINE',
  'FIVE_CARD_CROSS',
  'CELTIC_CROSS',
])

function generateShareId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 8)
}

export const readingRouter = router({
  create: publicProcedure
    .input(
      v.parser(
        v.object({
          question: v.string(),
          cards: v.array(DrawnTarotCardSchema),
          spreadType: SpreadTypeSchema,
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const { question, cards, spreadType } = input

      try {
        const userPrompt = formatReadingPrompt(
          question,
          cards as DrawnTarotCard[],
          spreadType as SpreadType
        )

        console.log('[reading.create] Gemini API 호출 시작')
        const parsedInterpretation = await generateTarotReading(
          { serviceAccountJson: ctx.vertexServiceAccountJson },
          systemPrompt.input,
          systemPrompt.response,
          userPrompt
        )
        console.log('[reading.create] Gemini API 호출 성공')

        const interpretationJson = JSON.stringify(parsedInterpretation)

        const id = crypto.randomUUID()
        const shareId = generateShareId()
        const createdAt = new Date().toISOString()

        console.log('[reading.create] DB 저장 시작')
        await ctx.db.insert(ReadingTable).values({
          id,
          question,
          cards: JSON.stringify(cards),
          interpretation: interpretationJson,
          spreadType,
          shareId,
          createdAt,
        })
        console.log('[reading.create] DB 저장 성공')

        return {
          id,
          question,
          cards,
          interpretation: interpretationJson,
          spreadType,
          shareId,
          createdAt,
        }
      } catch (error) {
        console.error('[reading.create] 에러 발생:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : '알 수 없는 에러',
          cause: error,
        })
      }
    }),

  getById: publicProcedure
    .input(v.parser(v.object({ id: v.string() })))
    .query(async ({ input, ctx }) => {
      const rows = await ctx.db.select().from(ReadingTable).where(eq(ReadingTable.id, input.id))

      const row = rows[0]
      if (!row) {
        throw new TRPCError({ code: 'NOT_FOUND', message: '리딩을 찾을 수 없습니다.' })
      }

      return {
        ...row,
        cards: JSON.parse(row.cards) as DrawnTarotCard[],
      }
    }),

  getByShareId: publicProcedure
    .input(v.parser(v.object({ shareId: v.string() })))
    .query(async ({ input, ctx }) => {
      const rows = await ctx.db
        .select()
        .from(ReadingTable)
        .where(eq(ReadingTable.shareId, input.shareId))

      const row = rows[0]
      if (!row) {
        throw new TRPCError({ code: 'NOT_FOUND', message: '공유된 리딩을 찾을 수 없습니다.' })
      }

      return {
        ...row,
        cards: JSON.parse(row.cards) as DrawnTarotCard[],
      }
    }),
})
