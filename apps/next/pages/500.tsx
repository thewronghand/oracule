import Head from 'next/head'

export default function Page500() {
  return (
    <>
      <Head>
        <title>서버 오류 — Oracule</title>
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
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>500</h1>
        <p style={{ fontSize: 16, color: '#666', margin: 0 }}>서버 오류가 발생했습니다.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 20px',
            border: '1px solid #e5e5e5',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          다시 시도
        </button>
      </div>
    </>
  )
}
