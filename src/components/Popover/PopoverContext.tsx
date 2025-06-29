import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useReducer,
  useRef,
} from "react";
import { PopoverPlacement, TriggerMode } from "./Popover.types";
import { PopoverProps } from "./Popover";

export interface PopoverContextType {
  isVisible: boolean;
  showArrow: boolean;
  triggerRef: MutableRefObject<HTMLDivElement | null>;
  popoverRef: MutableRefObject<HTMLDivElement | null>;
  arrowRef: MutableRefObject<HTMLDivElement | null>;
  placement: PopoverPlacement;
  offset: number;
  triggerMode: "click" | "hover";
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

// reducer
type ValueOf<T, K extends keyof T> = T[K];
type PopoverActionTypeMap = {
  CHANGE_TRIGGER_MODE: "triggerMode";
  SET_IS_VISIBLE: "isVisible";
};

type PopoverAction = {
  [K in keyof PopoverActionTypeMap]: {
    type: K;
    payload: ValueOf<PopoverContextType, PopoverActionTypeMap[K]>;
  };
}[keyof PopoverActionTypeMap];

const popoverReducer = (
  state: PopoverContextType,
  action: PopoverAction
): PopoverContextType => {
  switch (action.type) {
    case "CHANGE_TRIGGER_MODE":
      return { ...state, triggerMode: action.payload };
    case "SET_IS_VISIBLE":
      return { ...state, isVisible: action.payload };
    default:
      return state;
  }
};

const PopoverDispatchContext =
  createContext<React.Dispatch<PopoverAction> | null>(null);

export const usePopoverDispatch = () => {
  const dispatch = useContext(PopoverDispatchContext);
  if (dispatch === null) {
    throw new Error("usePopoverDispatch must be used within a PopoverProvider");
  }
  return {
    changeTriggerMode: (mode: TriggerMode) =>
      dispatch({ type: "CHANGE_TRIGGER_MODE", payload: mode }),
    setIsVisible: (isVisible: boolean) =>
      dispatch({ type: "SET_IS_VISIBLE", payload: isVisible }),
  };
};

export const PopoverProvider = ({
  children,
  placement,
  offset,
  defaultOpen,
  showArrow,
  trigger,
}: Omit<PopoverProps, "className">) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const [state, dispatch] = useReducer(popoverReducer, {
    triggerRef,
    popoverRef,
    arrowRef,
    isVisible: defaultOpen ?? false,
    offset: offset ?? 0,
    showArrow: showArrow ?? true,
    placement: placement ?? "bottom",
    triggerMode: trigger ?? "click",
  });

  return (
    <PopoverContext.Provider value={state}>
      <PopoverDispatchContext.Provider value={dispatch}>
        {children}
      </PopoverDispatchContext.Provider>
    </PopoverContext.Provider>
  );
};
