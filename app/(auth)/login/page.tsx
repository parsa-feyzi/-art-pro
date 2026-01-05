import LoginForm from "@/components/web/auth-components/login-form";
import { Metadata } from "next";
import AuthCard from "@/components/web/auth-components/auth-card";

export const metadata: Metadata = {
  title: "login",
  description: "login page",
};

function Login() {
  return (
    <AuthCard
      title="Login"
      description="Log in to your account"
      headerLink={{ title: "Sign up", path: "/sign-up" }}
    >
      <LoginForm />
    </AuthCard>
  );
}

export default Login;
