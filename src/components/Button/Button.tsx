import React from "react";
import { ButtonProps, buttonVariants } from "./Button.types";
import { mcn } from "../../utils/mcn";
import { withLoading } from "./withLoading";

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={mcn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export const Button = withLoading(BaseButton);
Button.displayName = "Button";
