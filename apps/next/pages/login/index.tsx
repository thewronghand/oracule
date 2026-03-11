import { LoginScreen } from "app/features/login/screen";
import Head from "next/head";

export default function Page() {
	return (
		<>
			<Head>
				<title>로그인 — Oracule</title>
			</Head>
			<LoginScreen />
		</>
	);
}
