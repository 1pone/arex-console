'use server'
import { GlobalRef } from '@/lib/globalRef'

export type UrlAsset = {
  url: string
  id: number
  node_id: string
  name: string
  label: string
  uploader: object
  content_type: string
  state: string
  size: number
  download_count: number
  created_at: string
  updated_at: string
  browser_download_url: string
}

export type ClientDownloadUrlData = {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  author: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  assets: UrlAsset[]
  tarball_url: string
  zipball_url: string
  body: string
}

async function fetchClientDownloadData() {
  try {
    const latest = await fetch(
      `https://api.github.com/repos/arextest/releases/releases/latest?access_token=${process.env.GH_TOKEN}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GH_TOKEN}`,
        },
      }
    )
    const data: ClientDownloadUrlData = await latest.json()
    console.log('fetchClientDownloadData', data)
    return data
  } catch (e) {
    console.error(String(e))
  }
}

const clientDownloadData = new GlobalRef<ClientDownloadUrlData | undefined>('clientDownloadData')

export async function syncClientDownloadData() {
  clientDownloadData.value = await fetchClientDownloadData()
  return clientDownloadData.value
}

export async function getClientDownloadData(): Promise<ClientDownloadUrlData | undefined> {
  if (!clientDownloadData.value) return await syncClientDownloadData()
  return clientDownloadData.value
}
