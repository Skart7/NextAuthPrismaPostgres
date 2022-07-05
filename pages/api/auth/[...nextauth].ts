import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../prisma'
import {newSession, updateSession} from '../../../utils/jwt'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        stage: { label: "stage", type: "text" }
      },
      async authorize(sign) {
        
        if(sign.stage === "signin") {
          await prisma.$connect()

          const existUser = await prisma.user.findUnique({
            where: { 
              email: sign.email,
            },
          })

          if(!existUser) {
            throw new Error("fake user")
          }

          await prisma.$disconnect()

          return existUser
        }
        if(sign.stage === "signup") {
          await prisma.$connect()

          const existUser = await prisma.user.findUnique({
            where: { 
              email: sign.email
            }
          })
          
          if(existUser) {
            throw new Error("User is already registered")
          }

          const createUser = await prisma.user.create({
            data: { name: "new-user", email: sign.email }
          }) 
          await prisma.$disconnect()
          return createUser

        }
      
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({session, token}) {      
      if(token) {
        session.accessToken = token.accessToken
        session.user = token.user
      }
      return session 
    },
    async jwt({token, user, account}) {              
      if(user && account) {
        return await newSession({user, account, token})
      }
      return await updateSession(token)
    },
  }
})