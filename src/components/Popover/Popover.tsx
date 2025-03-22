import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

export type PopoverPlacement = "top" | "bottom";

interface PopoverContextType {
  isVisible: boolean;
  setIsVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  placement: PopoverPlacement;
  offset: number;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

export interface PopoverProps extends PropsWithChildren {
  placement?: PopoverPlacement;
  offset?: number;
  className?: string;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (props, ref) => {
    const {
      children,
      placement = "bottom",
      offset = 8,
      className = "",
    } = props;

    const triggerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
      <PopoverContext.Provider
        value={{
          isVisible,
          setIsVisible,
          triggerRef,
          placement,
          offset,
        }}
      >
        <div ref={ref} className="relative w-max">
          {children}
        </div>
      </PopoverContext.Provider>
    );
  }
);

Popover.displayName = "Popover";
