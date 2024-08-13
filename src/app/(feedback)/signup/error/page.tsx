import { Button } from '@/components/button'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function Error() {
  // const [, startTransition] = useTransition()
  //
  // useEffect(() => {
  //   const timeout = setTimeout(
  //     () =>
  //       // https://github.com/vercel/next.js/issues/59489
  //       startTransition(() => redirect('/signup')),
  //     3000
  //   )
  //   return () => clearTimeout(timeout)
  // }, [])

  return (
    <>
      <ExclamationCircleIcon />
      Oops, Sign up failed, please try again...
      <Button href="/signup" className="mt-8">
        Back to Signup
      </Button>
    </>
  )
}
