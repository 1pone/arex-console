export async function register() {
  try {
    const publicKey = Buffer.from(process.env.AUTH_PUBLIC_KEY as string, 'base64').toString()
    console.log('AUTH_PUBLIC_KEY', publicKey)
  } catch (e) {
    console.error('AUTH_PUBLIC_KEY is missing', e)
    process.exit(1)
  }
}
