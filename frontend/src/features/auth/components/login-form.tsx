"use client";

import { Button } from "@/src/components/ui/button";
import { FieldGroup } from "@/src/components/ui/field";
import AuthInput from "@/src/features/auth/components/auth-input";
import useLoginForm from "@/src/features/auth/hooks/useLoginForm";
import { successToast } from "@/src/lib/funcs/toast";

function LoginForm() {
  const { handleSubmit, control, reset } = useLoginForm();

  const onSubmit = () => {
    reset();
    successToast("You logged in your account successfully!", { path: "/", await: 2500 });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <AuthInput control={control} name="email" placeholder="e@example.com" isAutoComplete />
        <AuthInput
          control={control}
          name="password"
          type="password"
          placeholder="*****"
        />
        <Button
          type="submit"
          className="w-full mt-2 cursor-pointer active:opacity-70"
        >
          Log in
        </Button>
      </FieldGroup>
    </form>
  );
}

export default LoginForm;
