import Link from 'next/link'

export default function Login() {
  return (
    <>
      <h1>Sign Up</h1>
      <span>already have account</span> <Link href="/login">Sign In</Link>
    </>
  )
}
