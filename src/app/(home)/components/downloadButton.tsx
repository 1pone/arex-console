'use client'

import { UrlAsset } from '@/app/(home)/downloadActions'
import { Button } from '@/components/button'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useMemo, useState } from 'react'

type DownloadButtonProps = {
  assets?: UrlAsset[]
}

enum Arch {
  MacOSArm64,
  MacOSX64,
  WindowsX64,
}

const ArchMap = {
  [Arch.WindowsX64]: '.exe (Windows)',
  [Arch.MacOSArm64]: '.dmg (Apple Silicon)',
  [Arch.MacOSX64]: '.dmg (Inter)',
}

export function DownloadButton(props: DownloadButtonProps) {
  const [arch, setArch] = useState(Arch.WindowsX64)

  async function detectArch() {
    const arch: { architecture: string; platform: string; mobile: boolean } =
      // @ts-ignore
      await navigator.userAgentData.getHighEntropyValues(['architecture'])
    if (arch.platform === 'macOS') setArch(arch.architecture === 'arm' ? Arch.MacOSArm64 : Arch.MacOSX64)
    else setArch(Arch.WindowsX64)
  }

  useEffect(() => {
    detectArch()
  }, [])

  const executableFile = useMemo(
    () =>
      props.assets
        ?.filter((asset) => asset.name.endsWith('.dmg') || asset.name.endsWith('.exe'))
        .map((asset) => {
          const option = asset.name.endsWith('.exe')
            ? {
                title: ArchMap[Arch.WindowsX64],
                arch_type: Arch.WindowsX64,
              }
            : asset.name.includes('arm64')
              ? {
                  title: ArchMap[Arch.MacOSArm64],
                  arch_type: Arch.MacOSArm64,
                }
              : {
                  title: ArchMap[Arch.MacOSX64],
                  arch_type: Arch.MacOSX64,
                }

          return {
            ...asset,
            ...option,
          }
        }),
    [props.assets]
  )

  function handleDownloadClient() {
    const downloadUrl = executableFile?.find((file) => file.arch_type === arch)?.browser_download_url
    if (downloadUrl) window.open(downloadUrl, '_black')
  }

  return (
    <form action={handleDownloadClient}>
      <div className="dropdown-button flex items-center justify-center py-4">
        <Button type="submit" className="h-12 !rounded-r-none border-r-2 border-white pl-6 text-base">
          Download
        </Button>

        <Dropdown>
          <DropdownButton className="flex h-12 w-48 justify-between !rounded-l-none pl-2 pr-4">
            <div className="px-1">{ArchMap[arch]}</div>
            <ChevronDownIcon />
          </DropdownButton>

          <DropdownMenu transition className="filter backdrop-blur-md">
            {executableFile?.map((file) => (
              <DropdownItem key={file.id}>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg px-1 py-1 data-[focus]:bg-white/10"
                  onClick={() => setArch(file.arch_type)}
                >
                  {file.title}
                </button>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </form>
  )
}
