import { forwardRef } from "react";
import { mcn } from "../../utils/mcn";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-3 text-lg",
};

const variantClasses: Record<InputVariant, string> = {
  outline: "bg-white border border-gray-300 focus:border-blue-500",
  filled:
    "bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500",
};

const baseClasses =
  "rounded-md outline-none transition-colors duration-200 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    error,
    size = "md",
    variant = "outline",
    fullWidth,
    disabled,
    ...rest
  } = props;

  return (
    <input
      ref={ref}
      disabled={disabled}
      className={mcn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        {
          "w-full": fullWidth,
          "border-red-500 focus:border-red-500": error,
          "hover:border-gray-400": variant === "outline" && !error && !disabled,
          "hover:bg-gray-200": variant === "filled" && !disabled,
        },
        className
      )}
      {...rest}
    />
  );
});

Input.displayName = "Input";
