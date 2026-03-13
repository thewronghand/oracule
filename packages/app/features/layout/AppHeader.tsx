import { XStack, Text, YStack, Avatar, styled } from 'tamagui'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
import { useLink } from 'solito/link'
import { LogOut, History } from '@tamagui/lucide-icons'

const HeaderContainer = styled(XStack, {
  width: '100%',
  height: 52,
  paddingHorizontal: '$6',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  $xs: { paddingHorizontal: '$4' },
})

const LogoText = styled(Text, {
  fontFamily: '$heading',
  fontSize: 22,
  fontWeight: '400',
  letterSpacing: 2,
  color: '$color',
})

const NavText = styled(Text, {
  fontFamily: '$body',
  fontSize: 11,
  fontWeight: '400',
  letterSpacing: 2.5,
  textTransform: 'uppercase',
  color: '$colorFocus',
  cursor: 'pointer',
  pressStyle: { opacity: 0.5 },
  hoverStyle: { color: '$color' },
})

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email

  return (
    <HeaderContainer>
      {/* 로고 */}
      <YStack {...homeLink} cursor='pointer'>
        <LogoText>Oracule</LogoText>
      </YStack>

      {/* 우측 */}
      {isLoading ? null : user ? (
        <XStack alignItems='center' gap='$5'>
          <YStack {...historyLink} cursor='pointer' pressStyle={{ opacity: 0.5 }}>
            <NavText>History</NavText>
          </YStack>

          <XStack alignItems='center' gap='$3'>
            {avatarUrl ? (
              <Avatar circular size='$2'>
                <Avatar.Image src={avatarUrl} />
                <Avatar.Fallback
                  backgroundColor='rgba(201,169,110,0.15)'
                  borderWidth={1}
                  borderColor='rgba(201,169,110,0.3)'
                >
                  <Text fontFamily='$body' fontSize='$2' color='#c9a96e'>
                    {getInitial(displayName)}
                  </Text>
                </Avatar.Fallback>
              </Avatar>
            ) : (
              <YStack
                width={26}
                height={26}
                borderRadius={13}
                backgroundColor='rgba(201,169,110,0.12)'
                borderWidth={1}
                borderColor='rgba(201,169,110,0.3)'
                alignItems='center'
                justifyContent='center'
              >
                <Text fontFamily='$body' fontSize='$1' color='#c9a96e' fontWeight='500'>
                  {getInitial(displayName)}
                </Text>
              </YStack>
            )}
            <NavText numberOfLines={1} maxWidth={100}>
              {typeof displayName === 'string'
                ? displayName.split('@')[0]
                : displayName}
            </NavText>
          </XStack>

          <YStack
            cursor='pointer'
            padding='$1'
            pressStyle={{ opacity: 0.5 }}
            onPress={handleLogout}
          >
            <LogOut size={15} color='$colorFocus' />
          </YStack>
        </XStack>
      ) : (
        <NavText {...loginLink}>Login</NavText>
      )}
    </HeaderContainer>
  )
}
