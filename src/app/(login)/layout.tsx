import { Card } from '@/components/card'
import { Text } from '@/components/text'
import { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[25rem]">
        <div className="relative flex justify-center py-4">
          <div className="text ml-16 px-4 text-3xl font-bold">
            AREX
            <Text className="ml-2 inline font-semibold">Console</Text>
          </div>
        </div>
        {props.children}
      </Card>
    </div>
  )
}
