import { Platform } from 'react-native'

interface KakaoShareParams {
  title: string
  description: string
  shareUrl: string
  imageUrl?: string
}

export function shareToKakao({ title, description, shareUrl, imageUrl }: KakaoShareParams): void {
  if (Platform.OS !== 'web') return

  if (typeof window === 'undefined' || !window.Kakao) {
    console.warn('[kakaoShare] Kakao SDK가 로드되지 않았습니다.')
    return
  }

  if (!window.Kakao.isInitialized()) {
    console.warn('[kakaoShare] Kakao SDK가 초기화되지 않았습니다.')
    return
  }

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        ...(imageUrl ? { imageUrl } : {}),
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '결과 보기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        {
          title: '나도 해보기',
          link: {
            mobileWebUrl: shareUrl.replace(/\/share\/.*$/, ''),
            webUrl: shareUrl.replace(/\/share\/.*$/, ''),
          },
        },
      ],
    })
  } catch (e) {
    console.warn('[kakaoShare] 카카오톡 공유 실패:', e)
  }
}
