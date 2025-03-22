import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Portal } from "../Portal";
import { mcn } from "../../utils/mcn";

type TooltipPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

type Position = {
  top: number;
  left: number;
};

export interface TooltipProps extends PropsWithChildren {
  triggerComponent: ReactNode;
  placement?: TooltipPlacement;
  offset?: number;
  className?: string;
  delay?: number;
  showArrow?: boolean;
  content: ReactNode;
  interactive?: boolean;
}

const ARROW_SIZE = 8;

const tooltipAnimationClasses = {
  enter:
    "transition-transform transition-opacity duration-200 ease-out opacity-100 scale-100",
  exit: "transition-transform transition-opacity duration-150 ease-in opacity-0 scale-95",
};

const tooltipBaseClasses =
  "relative bg-gray-800 text-white px-2 py-1 rounded-md text-sm shadow-lg min-w-max origin-[var(--transform-origin)]";

export const Tooltip = forwardRef((props: TooltipProps, ref: any) => {
  const {
    children,
    triggerComponent,
    placement = "top",
    offset = 8,
    className = "",
    delay = 200,
    showArrow = true,
    content,
    interactive = true,
  } = props;

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const showTimeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const totalOffset = offset + (showArrow ? ARROW_SIZE : 0);
    let newPosition = { top: 0, left: 0 };
    let newArrowPosition = { top: 0, left: 0 };

    switch (placement) {
      case "top":
        newPosition = {
          top: triggerRect.top - tooltipRect.height - totalOffset,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        };
        newArrowPosition = {
          top: tooltipRect.height,
          left: tooltipRect.width / 2 - ARROW_SIZE,
        };
        break;
      case "bottom":
        newPosition = {
          top: triggerRect.bottom + totalOffset,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        };
        newArrowPosition = {
          top: -ARROW_SIZE,
          left: tooltipRect.width / 2 - ARROW_SIZE,
        };
        break;
      case "left":
        newPosition = {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.left - tooltipRect.width - totalOffset,
        };
        newArrowPosition = {
          top: tooltipRect.height / 2 - ARROW_SIZE,
          left: tooltipRect.width,
        };
        break;
      case "right":
        newPosition = {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.right + totalOffset,
        };
        newArrowPosition = {
          top: tooltipRect.height / 2 - ARROW_SIZE,
          left: -ARROW_SIZE,
        };
        break;
      case "topLeft":
        newPosition = {
          top: triggerRect.top - tooltipRect.height - totalOffset,
          left: triggerRect.left,
        };
        newArrowPosition = {
          top: tooltipRect.height,
          left: ARROW_SIZE * 2,
        };
        break;
      case "topRight":
        newPosition = {
          top: triggerRect.top - tooltipRect.height - totalOffset,
          left: triggerRect.right - tooltipRect.width,
        };
        newArrowPosition = {
          top: tooltipRect.height,
          left: tooltipRect.width - ARROW_SIZE * 3,
        };
        break;
      case "bottomLeft":
        newPosition = {
          top: triggerRect.bottom + totalOffset,
          left: triggerRect.left,
        };
        newArrowPosition = {
          top: -ARROW_SIZE,
          left: ARROW_SIZE * 2,
        };
        break;
      case "bottomRight":
        newPosition = {
          top: triggerRect.bottom + totalOffset,
          left: triggerRect.right - tooltipRect.width,
        };
        newArrowPosition = {
          top: -ARROW_SIZE,
          left: tooltipRect.width - ARROW_SIZE * 3,
        };
        break;
    }

    // Set initial position immediately when calculating
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = "none";
      tooltipRef.current.style.opacity = "1";
    }

    setPosition(newPosition);
    setArrowPosition(newArrowPosition);
  }, [placement, offset, showArrow]);

  const clearTimeouts = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const showTooltip = () => {
    clearTimeouts();
    if (interactive) {
      setIsVisible(true);
    } else {
      showTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }
  };

  const hideTooltip = () => {
    clearTimeouts();
    if (!interactive) {
      setIsVisible(false);
    } else {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 100);
    }
  };

  const handleTooltipMouseEnter = () => {
    if (interactive) {
      clearTimeouts();
      setIsVisible(true);
    }
  };

  const handleTooltipMouseLeave = (e: React.MouseEvent) => {
    if (interactive) {
      // Check if we're moving to the trigger
      if (triggerRef.current?.contains(e.relatedTarget as Node)) {
        return;
      }
      hideTooltip();
    }
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();

      const timer = setTimeout(calculatePosition, 50);

      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", calculatePosition);
        window.removeEventListener("scroll", calculatePosition);
      };
    }
  }, [isVisible, calculatePosition]);

  useEffect(() => {
    if (!tooltipRef.current) return;

    const observer = new MutationObserver(calculatePosition);
    observer.observe(tooltipRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [calculatePosition]);

  const getArrowStyle = () => {
    const baseStyle = {
      position: "absolute",
      width: 0,
      height: 0,
      border: `${ARROW_SIZE}px solid transparent`,
      ...arrowPosition,
    } as const;

    switch (placement) {
      case "top":
      case "topLeft":
      case "topRight":
        return {
          ...baseStyle,
          borderTopColor: "currentColor",
        };
      case "bottom":
      case "bottomLeft":
      case "bottomRight":
        return {
          ...baseStyle,
          borderBottomColor: "currentColor",
        };
      case "left":
        return {
          ...baseStyle,
          borderLeftColor: "currentColor",
        };
      case "right":
        return {
          ...baseStyle,
          borderRightColor: "currentColor",
        };
      default:
        return baseStyle;
    }
  };

  const getTransformOrigin = () => {
    switch (placement) {
      case "top":
      case "topLeft":
      case "topRight":
        return "bottom";
      case "bottom":
      case "bottomLeft":
      case "bottomRight":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
      default:
        return "center";
    }
  };

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.setProperty(
        "--transform-origin",
        getTransformOrigin()
      );
    }
  }, [placement]);

  return (
    <div ref={ref} className="relative w-max">
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="w-max"
      >
        {triggerComponent}
      </div>
      <Portal
        open={isVisible}
        position={position}
        className={mcn(
          "absolute",
          {
            "pointer-events-auto": interactive,
            "pointer-events-none": !interactive,
          },
          className
        )}
        animation={{
          enter: "animate-fade-in",
          exit: "animate-fade-out",
        }}
      >
        <div
          ref={tooltipRef}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          className={mcn(
            tooltipBaseClasses,
            "transform-gpu",
            isVisible ? "visible" : "invisible"
          )}
          style={{
            visibility:
              position.top === 0 && position.left === 0 ? "hidden" : "visible",
          }}
        >
          {content || children}
          {showArrow && (
            <div style={getArrowStyle()} className="text-gray-800" />
          )}
        </div>
      </Portal>
    </div>
  );
});

Tooltip.displayName = "Tooltip";
