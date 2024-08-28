import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid'
import { ReactNode } from 'react'

export default function HelpTooltip(props: { title?: ReactNode }) {
  return (
    <Popover className="relative inline-flex">
      <PopoverButton className="ml-1.5 inline h-2.5 w-3 text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black dark:text-white/50 dark:data-[active]:text-white dark:data-[hover]:text-white dark:data-[focus]:outline-white">
        <QuestionMarkCircleIcon />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="right"
        className="ml-2 w-64 divide-white/5 rounded-xl bg-black/5 px-3 py-2 text-sm/4 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:bg-white/5"
      >
        {props.title}
      </PopoverPanel>
    </Popover>
  )
}
