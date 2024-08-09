import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { HTMLProps, ReactNode } from 'react'

function LinkWrapper(props: Partial<LinkProps & HTMLProps<HTMLDivElement>>) {
  return props.href ? (
    <div
      className={clsx(
        'rounded-lg hover:cursor-pointer hover:bg-zinc-950/5 active:bg-zinc-950/5 dark:hover:bg-white/10 dark:active:bg-white/10',
        props.className
      )}
    >
      <Link {...(props as LinkProps)} className="" />
    </div>
  ) : (
    <div {...props} />
  )
}

export default function Stat({
  title,
  value,
  href,
  change,
}: {
  title: ReactNode
  value: ReactNode
  href?: string
  change?: string
}) {
  return (
    <div>
      <Divider />
      <LinkWrapper href={href} className="mt-4 flex flex-col p-4">
        <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
        {change && (
          <div className="mt-3 text-sm/6 sm:text-xs/6">
            <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
            <span className="text-zinc-500">from last week</span>
          </div>
        )}
      </LinkWrapper>
    </div>
  )
}
