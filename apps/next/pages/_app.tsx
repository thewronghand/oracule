if (typeof requestAnimationFrame === 'undefined') {
  if (typeof setImmediate !== 'undefined') {
    globalThis.requestAnimationFrame = setImmediate
  } else {
    globalThis.requestAnimationFrame = (callback) => {
      const now = Date.now()
      callback(now)
      return now
    }
  }
}
import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'

import type { Session } from '@supabase/supabase-js'
import { Provider } from 'app/provider'
import { AppHeader } from 'app/features/layout/AppHeader'
import { trpc } from 'app/utils/trpc/index.web'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import type { SolitoAppProps } from 'solito'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

const title = `${process.env.NEXT_PUBLIC_METADATA_NAME}`
const description = `${process.env.NEXT_PUBLIC_METADATA_DESCRIPTION}`

const HIDE_HEADER_PATHS = ['/', '/login']

const T4App = ({ Component, pageProps }: SolitoAppProps<{ initialSession: Session | null }>) => {
  const router = useRouter()
  const showHeader = !HIDE_HEADER_PATHS.includes(router.pathname)

  return (
    <>
      <DefaultSeo title={title} description={description} />
      <Metadata />
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.8.0/kakao.min.js'
        strategy='afterInteractive'
        onLoad={() => {
          try {
            if (window.Kakao && !window.Kakao.isInitialized()) {
              const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY
              if (key) window.Kakao.init(key)
            }
          } catch (e) {
            console.warn('[Kakao SDK] 초기화 실패:', e)
          }
        }}
      />
      <Provider initialSession={pageProps.initialSession}>
        {showHeader && <AppHeader />}
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default trpc.withTRPC(T4App)

const Metadata = () => (
  <Head>
    <meta name='viewport' content='width=device-width,initial-scale=1' />
    {/* Ensure a minimum width of 100% */}
    <style>
      {`
        body, #root, #__next {
          min-width: 100% !important;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Draw 화면 Phase 전환 */
        @keyframes phaseEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Draw 화면 카드 등장 */
        @keyframes cardAppear {
          from { opacity: 0; transform: translateY(12px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        /* 셔플 카드 */
        @keyframes cardShuffle {
          0%   { transform: translateX(0) rotate(0deg); }
          25%  { transform: translateX(-18px) rotate(-4deg); }
          75%  { transform: translateX(18px) rotate(4deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        /* prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}
    </style>
    {/* Favicons */}
    <link rel='icon' href='/pwa/icons/favicon.ico' />
    <link rel='shortcut icon' href='/pwa/icons/favicon.ico' />
    <meta name='theme-color' content='#FFFFFF' />
    {/* PWA App Icons for iOS */}
    <link rel='apple-touch-icon' href='/pwa/icons/touch-icon-iphone.png' />
    <link rel='apple-touch-icon' sizes='152x152' href='/pwa/icons/touch-icon-ipad.png' />
    <link rel='apple-touch-icon' sizes='180x180' href='/pwa/icons/touch-icon-iphone-retina.png' />
    <link rel='apple-touch-icon' sizes='167x167' href='/pwa/icons/touch-icon-ipad-retina.png' />
    {/* PWA Splash Screens for iOS */}
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_14_Pro_Max_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_14_Pro_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_11__iPhone_XR_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/12.9__iPad_Pro_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/10.9__iPad_Air_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/10.5__iPad_Air_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/10.2__iPad_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      href='/pwa/splash-screens/8.3__iPad_Mini_landscape.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_14_Pro_Max_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_14_Pro_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_11__iPhone_XR_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/12.9__iPad_Pro_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/10.9__iPad_Air_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/10.5__iPad_Air_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/10.2__iPad_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png'
    />
    <link
      rel='apple-touch-startup-image'
      media='screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      href='/pwa/splash-screens/8.3__iPad_Mini_portrait.png'
    />
  </Head>
)
