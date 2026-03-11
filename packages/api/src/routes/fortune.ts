import { TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { eq, and, like } from 'drizzle-orm'
import { tarotDeck } from 'app/data/tarotDeck'
import { getCharacterById } from 'app/types/character'
import { DailyFortuneTable } from '../db/schema'
import { fortuneSystemPrompt, formatFortunePrompt } from '../data/prompts/fortune-prompt'
import { generateFortuneReading } from '../services/gemini.service'
import { protectedProcedure, router } from '../trpc'

function getTodayDateKST(): string {
  const now = new Date()
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  return kst.toISOString().slice(0, 10)
}

export const fortuneRouter = router({
  getToday: protectedProcedure.query(async ({ ctx }) => {
    const today = getTodayDateKST()

    const rows = await ctx.db
      .select()
      .from(DailyFortuneTable)
      .where(and(eq(DailyFortuneTable.userId, ctx.user.id), eq(DailyFortuneTable.date, today)))

    return rows[0] ?? null
  }),

  create: protectedProcedure
    .input(
      v.parser(
        v.object({
          cardId: v.pipe(v.number(), v.minValue(0), v.maxValue(77)),
          direction: v.picklist(['정방향', '역방향']),
          characterId: v.optional(v.string()),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const today = getTodayDateKST()
      const { cardId, direction, characterId } = input

      // 오늘 이미 운세를 뽑았는지 확인
      const existing = await ctx.db
        .select()
        .from(DailyFortuneTable)
        .where(and(eq(DailyFortuneTable.userId, ctx.user.id), eq(DailyFortuneTable.date, today)))

      if (existing[0]) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: '오늘의 운세는 이미 확인했습니다.',
        })
      }

      const card = tarotDeck[cardId]!
      const keywords = direction === '정방향' ? card.upright.keywords : card.reversed.keywords
      const description =
        direction === '정방향' ? card.upright.description : card.reversed.description

      const character = getCharacterById(characterId)

      try {
        const userPrompt = formatFortunePrompt(
          card.name.ko,
          direction,
          keywords,
          description,
          character.rpPrompt || undefined
        )

        console.log('[fortune.create] Gemini API 호출 시작')
        const fortuneResult = await generateFortuneReading(
          { serviceAccountJson: ctx.vertexServiceAccountJson },
          fortuneSystemPrompt.input,
          fortuneSystemPrompt.response,
          userPrompt
        )
        console.log('[fortune.create] Gemini API 호출 성공')

        const interpretationJson = JSON.stringify(fortuneResult)

        const id = crypto.randomUUID()
        const createdAt = new Date().toISOString()

        await ctx.db.insert(DailyFortuneTable).values({
          id,
          userId: ctx.user.id,
          cardId,
          cardDirection: direction,
          interpretation: interpretationJson,
          characterId: characterId ?? null,
          date: today,
          createdAt,
        })
        console.log('[fortune.create] DB 저장 성공')

        return {
          id,
          userId: ctx.user.id,
          cardId,
          cardDirection: direction,
          interpretation: interpretationJson,
          characterId: characterId ?? null,
          date: today,
          createdAt,
        }
      } catch (error) {
        console.error('[fortune.create] 에러 발생:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : '알 수 없는 에러',
          cause: error,
        })
      }
    }),

  listByMonth: protectedProcedure
    .input(
      v.parser(
        v.object({
          year: v.number(),
          month: v.number(),
        })
      )
    )
    .query(async ({ input, ctx }) => {
      const { year, month } = input
      const monthStr = `${year}-${String(month).padStart(2, '0')}`

      const rows = await ctx.db
        .select({
          id: DailyFortuneTable.id,
          cardId: DailyFortuneTable.cardId,
          cardDirection: DailyFortuneTable.cardDirection,
          interpretation: DailyFortuneTable.interpretation,
          characterId: DailyFortuneTable.characterId,
          date: DailyFortuneTable.date,
        })
        .from(DailyFortuneTable)
        .where(
          and(
            eq(DailyFortuneTable.userId, ctx.user.id),
            like(DailyFortuneTable.date, `${monthStr}%`)
          )
        )

      return rows
    }),
})
