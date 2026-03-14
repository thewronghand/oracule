import Head from 'next/head'

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>오프라인 — Oracule</title>
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
        <p style={{ fontSize: 16, color: '#666' }}>인터넷 연결을 확인하고 다시 시도해주세요.</p>
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
