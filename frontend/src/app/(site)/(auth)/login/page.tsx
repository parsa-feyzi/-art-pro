import AuthCard from "@/src/features/auth/components/auth-card";
import LoginForm from "@/src/features/auth/components/login-form";
import AuthFormSkeleton from "@/src/features/auth/components/skeletons/auth-form-skeleton";
import { Metadata } from "next";

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
