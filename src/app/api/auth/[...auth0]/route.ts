import { getTenantInfo, logout } from '@/app/(login)/actions'
import { ACCESS_TOKEN_KEY, authCookiesOptions } from '@/lib/auth'
import http from '@/lib/http'
import { logger } from '@/lib/logger'
import { handleAuth, handleCallback, handleLogout, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { constants, publicEncrypt } from 'node:crypto'

export const GET = handleAuth({
  callback: async (req: NextApiRequest, ctx: NextApiResponse) => {
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
                { key: process.env.CRYPTO_PRIVATE_KEY as string, padding: constants.RSA_PKCS1_PADDING },
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
              cookies().set(ACCESS_TOKEN_KEY, res.accessToken, authCookiesOptions)
              await getTenantInfo({ redirect: false })

              // const decrypted = privateDecrypt(
              //   { key: process.env.CRYPTO_PUBLIC_KEY as string, padding: constants.RSA_PKCS1_PADDING },
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
      console.error(error)
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
