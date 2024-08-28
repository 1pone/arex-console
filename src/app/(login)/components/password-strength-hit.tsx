'use client'

import { Card } from '@/components/card'
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useMemo } from 'react'

const weakness = ['Empty', 'Weak', 'Medium', 'Strong', 'Very Strong', 'Super Strong']

export default function PasswordStrengthHit({ password = '' }: { password?: string }) {
  // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/_,.]).{8,}$
  const lengthRule = useMemo(() => password.length >= 8, [password])
  const lowercaseRule = useMemo(() => /(?=.*[a-z])/.test(password), [password])
  const uppercaseRule = useMemo(() => /(?=.*[A-Z])/.test(password), [password])
  const numbersRule = useMemo(() => /(?=.*?[0-9])/.test(password), [password])
  const specialCharactersRule = useMemo(() => /(?=.*?[#?!@$%^&*-/_,.])/.test(password), [password])

  const level = useMemo(
    () => [lengthRule, lowercaseRule, uppercaseRule, numbersRule, specialCharactersRule].filter(Boolean).length,
    [lengthRule, lowercaseRule, numbersRule, specialCharactersRule, uppercaseRule]
  )

  return (
    <Card className="!p-4 drop-shadow-xl">
      <StrengthBlock gist={5} level={level} />
      <div className="font-semibold">Level: {weakness[level]}</div>

      <div className="mt-2 text-zinc-600 dark:text-zinc-300 [&>div]:flex [&_svg]:h-4">
        <div className="mb-1 font-semibold">Your password must contain:</div>
        <div className={clsx(lengthRule && '!text-[--toastify-color-progress-success]')}>
          {lengthRule ? <CheckIcon /> : <XMarkIcon />}
          Minimum number of characters is 8.
        </div>
        <div className={clsx(lowercaseRule && '!text-[--toastify-color-progress-success]')}>
          {lowercaseRule ? <CheckIcon /> : <XMarkIcon />}
          Should contain lowercase.
        </div>
        <div className={clsx(uppercaseRule && '!text-[--toastify-color-progress-success]')}>
          {uppercaseRule ? <CheckIcon /> : <XMarkIcon />}
          Should contain uppercase.
        </div>
        <div className={clsx(numbersRule && '!text-[--toastify-color-progress-success]')}>
          {numbersRule ? <CheckIcon /> : <XMarkIcon />}
          Should contain numbers.
        </div>
        <div className={clsx(specialCharactersRule && '!text-[--toastify-color-progress-success]')}>
          {specialCharactersRule ? <CheckIcon /> : <XMarkIcon />}
          Should contain special characters.
        </div>
      </div>
    </Card>
  )
}

function StrengthBlock(props: { level: number; gist: number }) {
  return (
    <div className="mb-2 flex gap-x-1.5">
      {Array(props.gist)
        .fill(undefined)
        .map((_, index) => (
          <div
            key={index}
            className={clsx(
              'h-2 flex-1 rounded-full bg-zinc-600 dark:bg-zinc-300',
              index >= props.level && '!bg-zinc-300 dark:!bg-zinc-600'
            )}
          />
        ))}
    </div>
  )
}
