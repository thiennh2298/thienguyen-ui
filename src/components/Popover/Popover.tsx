import { forwardRef, PropsWithChildren } from "react";
import { PopoverProvider } from "./PopoverContext";
import { PopoverPlacement, TriggerMode } from "./Popover.types";
import { PopoverDisplay } from "./PopoverDisplay";

export interface PopoverProps extends PropsWithChildren {
  placement?: PopoverPlacement;
  offset?: number;
  className?: string;
  defaultOpen?: boolean;
  showArrow?: boolean;
  trigger?: TriggerMode;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <PopoverProvider {...props}>
        <PopoverDisplay ref={ref} className={className}>
          {children}
        </PopoverDisplay>
      </PopoverProvider>
    );
  }
);

Popover.displayName = "Popover";
