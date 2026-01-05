import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/web/auth-components/login-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "login",
  description: "login page",
};

function Login() {
  return (
    <Card className="w-[90vw] sm:w-sm max-w-sm ">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Create a account to get start</CardDescription>
        <CardAction>
          <Link
            href="sign-up"
            className={`${buttonVariants({
              variant: "secondary",
              size: "sm",
            })} text-xs!`}
          >
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

export default Login;
