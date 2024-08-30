import { getTenantInfo, logout } from '@/app/(login)/actions'
import { ACCESS_TOKEN_KEY, authCookiesOptions } from '@/lib/auth'
import { logger } from '@/lib/logger'
import { handleAuth, handleCallback, handleLogout, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { createPrivateKey, createPublicKey, generateKeyPairSync, privateDecrypt, publicEncrypt } from 'node:crypto'

export const generateRSAKeyPair = () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048, // 秘钥长度

    // 秘钥配置，详见 https://nodejs.cn/dist/latest-v18.x/docs/api/crypto.html#keyobjectexportoptions
    publicKeyEncoding: {
      type: 'spki', // 编码类型
      format: 'pem', // 编码格式
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  })
  return { publicKey, privateKey }
}

const publicKey = Buffer.from(
  `-----BEGIN PUBLIC KEY-----
${process.env.CRYPTO_PUBLIC_KEY as string}
-----END PUBLIC KEY-----`,
  'utf-8'
)
const privateKey = Buffer.from(
  `-----BEGIN PRIVATE KEY-----
${process.env.CRYPTO_PRIVATE_KEY as string}
-----END PRIVATE KEY-----`,
  'utf-8'
)

export const GET = handleAuth({
  callback: async (req: NextApiRequest, ctx: NextApiResponse) => {
    try {
      // redirect(redirectUri)
      return await handleCallback(req, ctx, {
        afterCallback: async function (req: NextRequest, session: Session) {
          console.log('called after callback', session)
          if (session.user) {
            // permanentRedirect('/verify-email')
            // res.status(200).redirect('/verify-email')
            const userInfo = {
              email: session.user.email,
              createAt: Date.now(),
              providerUid: session.user.sub,
            }

            try {
              const encrypted = publicEncrypt(createPublicKey(publicKey), Buffer.from(JSON.stringify(userInfo), 'utf8'))

              console.log('encryptedBase64', encrypted.toString('base64'))
              // TODO get accessToken
              // const res = await http.post(`/api/login/oauthLogin`, {
              //   code: encrypted.toString('base64'),
              //   oauthType: 4,
              // })
              // console.log(res)
              const decrypted = privateDecrypt(createPrivateKey(privateKey), encrypted)
              console.log('decrypted: ', Buffer.from(decrypted).toString('utf-8'))
            } catch (e) {
              logger.error(String(e))
            }
            const accessToken =
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjU1MjY2ODEsInVzZXJuYW1lIjoid2FrYSJ9.9abpF0-RORhSw3vwQLTU6M8heqk9qKpeS8BVIt8Vi6U'
            cookies().set(ACCESS_TOKEN_KEY, accessToken, authCookiesOptions)
            await getTenantInfo({ redirect: false })
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
