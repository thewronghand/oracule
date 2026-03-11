import { XStack, Text, YStack, Avatar, styled } from "tamagui";
import { useUser } from "app/utils/supabase/hooks/useUser";
import { useSupabase } from "app/utils/supabase/hooks/useSupabase";
import { useLink } from "solito/link";
import { LogOut, History } from "@tamagui/lucide-icons";

const HeaderContainer = styled(XStack, {
	width: "100%",
	height: 56,
	paddingHorizontal: "$4",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: "$background",
	borderBottomWidth: 1,
	borderBottomColor: "$purple4",
});

const HeaderTitle = styled(Text, {
	fontSize: "$5",
	fontWeight: "700",
	letterSpacing: 2,
	color: "$purple10",
});

const LoginButton = styled(Text, {
	fontSize: "$3",
	fontWeight: "500",
	color: "$purple9",
	cursor: "pointer",
	pressStyle: { opacity: 0.7 },
});

const LogoutButton = styled(YStack, {
	cursor: "pointer",
	padding: "$1",
	borderRadius: "$2",
	pressStyle: { opacity: 0.7 },
});

function getInitial(name?: string | null, email?: string | null): string {
	if (name) return name.charAt(0).toUpperCase();
	if (email) return email.charAt(0).toUpperCase();
	return "?";
}

export function AppHeader() {
	const { user, isLoading } = useUser();
	const supabase = useSupabase();
	const loginLink = useLink({ href: "/login" });
	const homeLink = useLink({ href: "/" });
	const historyLink = useLink({ href: "/history" });

	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
	const displayName =
		user?.user_metadata?.full_name ||
		user?.user_metadata?.name ||
		user?.email;

	return (
		<HeaderContainer>
			{/* 로고 */}
			<YStack {...homeLink} cursor="pointer">
				<HeaderTitle>Oracule</HeaderTitle>
			</YStack>

			{/* 우측: 로그인 상태 */}
			{isLoading ? null : user ? (
				<XStack alignItems="center" gap="$3">
					<YStack {...historyLink} cursor="pointer" pressStyle={{ opacity: 0.7 }} padding="$1">
						<History size={20} color="$purple8" />
					</YStack>
					<XStack alignItems="center" gap="$2">
						{avatarUrl ? (
							<Avatar circular size="$2">
								<Avatar.Image src={avatarUrl} />
								<Avatar.Fallback backgroundColor="$purple6">
									<Text fontSize="$2" color="white">
										{getInitial(displayName)}
									</Text>
								</Avatar.Fallback>
							</Avatar>
						) : (
							<YStack
								width={28}
								height={28}
								borderRadius={14}
								backgroundColor="$purple6"
								alignItems="center"
								justifyContent="center"
							>
								<Text fontSize="$2" color="white" fontWeight="600">
									{getInitial(displayName)}
								</Text>
							</YStack>
						)}
						<Text
							fontSize="$3"
							color="$color"
							maxWidth={120}
							numberOfLines={1}
						>
							{displayName}
						</Text>
					</XStack>
					<LogoutButton onPress={handleLogout}>
						<LogOut size={18} color="$purple8" />
					</LogoutButton>
				</XStack>
			) : (
				<LoginButton {...loginLink}>로그인</LoginButton>
			)}
		</HeaderContainer>
	);
}
