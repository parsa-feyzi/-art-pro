import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginInfo } from "@/schemas/auth";
import { Activity, HTMLInputTypeAttribute } from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<LoginInfo, unknown, LoginInfo>;
  name: "email" | "password";
  placeholder: string;
  type?: HTMLInputTypeAttribute ;
}

function AuthInput({ control, name, placeholder, type }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-2">
          <FieldLabel htmlFor={`form-${name}`}>{name}</FieldLabel>
          <Input {...field} aria-invalid={fieldState.invalid} type={type} id={`form-${name}`} placeholder={placeholder} />
          <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
            <FieldError errors={[fieldState.error]} />
          </Activity>
        </Field>
      )}
    />
  );
}

export default AuthInput;
