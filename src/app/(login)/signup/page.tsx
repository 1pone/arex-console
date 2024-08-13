import { Button } from '@/components/button'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Text } from '@/components/text'

export default function Signup() {
  return (
    <form action={'/api/signup/password'} className="w-full max-w-sm space-y-8">
      <Field>
        <FieldGroup>
          <Legend className="">Sign Up</Legend>
          <Field>
            <Label>Email</Label>
            <Input required name="email" type="email" />
          </Field>

          <Button type="submit" className="w-full">
            Next
          </Button>
          <div className="flex gap-1">
            <Text>Already have an account?</Text>
            <Link href="/login" className="font-semibold">
              Sign in
            </Link>
          </div>
        </FieldGroup>
      </Field>
    </form>
  )
}
