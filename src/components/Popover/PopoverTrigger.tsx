import { forwardRef, ReactNode, useRef } from "react";
import { usePopover, usePopoverDispatch } from "./PopoverContext";

export interface PopoverTriggerProps {
  children: ReactNode;
  className?: string;
}

export const PopoverTrigger = forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ children, className = "" }, ref) => {
    const { isVisible, triggerRef, popoverRef, arrowRef, triggerMode } =
      usePopover();
    const { setIsVisible } = usePopoverDispatch();

    const handleMouseEnter = () => {
      if (triggerMode === "hover") {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      if (triggerMode === "click") {
        setIsVisible(!isVisible);
      }
    };

    return (
      <div
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";
