"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import AuthInput from "@/components/web/auth-components/auth-input";
import { signUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function SignUpForm() {
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = () => {
    reset();
    toast.success("You Registered your account successfully!", {
      style: {
        borderRadius: "10px",
        background: "#77777737",
        color: "#fff",
      },
    });
    setTimeout(() => {
      router.replace("/login");
    }, 3000);
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
          Sign up
        </Button>
      </FieldGroup>
    </form>
  );
}

export default SignUpForm;
