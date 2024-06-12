import GoogleProvider from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/login",
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),

    Facebook({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET ?? "",
    }),

    LinkedInProvider({
      clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET ?? "",
      client: { token_endpoint_auth_method: "client_secret_post" },
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: { scope: "openid profile email" },
      },
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile: LinkedInProfile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure the user is redirected to the correct URL
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};
