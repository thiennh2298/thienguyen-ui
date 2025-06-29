import {
  ReactNode,
  useEffect,
  useState,
  isValidElement,
  RefObject,
} from "react";
import { createPortal } from "react-dom";

type ContainerType = Element | DocumentFragment;
type ElementWithRef = React.ReactElement & { ref?: RefObject<Element> };

interface PortalProps {
  children: ReactNode;
  container?: ReactNode | HTMLElement;
  open?: boolean;
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

export const Portal = ({ children, container, open = true }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) return null;

  const portalContainer = getPortalContainer(container);
  return createPortal(children, portalContainer);
};
