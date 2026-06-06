"use client";

import axios from "axios";
import { Button } from "@/src/components/ui/button";
import { FieldGroup } from "@/src/components/ui/field";
import { Spinner } from "@/src/components/ui/spinner";
import AuthInput from "@/src/features/auth/components/auth-input";
import useSignUpForm from "@/src/features/auth/hooks/useSignUpForm";
import { successToast } from "@/src/lib/funcs/toast";
import { SignUpInfo } from "@/src/lib/types";
import { useAuthContext } from "@/src/features/auth/context/auth-context";

const url = process.env.NEXT_PUBLIC_SITE_URL;

function SignUpForm() {
  const { handleSubmit, control, reset, formState: { isSubmitting }} = useSignUpForm()
  const { setIsLogin } = useAuthContext();

  const onSubmit = async (data: SignUpInfo) => {
    try {
      const response = await axios.post(`${url}/api/register`, data);
      setIsLogin(true)
      successToast("You Registered your account successfully!", { path: "/" });
      reset()
      console.log(response.data);
    } catch (error) {
      console.log(error, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <AuthInput
          control={control}
          name="userName"
          label="user name"
          placeholder="your name"
        />
        <AuthInput control={control} name="email" placeholder="e@example.com" />
        <AuthInput
          control={control}
          name="password"
          type="password"
          placeholder="*****"
        />
        <AuthInput
          control={control}
          name="confirmPassword"
          type="password"
          label="confirm password"
          placeholder="*****"
        />
        <Button
          type="submit"
          className={`${isSubmitting ? "opacity-50" : "active:opacity-70 cursor-pointer"} w-full mt-2`}
        >
          {isSubmitting ? <Spinner /> : "Sign up"}
        </Button>
      </FieldGroup>
    </form>
  );
}

export default SignUpForm;
