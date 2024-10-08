import clsx from 'clsx'
import { HTMLProps } from 'react'

export default function GoogleIcon(props: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={clsx('flex h-4 w-4 justify-center', props.className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
        <path d="M78.5 32.8c2.5 16.6-2.3 29.5-11.3 37.6l-12.6-9.8a20.7 20.7 0 0 0 8.2-12.4H41V32.8z" fill="#4286f5" />
        <path
          d="M67.7 10.3 56.2 21.7a22 22 0 0 0-15.3-6 24 24 0 0 0-22.7 16.6L5 22a40 40 0 0 1 62.6-11.8z"
          fill="#ea4235"
        />
        <path
          d="m54.6 60.6 12.6 9.8A38.8 38.8 0 0 1 40.8 80 40 40 0 0 1 5.1 58l13-10.2a24 24 0 0 0 22.7 16.5c5.8 0 10.3-1.3 13.8-3.7z"
          fill="#34a853"
        />
        <path d="m5 22 13.2 10.2a24.7 24.7 0 0 0 0 15.6L5 57.9a40 40 0 0 1 0-35.8z" fill="#fbbc05" />
      </svg>
    </div>
  )
}
