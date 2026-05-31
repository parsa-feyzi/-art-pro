import AuthFormSkeleton from "@/components/skeleton/auth-skeletons/auth-form-skeleton";
import AuthCard from "@/components/web/auth-components/auth-card";
import SignUpForm from "@/components/web/auth-components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Sign up",
  },
  description: "Create a new account to get start",
};

function SignUpPage() {
  return (
    <AuthCard
      title="Sign up"
      description="Create a new account to get start"
      headerLink={{ title: "Log in", path: "/login" }}
      formFallback={<AuthFormSkeleton inputItems={4} />}
    >
      <SignUpForm />
    </AuthCard>
  );
}

export default SignUpPage;
