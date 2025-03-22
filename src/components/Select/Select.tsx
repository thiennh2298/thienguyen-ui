import { forwardRef, useCallback, useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/Popover";
import { Input, InputProps } from "../../components/Input";
import { mcn } from "../../utils/mcn";
import { SelectOption } from "./SelectOption";

export interface SelectOptionType {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<InputProps, "value" | "onChange" | "readOnly"> {
  options: SelectOptionType[];
  value?: string;
  onChange?: (value: string) => void;
}

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled,
    error,
    size = "md",
    variant = "outline",
    fullWidth,
    className,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option: SelectOptionType) => option.value === value
  );

  const handleSelect = useCallback(
    (option: SelectOptionType) => {
      onChange?.(option.value);
      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    if (inputRef.current) {
      const width = inputRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        "--select-width",
        `${width}px`
      );
    }
  }, [fullWidth]);

  return (
    <div
      ref={ref}
      className={mcn(
        "relative min-w-[200px]",
        { "w-full": fullWidth },
        className
      )}
    >
      <Popover>
        <PopoverTrigger>
          <div ref={inputRef} className="relative">
            <Input
              readOnly
              disabled={disabled}
              error={error}
              size={size}
              variant={variant}
              fullWidth={fullWidth}
              value={selectedOption?.label || ""}
              placeholder={placeholder}
              className="cursor-pointer pr-8"
              {...rest}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 min-w-[var(--select-width)]">
          <div className="py-1">
            {options.map((option) => (
              <SelectOption
                key={option.value}
                value={option.value}
                label={option.label}
                isSelected={option.value === value}
                onClick={() => handleSelect(option)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

Select.displayName = "Select";
