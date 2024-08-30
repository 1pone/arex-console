import { fetchClientDownloadData, setClientDownloadData } from '@/app/(home)/downloadActions'

export async function register() {
  // if (!process.env.CRYPTO_PRIVATE_KEY) {
  //   logger.error('CRYPTO_PRIVATE_KEY is missing')
  //   process.exit(1)
  // }
  const data = await fetchClientDownloadData()
  data && setClientDownloadData(data)
}
