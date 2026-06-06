import { ComponentProps } from "react";

function Box({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
    className={`border border-input rounded-xl px-6 py-5 shadow-xs ${className}`}
    {...props}
    >
      {children}
    </div>
  );
}

export default Box;
