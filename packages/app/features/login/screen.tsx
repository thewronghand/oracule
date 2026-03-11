import type { Provider } from "@supabase/supabase-js";
import { useState } from "react";
import { H2, Paragraph, XStack, YStack, Text, styled, Spinner } from "tamagui";
import { OraculeButton } from "@t4/ui/src/Button";
import { useSupabase } from "app/utils/supabase/hooks/useSupabase";
import { useRouter } from "solito/router";
import { Star, Sparkles } from "@tamagui/lucide-icons";

const BrandButton = styled(YStack, {
	borderRadius: "$4",
	paddingVertical: "$3",
	paddingHorizontal: "$5",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	pressStyle: { opacity: 0.8, scale: 0.98 },
	variants: {
		provider: {
			kakao: {
				backgroundColor: "#FEE500",
			},
			google: {
				backgroundColor: "#FFFFFF",
				borderWidth: 1,
				borderColor: "$gray6",
			},
		},
	} as const,
});

export function LoginScreen() {
	const { replace } = useRouter();
	const supabase = useSupabase();
	const [loading, setLoading] = useState<Provider | null>(null);

	const handleOAuthSignIn = async (provider: Provider) => {
		setLoading(provider);
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
			},
		});

		if (error) {
			console.error(`[OAuth] ${provider} 로그인 실패:`, error.message);
			setLoading(null);
		}
	};

	return (
		<YStack
			flex={1}
			justifyContent="center"
			alignItems="center"
			padding="$6"
			backgroundColor="$background"
			gap="$6"
		>
			{/* 헤더 */}
			<YStack alignItems="center" gap="$3">
				<XStack alignItems="center" gap="$2" opacity={0.8}>
					<Sparkles size={16} color="#c4b5fd" />
					<Text fontSize="$2" color="$purple8" letterSpacing={3} fontWeight="500">
						WELCOME
					</Text>
					<Sparkles size={16} color="#c4b5fd" />
				</XStack>

				<H2
					textAlign="center"
					fontSize="$9"
					fontWeight="700"
					letterSpacing={2}
					color="$purple10"
				>
					Oracule
				</H2>

				<Paragraph
					textAlign="center"
					size="$4"
					color="$purple7"
					opacity={0.85}
				>
					로그인하고 나만의 타로 기록을 시작하세요
				</Paragraph>
			</YStack>

			{/* 구분선 */}
			<XStack alignItems="center" gap="$3" width={260} justifyContent="center">
				<YStack flex={1} height={1} backgroundColor="$purple6" opacity={0.4} />
				<Star size={12} color="#a78bfa" />
				<YStack flex={1} height={1} backgroundColor="$purple6" opacity={0.4} />
			</XStack>

			{/* 소셜 로그인 버튼 */}
			<YStack gap="$3" width="100%" maxWidth={320}>
				{/* 카카오 로그인 */}
				<BrandButton
					provider="kakao"
					onPress={() => handleOAuthSignIn("kakao")}
					opacity={loading && loading !== "kakao" ? 0.5 : 1}
					disabled={!!loading}
				>
					<XStack alignItems="center" gap="$2">
						{loading === "kakao" ? (
							<Spinner size="small" color="#191919" />
						) : (
							<Text fontSize={18}>💬</Text>
						)}
						<Text fontSize="$4" fontWeight="600" color="#191919">
							카카오로 시작하기
						</Text>
					</XStack>
				</BrandButton>

				{/* Google 로그인 */}
				<BrandButton
					provider="google"
					onPress={() => handleOAuthSignIn("google")}
					opacity={loading && loading !== "google" ? 0.5 : 1}
					disabled={!!loading}
				>
					<XStack alignItems="center" gap="$2">
						{loading === "google" ? (
							<Spinner size="small" color="#444" />
						) : (
							<Text fontSize={18}>G</Text>
						)}
						<Text fontSize="$4" fontWeight="600" color="$gray12">
							Google로 시작하기
						</Text>
					</XStack>
				</BrandButton>
			</YStack>

			{/* 비로그인 안내 */}
			<YStack alignItems="center" gap="$2" marginTop="$2">
				<OraculeButton
					variant="ghost"
					onPress={() => replace("/")}
				>
					<Text color="$purple7" fontSize="$3">
						로그인 없이 둘러보기
					</Text>
				</OraculeButton>
			</YStack>
		</YStack>
	);
}
