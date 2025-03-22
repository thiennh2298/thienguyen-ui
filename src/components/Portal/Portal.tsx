import {
  ReactNode,
  forwardRef,
  cloneElement,
  isValidElement,
  RefObject,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useComposeRef, { supportRef } from "../../hooks/useComposeRef";
import { useMounted } from "../../hooks/useMounted";
import { mcn } from "../../utils/mcn";

type ContainerType = Element | DocumentFragment;
type ElementWithRef = React.ReactElement & { ref?: RefObject<Element> };

type Position = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

export interface PortalProps {
  container?: ReactNode | HTMLElement;
  children: ReactNode;
  open?: boolean;
  position?: Position;
  zIndex?: number;
  onClickOutside?: () => void;
  className?: string;
  animation?: {
    enter: string;
    exit: string;
  };
}

const getPortalContainer = (
  container?: ReactNode | HTMLElement
): ContainerType => {
  if (container instanceof HTMLElement) {
    return container;
  }
  if (isValidElement(container)) {
    const ref = (container as ElementWithRef).ref;
    if (ref && "current" in ref && ref.current instanceof Element) {
      return ref.current;
    }
  }
  return document.body;
};

export const Portal = forwardRef<Element, PortalProps>((props, ref) => {
  const {
    children,
    container,
    open,
    position,
    zIndex = 1000,
    onClickOutside,
    className = "",
    animation,
  } = props;

  const mounted = useMounted();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!mounted || !onClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      const portalElement = getPortalContainer(container);
      if (portalElement && !portalElement.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [container, mounted, onClickOutside]);

  useEffect(() => {
    if (animation) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open, animation]);

  if (!mounted || !open) {
    return null;
  }

  const mergedRef = supportRef(children)
    ? useComposeRef(ref, (children as any).ref)
    : undefined;

  let reffedChildren = children;
  if (ref) {
    reffedChildren = cloneElement(children as any, {
      ref: mergedRef,
    });
  }

  const portalContent = (
    <div
      style={{
        position: "fixed",
        ...position,
        zIndex,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      className={mcn(
        "portal-wrapper",
        "transform-gpu",
        className,
        animation && {
          [animation.enter]: open && isAnimating,
          [animation.exit]: !open,
        }
      )}
    >
      {reffedChildren}
    </div>
  );

  return createPortal(portalContent, getPortalContainer(container));
});

Portal.displayName = "Portal";
