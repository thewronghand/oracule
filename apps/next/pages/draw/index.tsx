import { DrawScreen } from 'app/features/draw/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>카드 뽑기</title>
      </Head>
      <DrawScreen />
    </>
  )
}
