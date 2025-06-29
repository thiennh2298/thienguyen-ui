import {
  MutableRefObject,
  Ref,
  RefCallback,
  isValidElement,
  useCallback,
} from "react";

const ForwardRef = Symbol.for("react.forward_ref"); // React's internal symbol for forwardRef

export const supportRef = (element: any): boolean => {
  if (!isValidElement(element)) {
    return false;
  }

  const type = element.type;

  // Check if it's a class component or forwardRef
  if (
    typeof type === "function" &&
    (type.prototype?.render ||
      ("$$typeof" in type && type.$$typeof === ForwardRef))
  ) {
    return true;
  }

  // For functional components, refs are not supported unless they use forwardRef
  return false;
};

export function useComposeRef<T>(...refs: (React.Ref<T> | undefined)[]) {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      });
    },
    [refs]
  );
}
