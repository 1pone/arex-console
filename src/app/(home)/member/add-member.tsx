'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { ErrorCode } from '@/constant'
import { UserPlusIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { addMember } from '../actions'

export default function AddMember() {
  const [open, setOpen] = useState(false)
  const { refresh } = useRouter()

  const handleAddMember = async (formData: FormData) => {
    const { success, errorCode } = await addMember(formData.get('email') as string)
    if (success) {
      toast.success('Add successfully')
      setOpen(false)
      refresh()
    } else {
      toast.error(ErrorCode[String(errorCode)])
    }
  }
  return (
    <div>
      <Button className="-my-0.5" onClick={() => setOpen(true)}>
        <UserPlusIcon />
        Add member
      </Button>
      <Dialog open={open} onClose={setOpen}>
        <form>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Please enter the e-mail address of the invitee</DialogDescription>
          <DialogBody>
            <Field>
              <Label>Email</Label>
              <Input required name="email" type="email" />
            </Field>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" formAction={handleAddMember}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
