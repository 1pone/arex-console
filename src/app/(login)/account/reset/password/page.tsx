'use client'

import { resetPassword } from '@/app/(login)/actions'
import PasswordConfirmForm, { PasswordConfirmFormProps } from '@/app/(login)/components/password-confirm-form'
import { ErrorCode } from '@/constant'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export default function ResetPassword() {
  const searchParams = useSearchParams()

  const handleResetPassword: PasswordConfirmFormProps['action'] = async ({ password, accessToken }) => {
    const res = await resetPassword({ password, accessToken })
    if (!res?.success) res?.errorCode && toast.error(ErrorCode[res.errorCode.toString()])
  }

  return (
    <PasswordConfirmForm
      title="Reset Password"
      submitTitle={{
        normal: 'Reset',
        pending: 'Resetting...',
      }}
      accessToken={searchParams.get('token') as string}
      action={handleResetPassword}
    />
  )
}
