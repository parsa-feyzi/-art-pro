import LoginForm from "@/components/web/auth-components/login-form";
import { Metadata } from "next";
import AuthCard from "@/components/web/auth-components/auth-card";
import AuthFormSkeleton from "@/components/skeleton/auth-skeletons/auth-form-skeleton";

export const metadata: Metadata = {
  title: {
    absolute: "Login",
  },
  description: "Log in to your account",
};

function LoginPage() {
  return (
    <AuthCard
      title="Login"
      description="Log in to your account"
      headerLink={{ title: "Sign up", path: "/sign-up" }}
      formFallback={<AuthFormSkeleton inputItems={2} />}
    >
      <LoginForm />
    </AuthCard>
  );
}

export default LoginPage;
