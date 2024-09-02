'use client'

import { Card } from '@/components/card'
import { Text } from '@/components/text'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function Error() {
  return (
    <div className="m-8 flex justify-center pt-12">
      <Card>
        <Text className="flex flex-col items-center gap-y-4 !text-base [&>svg]:w-16">
          <ExclamationCircleIcon className="w-16" />
          Oops, something went wrong
        </Text>
      </Card>
    </div>
  )
}
