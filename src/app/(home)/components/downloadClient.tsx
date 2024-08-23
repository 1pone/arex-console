import { getClientDownloadData } from '@/app/(home)/downloadActions'
import { Text, TextLink } from '@/components/text'
import arexLogo from '@/images/logo.png'
import Image from 'next/image'
import { DownloadButton } from './downloadButton'

export default async function DownloadClient() {
  const clientDownloadData = await getClientDownloadData()

  return (
    <div className="flex flex-col justify-around p-4 sm:flex-row">
      <div className="mb-4 flex sm:block">
        <Image src={arexLogo} alt="arex-logo" width={128} height={128} className="drop-shadow-xl" />
        <div className="p-4">
          <Text>Version: {clientDownloadData?.tag_name}</Text>
          <Text>Release date: {new Date(clientDownloadData?.published_at).toLocaleDateString()} </Text>
          <TextLink href={clientDownloadData?.html_url || '#'} target="_blank">
            Release notes ➚
          </TextLink>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-1 flex-col justify-center">
          <DownloadButton assets={clientDownloadData?.assets} />
          <TextLink href="https://github.com/arextest/releases/releases" target="_blank" className="ml-auto">
            History versions
          </TextLink>
        </div>
      </div>
    </div>
  )
}
