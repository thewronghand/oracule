import type { Provider } from '@supabase/supabase-js'
import { useState } from 'react'
import { XStack, YStack, Text, Spinner } from 'tamagui'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
import { useRouter } from 'solito/router'
import { SolitoImage } from 'solito/image'

export function LoginScreen() {
  const { replace } = useRouter()
  const supabase = useSupabase()
  const [loading, setLoading] = useState<Provider | null>(null)

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
      },
    })

    if (error) {
      console.error(`[OAuth] ${provider} 로그인 실패:`, error.message)
      setLoading(null)
    }
  }

  return (
    <XStack flex={1} backgroundColor='$background'>
      {/* 좌측 — 이미지 패널 (데스크탑) */}
      <YStack flex={1} position='relative' display='none' $gtSm={{ display: 'flex' }}>
        {/* Unsplash 배경 */}
        <YStack
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          // @ts-ignore
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1200&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* 오버레이 */}
        <YStack
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          // @ts-ignore
          style={{
            background: 'linear-gradient(135deg, rgba(14,13,11,0.7) 0%, rgba(14,13,11,0.3) 100%)',
          }}
        />

        {/* 좌측 에디토리얼 텍스트 */}
        <YStack position='absolute' bottom={56} left={48} right={48} gap='$3'>
          <XStack alignItems='center' gap='$3'>
            <YStack width={24} height={1} backgroundColor='rgba(255,255,255,0.4)' />
            <Text
              fontFamily='$body'
              fontSize={10}
              fontWeight='500'
              letterSpacing={4}
              textTransform='uppercase'
              color='$colorFocus'
              opacity={0.6}
            >
              Tarot · Oracle
            </Text>
          </XStack>
          <Text
            fontFamily='$heading'
            fontSize={80}
            fontWeight='700'
            letterSpacing={-2}
            color='#ffffff'
            lineHeight={76}
            $xs={{ fontSize: 52, lineHeight: 50 }}
          >
            Ora­cule
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={16}
            fontStyle='italic'
            color='rgba(255,255,255,0.75)'
            letterSpacing={0.5}
          >
            당신의 이야기를 타로에게
          </Text>
        </YStack>
      </YStack>

      {/* 우측 — 로그인 폼 */}
      <YStack
        width='100%'
        $gtSm={{ width: 420 }}
        justifyContent='center'
        paddingHorizontal={48}
        paddingVertical={64}
        gap='$0'
        borderLeftWidth={1}
        borderLeftColor='$borderColor'
        $xs={{ paddingHorizontal: '$6' }}
      >
        {/* 모바일용 타이틀 */}
        <YStack marginBottom='$8' $gtSm={{ display: 'none' }}>
          <Text
            fontFamily='$body'
            fontSize={10}
            fontWeight='500'
            letterSpacing={4}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
            marginBottom='$3'
          >
            Tarot · Oracle
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={56}
            fontWeight='300'
            letterSpacing={-1}
            color='$color'
            lineHeight={52}
          >
            Oracule
          </Text>
        </YStack>

        {/* 섹션 헤더 */}
        <YStack marginBottom='$8'>
          <Text
            fontFamily='$body'
            fontSize={10}
            fontWeight='500'
            letterSpacing={4}
            textTransform='uppercase'
            color='$colorFocus'
            opacity={0.6}
            marginBottom='$4'
          >
            Welcome
          </Text>
          <Text
            fontFamily='$heading'
            fontSize={36}
            fontWeight='400'
            color='$color'
            lineHeight={38}
            letterSpacing={-0.5}
          >
            로그인하고{'\n'}기록을 시작하세요
          </Text>
        </YStack>

        {/* 가로 구분선 */}
        <YStack width='100%' height={1} backgroundColor='$borderColor' marginBottom='$8' />

        {/* 소셜 로그인 버튼들 */}
        <YStack gap='$3' width='100%'>
          <YStack
            paddingVertical='$4'
            paddingHorizontal='$5'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
            pressStyle={{ opacity: 0.8, scale: 0.98 }}
            backgroundColor='#FEE500'
            onPress={() => handleOAuthSignIn('kakao')}
            opacity={loading && loading !== 'kakao' ? 0.4 : 1}
            disabled={!!loading}
          >
            <XStack alignItems='center' gap='$3'>
              {loading === 'kakao' ? (
                <Spinner size='small' color='#191919' />
              ) : (
                <SolitoImage
                  src='/auth/kakao-logo.svg'
                  width={18}
                  height={18}
                  alt='Kakao'
                  style={{ width: 18, height: 18 }}
                  // @ts-ignore
                  unoptimized
                />
              )}
              <Text
                fontFamily='$body'
                fontSize='$3'
                fontWeight='500'
                color='#191919'
                letterSpacing={1.5}
                textTransform='uppercase'
              >
                카카오로 시작하기
              </Text>
            </XStack>
          </YStack>

          <YStack
            paddingVertical='$4'
            paddingHorizontal='$5'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
            pressStyle={{ opacity: 0.8, scale: 0.98 }}
            backgroundColor='#ffffff'
            borderWidth={1}
            borderColor='#e5e5e5'
            onPress={() => handleOAuthSignIn('google')}
            opacity={loading && loading !== 'google' ? 0.4 : 1}
            disabled={!!loading}
          >
            <XStack alignItems='center' gap='$3'>
              {loading === 'google' ? (
                <Spinner size='small' color='#444' />
              ) : (
                <SolitoImage
                  src='/auth/google-logo.svg'
                  width={18}
                  height={18}
                  alt='Google'
                  style={{ width: 18, height: 18 }}
                  // @ts-ignore
                  unoptimized
                />
              )}
              <Text
                fontFamily='$body'
                fontSize='$3'
                fontWeight='500'
                color='#333333'
                letterSpacing={1.5}
                textTransform='uppercase'
              >
                Google로 시작하기
              </Text>
            </XStack>
          </YStack>
        </YStack>

        {/* 비로그인 */}
        <YStack marginTop='$6' alignItems='center'>
          <Text
            fontFamily='$body'
            fontSize='$2'
            color='$colorFocus'
            letterSpacing={0.5}
            cursor='pointer'
            pressStyle={{ opacity: 0.6 }}
            onPress={() => replace('/')}
            opacity={0.65}
            // @ts-ignore
            style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            로그인 없이 둘러보기
          </Text>
        </YStack>
      </YStack>
    </XStack>
  )
}
