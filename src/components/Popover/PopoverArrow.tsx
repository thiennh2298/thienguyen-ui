import React, { MutableRefObject } from "react";
import { PopoverPlacement } from "./Popover.types";

export const DEFAULT_ARROW_HEIGHT = 16;

type PopoverArrowProps = {
  placement: PopoverPlacement;
  offset: number;
};

export const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ placement, offset = 0 }, ref) => {
    const arrowStyle: React.CSSProperties = {
      height: DEFAULT_ARROW_HEIGHT + offset,
      width: DEFAULT_ARROW_HEIGHT,
      backgroundColor: "#f4f4f4",
      clipPath: `polygon(50% ${
        0.25 * DEFAULT_ARROW_HEIGHT + offset
      }px, 100% 100%, 0 100%)`,
    };

    const placementTopStyle = {
      bottom: 0,
      transform: "translateX(-50%) translateY(100%) rotate(180deg)",
    };

    const placementBottomStyle = {
      top: 0,
      transform: "translateX(-50%) translateY(-100%)",
    };

    const baseStyle: React.CSSProperties = {
      position: "absolute",
      zIndex: 50,
      left: "50%",
      ...(placement === "top" ? placementTopStyle : placementBottomStyle),
    };

    return (
      <div ref={ref} style={baseStyle}>
        <div style={arrowStyle} />
      </div>
    );
  }
);
