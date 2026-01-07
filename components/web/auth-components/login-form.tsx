"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import AuthInput from "@/components/web/auth-components/auth-input";
import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function LoginForm() {
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = () => {
    reset();
    toast.success("You logged in your account successfully!", {
      style: {
        borderRadius: "10px",
        background: "#77777737",
        color: "#fff",
      },
    });
    setTimeout(() => {
      router.replace("/");
    }, 2500);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <AuthInput control={control} name="email" placeholder="e@example.com" />
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
