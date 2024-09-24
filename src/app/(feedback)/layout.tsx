import { Card } from '@/components/card'
import { PropsWithChildren, Suspense } from 'react'

export default function FeedbackLayout(props: PropsWithChildren) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="m-8 flex justify-center pt-12">
        <Card>
          <div className="flex flex-col items-center gap-y-4 !text-base [&_svg]:w-16">{props.children}</div>
        </Card>
      </div>
    </Suspense>
  )
}
