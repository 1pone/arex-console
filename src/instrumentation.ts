import { fetchClientDownloadData, setClientDownloadData } from '@/app/(home)/downloadActions'

export async function register() {
  const data = await fetchClientDownloadData()
  setClientDownloadData(data)
}
