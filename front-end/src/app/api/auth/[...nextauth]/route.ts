import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        const res = await fetch("http://localhost:3000/signin", {
          method: 'POST',
          body: JSON.stringify({user : {email, password}}),
          headers: { "Content-Type": "application/json" }
        })
        const resData = await res.json();

        const { token } = resData.data;
  
        // If no error and we have user data, return it
        if (res.ok && token) {
          return token;
        }
        // Return null if user data could not be retrieved
        return null
      },
      
    }
  )
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async({token, user}) => {
      // user is a jwt signed token, since API return a signed token

      user && (token.id = user);

      return token;
    },
    session: async ({session, token}) => {
      // token, includes  "user", "iat", "exp", and "jti"
      session.user.token = token;

      return session;
    },
    redirect: async({url, baseUrl}) => {
      return baseUrl;
    }
  }
}


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};