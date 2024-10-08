import { getClientDownloadData } from '@/app/(home)/downloadActions'
import { NextResponse } from 'next/server'

export async function GET() {
  const resource = await getClientDownloadData()
  console.log('getClientDownloadData GET', resource)

  if (resource) {
    return NextResponse.json({
      success: true,
      data: resource,
    })
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
