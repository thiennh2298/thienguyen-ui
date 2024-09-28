import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* merge class name */
export function mcn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
