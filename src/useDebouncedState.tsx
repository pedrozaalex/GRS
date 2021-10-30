import { useEffect, useRef, useState } from 'react';

/**
 *
 * @param initialState
 * @param callback the function to call when the delay has passed
 * @param delay the delay in ms
 * @description useDebouncedState is a hook that calls a callback function after a delay,
 * preventing the callback from being called too often when the user is typing, for example.
 */
export default function useDebouncedState<T>(
  initialState: T,
  callback: () => void,
  delay = 600
): [T, (value: T) => void] {
  // prevents calling the handler on component mount
  const didMountRef = useRef(false);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const delayDebounceFn = didMountRef.current ? setTimeout(callback, delay) : null;
    didMountRef.current = true;

    return () => {
      if (delayDebounceFn) clearTimeout(delayDebounceFn);
    };
  }, [callback, delay]);

  return [state, setState];
}
