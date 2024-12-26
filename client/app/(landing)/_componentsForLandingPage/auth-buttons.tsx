"use client";

import { authClient } from "@/auth-client";
import Link from "next/link";
import SignoutButton from "@/app/(landing)/_componentsForLandingPage/signout-button";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/app/(landing)/_componentsForLandingPage/theme-toggle";

export default function AuthButtons() {
	const { data: session } = authClient.useSession();

	return !session ? (
		<div className="flex gap-2 justify-center">
			<Link href="/sign-in">
				<Button>Sign In</Button>
			</Link>
			<Link href="/sign-up">
				<Button>Sign Up</Button>
			</Link>
			<ThemeToggle />
		</div>
	) : (
		<div className="flex items-center gap-2">
			<SignoutButton />
		</div>
	);
}
