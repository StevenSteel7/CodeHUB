import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7 , // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  user: {
    additionalFields: {
      premium: {
        type: "boolean",
        required: false,
      },
    },
    changeEmail: {
      enabled: false, // Disable email change functionality
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    openAPI(),
    admin({
      impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
    }),
  ],
  emailAndPassword: {
    enabled: true, // Enable login with email and password
    requireEmailVerification: false, // Disable email verification requirement
  },
  emailVerification: {
    sendOnSignUp: false, // Disable sending email verification on sign-up
    autoSignInAfterVerification: false, // No automatic sign-in after verification

  },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
