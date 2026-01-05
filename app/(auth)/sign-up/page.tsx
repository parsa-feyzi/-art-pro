import AuthCard from '@/components/web/auth-components/auth-card'
import SignUpForm from '@/components/web/auth-components/sign-up-form'

function SignUp() {
  return (
    <AuthCard title='Sign up' description='Create a account to get start' headerLink={{ title: "Log in", path: "/login" }}>
      <SignUpForm />
    </AuthCard>
  )
}

export default SignUp

