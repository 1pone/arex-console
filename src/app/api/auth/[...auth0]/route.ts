import { getTenantInfo, logout } from '@/app/(login)/actions'
import { ACCESS_TOKEN_KEY, authCookiesOptions, NEED_BIND_KEY } from '@/lib/auth'
import http from '@/lib/http'
import { logger } from '@/lib/logger'
import {
  AppRouteHandlerFnContext,
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
  Session,
} from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { constants, publicEncrypt } from 'node:crypto'

export const GET = handleAuth({
  login: (req: NextRequest, ctx: AppRouteHandlerFnContext) =>
    handleLogin(req, ctx, {
      authorizationParams: {
        prompt: 'select_account',
        max_age: 0,
      },
    }),
  callback: async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
    try {
      return await handleCallback(req, ctx, {
        afterCallback: async function (req: NextRequest, session: Session) {
          if (session.user) {
            const userInfo = {
              email: session.user.email,
              createdAt: Date.now(),
              providerUid: session.user.sub,
            }

            try {
              const encrypted = publicEncrypt(
                {
                  key: Buffer.from(process.env.AUTH_PUBLIC_KEY as string, 'base64').toString() as string,
                  padding: constants.RSA_PKCS1_PADDING,
                },
                Buffer.from(JSON.stringify(userInfo), 'utf8')
              )

              const res = await http.post<{
                success: boolean
                errorCode: number
                accessToken: string
                needBind: boolean
                email: string
              }>(`/api/login/oauthLogin`, {
                code: encrypted.toString('base64'),
                oauthType: 4,
              })

              console.log('login/oauthLogin', res)
              cookies().set(ACCESS_TOKEN_KEY, res.accessToken, authCookiesOptions)
              if (res.needBind) {
                cookies().set(NEED_BIND_KEY, String(res.needBind), authCookiesOptions)
              } else {
                await getTenantInfo({ redirect: false })
              }

              // const decrypted = privateDecrypt(
              //   { key: process.env.CRYPTO_PRIVATE_KEY as string, padding: constants.RSA_PKCS1_PADDING },
              //   encrypted
              // )
              // console.log('decrypted: ', Buffer.from(decrypted).toString('utf-8'))
            } catch (e) {
              logger.error(String(e))
            }
          } else {
            console.error('user not found', session)
          }
          return session
        },
      })
    } catch (error) {
      // 捕获特定的错误并重定向
      console.error('Email not verified', error)
      return NextResponse.redirect(
        `${req.headers.get('x-forwarded-proto')}://${req.headers.get('x-forwarded-host')}/signup/verify-email`
      )
    }
  },
  logout: async (req: NextApiRequest, ctx: NextApiResponse) => {
    try {
      const res = await handleLogout(req, ctx)
      logger.info('logout', req)
      await logout({ redirect: false })
      return res
    } catch (error) {
      console.error(error)
    }
  },
})
