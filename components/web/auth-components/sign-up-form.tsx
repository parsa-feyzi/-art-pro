"use client";

import { signUpInfo } from "@/schemas/auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import AuthInput from "@/components/web/auth-components/auth-input";
import useSignUpForm from "@/hooks/useSignUpForm";
import { successToast } from "@/lib/funcs/toast";

const url = process.env.NEXT_PUBLIC_SITE_URL;

function SignUpForm() {
  const { handleSubmit, control, reset, formState: { isSubmitting } } = useSignUpForm()

  const onSubmit = async (data: signUpInfo) => {
    try {
      const response = await axios.post(`${url}/api/users`, data);
      successToast("You Registered your account successfully!", { path: "/login" });
      reset()
      console.log(response);
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
          placeholder="exampleUserName"
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
          className="w-full mt-2 cursor-pointer active:opacity-70"
        >
          {isSubmitting ? <Spinner /> : "Sign up"}
        </Button>
      </FieldGroup>
    </form>
  );
}

export default SignUpForm;
