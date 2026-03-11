import { HistoryScreen } from 'app/features/history/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>리딩 히스토리</title>
      </Head>
      <HistoryScreen />
    </>
  )
}
