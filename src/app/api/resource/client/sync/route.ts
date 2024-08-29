import { fetchClientDownloadData, setClientDownloadData } from '@/app/(home)/downloadActions'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchClientDownloadData()
  if (data) {
    await setClientDownloadData(data)
    return NextResponse.json({
      success: true,
    })
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
