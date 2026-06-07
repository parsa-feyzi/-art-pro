
import AuthCard from "@/src/features/auth/components/auth-card";
import SignUpForm from "@/src/features/auth/components/sign-up-form";
import AuthFormSkeleton from "@/src/features/auth/components/skeletons/auth-form-skeleton";
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
