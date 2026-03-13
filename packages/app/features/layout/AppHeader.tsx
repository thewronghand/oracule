import { XStack, Text, YStack, Avatar } from 'tamagui'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
import { useLink } from 'solito/link'

function getInitial(name?: string | null, email?: string | null): string {
  if (name) return name.charAt(0).toUpperCase()
  if (email) return email.charAt(0).toUpperCase()
  return '?'
}

export function AppHeader() {
  const { user, isLoading } = useUser()
  const supabase = useSupabase()
  const loginLink = useLink({ href: '/login' })
  const homeLink = useLink({ href: '/' })
  const historyLink = useLink({ href: '/history' })
  const fortuneLink = useLink({ href: '/fortune' })

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email

  return (
    <XStack
      width='100%'
      height={48}
      paddingHorizontal={24}
      alignItems='center'
      justifyContent='space-between'
      backgroundColor='$background'
      borderBottomWidth={1}
      borderBottomColor='rgba(255,255,255,0.06)'
      $gtSm={{ paddingHorizontal: 48 }}
    >
      {/* 로고 */}
      <YStack {...homeLink} cursor='pointer'>
        <Text
          fontFamily='$body'
          fontSize={15}
          fontWeight='500'
          letterSpacing={0.5}
          color='$color'
        >
          Oracule
        </Text>
      </YStack>

      {/* 우측 */}
      {isLoading ? null : user ? (
        <XStack alignItems='center' gap='$5'>
          <YStack {...fortuneLink} cursor='pointer' pressStyle={{ opacity: 0.5 }}>
            <Text
              fontFamily='$body'
              fontSize={13}
              color='$colorFocus'
              // @ts-ignore
              style={{ transition: 'color 0.15s ease' }}
            >
              운세
            </Text>
          </YStack>
          <YStack {...historyLink} cursor='pointer' pressStyle={{ opacity: 0.5 }}>
            <Text
              fontFamily='$body'
              fontSize={13}
              color='$colorFocus'
              // @ts-ignore
              style={{ transition: 'color 0.15s ease' }}
            >
              히스토리
            </Text>
          </YStack>

          {/* 아바타 */}
          <XStack
            alignItems='center'
            gap='$2'
            cursor='pointer'
            pressStyle={{ opacity: 0.6 }}
            onPress={handleLogout}
          >
            {avatarUrl ? (
              <Avatar circular size={28}>
                <Avatar.Image src={avatarUrl} />
                <Avatar.Fallback backgroundColor='rgba(232,232,232,0.08)'>
                  <Text fontFamily='$body' fontSize={11} color='$colorFocus'>
                    {getInitial(displayName)}
                  </Text>
                </Avatar.Fallback>
              </Avatar>
            ) : (
              <YStack
                width={28}
                height={28}
                borderRadius={14}
                backgroundColor='rgba(232,232,232,0.08)'
                alignItems='center'
                justifyContent='center'
              >
                <Text fontFamily='$body' fontSize={11} color='$colorFocus' fontWeight='500'>
                  {getInitial(displayName)}
                </Text>
              </YStack>
            )}
          </XStack>
        </XStack>
      ) : (
        <Text
          {...loginLink}
          fontFamily='$body'
          fontSize={13}
          color='$colorFocus'
          cursor='pointer'
          pressStyle={{ opacity: 0.5 }}
        >
          로그인
        </Text>
      )}
    </XStack>
  )
}
