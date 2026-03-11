import { authRouter } from './routes/auth'
import { carsRouter } from './routes/cars'
import { fortuneRouter } from './routes/fortune'
import { helloRouter } from './routes/hello'
import { readingRouter } from './routes/reading'
import { userRouter } from './routes/user'
import { router } from './trpc'

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  auth: authRouter,
  car: carsRouter,
  reading: readingRouter,
  fortune: fortuneRouter,
})

export type AppRouter = typeof appRouter
