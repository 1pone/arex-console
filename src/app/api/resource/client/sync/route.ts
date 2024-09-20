import { syncClientDownloadData } from '@/app/(home)/downloadActions'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await syncClientDownloadData()
  console.log('syncClientDownloadData GET', data)

  if (data) {
    return NextResponse.json({
      success: true,
      data,
    })
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
