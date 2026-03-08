import { ShareScreen } from 'app/features/share/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>타로 결과 공유</title>
      </Head>
      <ShareScreen />
    </>
  )
}
