'use client'

import { Button, ButtonProps } from '@/components/button'
import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

export interface SubmitButtonProps extends Omit<ButtonProps, 'title' | 'children'> {
  title:
    | string
    | {
        normal: string
        pending: string
      }
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { title, className, ...restProps } = props
  const { pending } = useFormStatus()
  return (
    <Button
      {...restProps}
      type="submit"
      className={clsx(className, '!mt-8 w-full')}
      // @ts-ignore
      disabled={pending}
    >
      {typeof title === 'string' ? title : pending ? title.pending : title.normal}
    </Button>
  )
}
