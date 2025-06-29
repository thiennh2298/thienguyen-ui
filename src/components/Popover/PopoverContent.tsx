import {
  forwardRef,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "../Portal";
import { mcn } from "../../utils/mcn";
import { DEFAULT_ARROW_HEIGHT, PopoverArrow } from "./PopoverArrow";
import { usePopover, usePopoverDispatch } from "./PopoverContext";
import { useComposeRef } from "../../hooks/useComposeRef";

export interface PopoverContentProps extends React.PropsWithChildren {
  className?: string;
  title?: ReactNode;
}

const popoverBaseClasses =
  "bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] max-w-sm pointer-events-auto";

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (props, ref) => {
    const { children, className = "", title } = props;
    const {
      isVisible,
      showArrow,
      triggerRef,
      arrowRef,
      popoverRef,
      placement,
      offset,
    } = usePopover();
    const { setIsVisible } = usePopoverDispatch();
    const mergedPopoverRef = useComposeRef(ref, popoverRef);

    const [position, setPosition] = useState({ top: 0, left: 0 });

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) {
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const totalOffset = offset + (showArrow ? DEFAULT_ARROW_HEIGHT : 0);
      let top = 0;
      let left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;

      if (placement === "bottom") {
        top = triggerRect.bottom + totalOffset;
        if (top + popoverRect.height > viewportHeight) {
          top = triggerRect.top - popoverRect.height - totalOffset;
        }
      } else {
        top = triggerRect.top - popoverRect.height - totalOffset;
        if (top < 0) {
          top = triggerRect.bottom + totalOffset;
        }
      }

      // Ensure popover stays within viewport
      if (left < 0) left = 0;
      if (left + popoverRect.width > viewportWidth) {
        left = viewportWidth - popoverRect.width;
      }

      setPosition({ top, left });
    }, [placement, offset, showArrow]);

    useLayoutEffect(() => {
      if (isVisible && popoverRef.current) {
        calculatePosition();
      }
    }, [isVisible, calculatePosition, popoverRef]);

    useEffect(() => {
      if (!isVisible) return;
      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);

      return () => {
        window.removeEventListener("resize", calculatePosition);
        window.removeEventListener("scroll", calculatePosition);
      };
    }, [isVisible, calculatePosition]);

    const content = (
      <div
        role="dialog"
        ref={mergedPopoverRef}
        className={mcn(popoverBaseClasses, "transform-gpu", className)}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
          pointerEvents: isVisible ? "auto" : "none",
          position: "fixed",
          top: position.top,
          left: position.left,
          zIndex: 50,
        }}
      >
        {title && (
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="font-medium">{title}</div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-500"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {showArrow && (
          <PopoverArrow ref={arrowRef} placement={placement} offset={offset} />
        )}
        <div className="p-4">{children}</div>
      </div>
    );

    return <Portal open={isVisible}>{content}</Portal>;
  }
);

PopoverContent.displayName = "PopoverContent";
