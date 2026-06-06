import { Field, FieldError, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { LoginInfo, SignUpInfo } from "@/src/lib/types";
import { Activity, HTMLInputTypeAttribute } from "react";
import { Control, Controller, Path } from "react-hook-form";

type FormInfo = LoginInfo | SignUpInfo

interface Props<T extends FormInfo> {
  control: Control<T, unknown, T>
  name: Path<T>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  label?: string
  isAutoComplete?: boolean
}

function AuthInput<T extends FormInfo>({ control, name, placeholder, type, label = name, isAutoComplete }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-2">
          <FieldLabel htmlFor={`form-${name}`}>{label}</FieldLabel>
          <Input {...field} aria-invalid={fieldState.invalid} type={type} id={`form-${name}`} placeholder={placeholder} autoComplete={isAutoComplete ? "on" : "off"} />
          <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
            <FieldError errors={[fieldState.error]} />
          </Activity>
        </Field>
      )}
    />
  );
}

export default AuthInput;
