import { FortuneScreen } from 'app/features/fortune/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>오늘의 운세</title>
      </Head>
      <FortuneScreen />
    </>
  )
}
