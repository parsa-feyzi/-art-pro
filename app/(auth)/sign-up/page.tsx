import AuthCard from '@/components/web/auth-components/auth-card'
import SignUpForm from '@/components/web/auth-components/sign-up-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "sign up", 
  description: "Create a account to get start"
}

function SignUp() {
  return (
    <AuthCard title='Sign up' description='Create a account to get start' headerLink={{ title: "Log in", path: "/login" }}>
      <SignUpForm />
    </AuthCard>
  )
}

export default SignUp

