interface KakaoShareButton {
  title: string
  link: { mobileWebUrl: string; webUrl: string }
}

interface KakaoFeedContent {
  title: string
  description: string
  imageUrl?: string
  link: { mobileWebUrl: string; webUrl: string }
}

interface KakaoFeedTemplate {
  objectType: 'feed'
  content: KakaoFeedContent
  buttons?: KakaoShareButton[]
}

interface KakaoShare {
  sendDefault(template: KakaoFeedTemplate): void
}

interface KakaoStatic {
  init(appKey: string): void
  isInitialized(): boolean
  Share: KakaoShare
}

interface Window {
  Kakao?: KakaoStatic
}
