import { Card } from '@/components/card'
import { Text } from '@/components/text'
import { PropsWithChildren } from 'react'

export default function FeedbackLayout(props: PropsWithChildren) {
  return (
    <div className="m-8 flex justify-center pt-12">
      <Card>
        <Text className="flex flex-col items-center gap-y-2 !text-base">{props.children}</Text>
      </Card>
    </div>
  )
}
