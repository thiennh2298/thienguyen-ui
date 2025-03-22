import { forwardRef } from "react";
import { usePopover } from "./Popover";

export const PopoverTrigger = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren
>((props, ref) => {
  const { children } = props;
  const { setIsVisible, triggerRef } = usePopover();

  const togglePopover = () => {
    setIsVisible((prev: boolean) => !prev);
  };

  return (
    <div
      ref={triggerRef}
      onClick={togglePopover}
      className="w-max cursor-pointer"
    >
      {children}
    </div>
  );
});

PopoverTrigger.displayName = "PopoverTrigger";
