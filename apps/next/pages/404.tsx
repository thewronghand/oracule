import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Page404() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>페이지를 찾을 수 없습니다 — Oracule</title>
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'sans-serif',
          color: '#111',
          gap: 16,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>404</h1>
        <p style={{ fontSize: 16, color: '#666', margin: 0 }}>페이지를 찾을 수 없습니다.</p>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '8px 20px',
            border: '1px solid #e5e5e5',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          홈으로
        </button>
      </div>
    </>
  )
}
