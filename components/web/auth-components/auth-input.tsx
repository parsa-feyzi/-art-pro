import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginInfo, signUpInfo } from "@/schemas/auth";
import { Activity, HTMLInputTypeAttribute } from "react";
import { Control, Controller, Path } from "react-hook-form";

type FormInfo = LoginInfo | signUpInfo

interface Props<T extends FormInfo> {
  control: Control<T, unknown, T>
  name: Path<T> ;
  placeholder: string;
  type?: HTMLInputTypeAttribute ;
  label?: string
}

function AuthInput<T extends FormInfo>({ control, name, placeholder, type, label=name }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-2">
          <FieldLabel htmlFor={`form-${name}`}>{label}</FieldLabel>
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
