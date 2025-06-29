import { useRef, useCallback } from "react";

export function useThrottleFn<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCalled = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const remaining = delay - (now - lastCalled.current);

      if (remaining <= 0) {
        lastCalled.current = now;
        callback(...args);
      } else if (!timeout.current) {
        timeout.current = setTimeout(() => {
          lastCalled.current = Date.now();
          timeout.current = null;
          callback(...args);
        }, remaining);
      }
    },
    [callback, delay]
  );

  return throttledFn;
}
