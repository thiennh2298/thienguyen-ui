import { ReactNode, forwardRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { mcn } from "../../utils/mcn";

export type TooltipTrigger = "hover" | "click";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom";
  offset?: number;
  className?: string;
  trigger?: TooltipTrigger;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      placement = "top",
      offset = 0,
      className = "",
      trigger = "hover",
    },
    ref
  ) => {
    return (
      <Popover placement={placement} offset={offset} trigger={trigger}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          className={mcn("text-sm px-2 py-1 rounded shadow-lg", className)}
        >
          {content}
        </PopoverContent>
      </Popover>
    );
  }
);

Tooltip.displayName = "Tooltip";
