import { useEffect } from "react";

/**
 * Type definition for container element that can be either an Element or DocumentFragment
 */
type ContainerType = Element | DocumentFragment;

/**
 * A custom hook that handles click outside events for a specified element
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const mounted = useMounted();
 *
 *   // Check mounted state in the component
 *   if (mounted()) {
 *     useClickOutside(
 *       containerRef.current,
 *       () => setIsOpen(false)
 *     );
 *   }
 *
 *   return (
 *     <div ref={containerRef}>
 *       {isOpen && <Dropdown />}
 *     </div>
 *   );
 * };
 * ```
 *
 * @param container - The container element to monitor for outside clicks
 * @param onClickOutside - Callback function triggered when clicking outside the container
 */
export const useClickOutside = (
  container: ContainerType | undefined,
  onClickOutside?: () => void
) => {
  useEffect(() => {
    if (!onClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if click target is outside the container
      if (container && !container.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    // Add mousedown event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: remove event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [container, onClickOutside]);
};
