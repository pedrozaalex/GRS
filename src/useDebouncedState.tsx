import { useEffect, useRef, useState } from "react";

/**
 * 
 * @param initialState 
 * @param callback the function to call when the delay has passed
 * @param delay the delay in ms
 * @description useDebouncedState is a hook that calls a callback function after a delay,
 * preventing the callback from being called too often when the user is typing, for example.
 */
export default function useDebouncedState(
  initialState: any,
  callback: () => void,
  delay: number = 600
) {
  // prevents calling the handler on component mount
  const didMountRef = useRef(false);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    let delayDebounceFn = didMountRef.current
      ? setTimeout(callback, delay)
      : null;
    didMountRef.current = true;

    return () => {
      delayDebounceFn && clearTimeout(delayDebounceFn);
    };
  }, [state]);

  return [state, setState];
}
