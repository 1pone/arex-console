export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const fs = await import('node:fs')
    const path = await import('node:path')
    try {
      const publicKey = fs.readFileSync(path.join(process.cwd(), 'publicKey.pem'), 'utf8')
      if (!publicKey) throw new Error()
      process.env.CRYPTO_PUBLIC_KEY = publicKey
    } catch (e) {
      console.error('CRYPTO_PUBLIC_KEY is missing', e)
      process.exit(1)
    }

    try {
      process.env.CRYPTO_PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), 'privateKey.pem'), 'utf8')
    } catch (e) {}
  }
}
