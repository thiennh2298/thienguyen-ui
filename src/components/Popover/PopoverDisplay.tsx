import { forwardRef, PropsWithChildren, useCallback, useEffect } from "react";
import { usePopover, usePopoverDispatch } from "./PopoverContext";

type Props = PropsWithChildren & {
  className?: string;
};

export const PopoverDisplay = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    const { isVisible, triggerMode, triggerRef, arrowRef, popoverRef } =
      usePopover();
    const { setIsVisible } = usePopoverDispatch();

    const handleMouseMove = useCallback(
      (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          [popoverRef.current, triggerRef.current, arrowRef.current].every(
            (ref) => !ref?.contains(target)
          )
        ) {
          setIsVisible(false);
        }
      },
      [setIsVisible]
    );

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          [popoverRef.current, triggerRef.current].every(
            (ref) => !!ref && !ref.contains(event.target as Node)
          )
        ) {
          setIsVisible(false);
        }
      },
      [setIsVisible]
    );

    useEffect(() => {
      if (isVisible && triggerMode === "hover") {
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
        };
      }
      if (isVisible && triggerMode === "click") {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isVisible, triggerMode]);

    return (
      <div ref={ref} className={`relative w-max ${className}`}>
        {children}
      </div>
    );
  }
);
