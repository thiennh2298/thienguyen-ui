import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "../Portal";
import { mcn } from "../../utils/mcn";
import { usePopover } from "./Popover";

export interface PopoverContentProps extends React.PropsWithChildren {
  className?: string;
  title?: ReactNode;
  footer?: ReactNode;
}

const popoverBaseClasses =
  "bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] max-w-sm";

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (props, ref) => {
    const { children, className = "", title, footer } = props;
    const { isVisible, setIsVisible, triggerRef, placement, offset } =
      usePopover();
    const popoverRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let newPlacement = placement;
      let top = 0;
      const left =
        triggerRect.left + (triggerRect.width - popoverRect.width) / 2;

      if (placement === "bottom") {
        top = triggerRect.bottom + offset;
        if (top + popoverRect.height > viewportHeight) {
          newPlacement = "top";
          top = triggerRect.top - popoverRect.height - offset;
        }
      }

      if (placement === "top") {
        top = triggerRect.top - popoverRect.height - offset;
        if (top < 0) {
          newPlacement = "bottom";
          top = triggerRect.bottom + offset;
        }
      }

      setPosition({ top, left });
    }, [placement, offset]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }, []);

    useEffect(() => {
      if (isVisible) {
        calculatePosition();
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", calculatePosition);
        window.addEventListener("scroll", calculatePosition);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          window.removeEventListener("resize", calculatePosition);
          window.removeEventListener("scroll", calculatePosition);
        };
      }
    }, [isVisible, calculatePosition, handleClickOutside]);

    if (!isVisible) return null;

    return (
      <Portal
        open={isVisible}
        position={position}
        className={mcn("absolute", className)}
      >
        <div
          ref={popoverRef}
          className={mcn(
            popoverBaseClasses,
            "transform-gpu relative",
            isVisible ? "visible" : "invisible"
          )}
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
          <div className="p-4">{children}</div>
          {footer && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </Portal>
    );
  }
);

PopoverContent.displayName = "PopoverContent";
