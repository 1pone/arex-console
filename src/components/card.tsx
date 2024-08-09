import clsx from 'clsx'
import { HTMLProps } from 'react'

export function Card(props: HTMLProps<HTMLDivElement>) {
  const { className, ...restProps } = props
  return (
    <div
      className={clsx(
        'relative rounded-xl bg-white p-6 py-8 shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] sm:p-8 lg:p-12 dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline',
        className
      )}
      {...restProps}
    >
      {props.children}
    </div>
  )
}
