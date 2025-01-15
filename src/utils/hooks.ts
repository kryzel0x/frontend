/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import copy from 'copy-to-clipboard';
import { AppDispatch, RootState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useTimeout(callback: any, delay: any) {
  const callbackRef = useRef(callback)
  const timeoutRef: any = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
export function useDebounce(callback: any, delay: number, dependencies: any) {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset])
    // eslint-disable-next-line
    useEffect(clear, [])
  }


  export default function useCopyClipboard(timeout = 500): [(toCopy: string) => void] {
    const [isCopied, setIsCopied] = useState(false)
  
    const staticCopy = useCallback((text: string) => {
      const didCopy = copy(text)
      setIsCopied(didCopy)
    }, [])
  
    useEffect(() => {
      if (isCopied) {
        const hide = setTimeout(() => {
          setIsCopied(false)
        }, timeout)
  
        return () => {
          clearTimeout(hide)
        }
      }
      return undefined
    }, [isCopied, setIsCopied, timeout])
  
    return [staticCopy]
  }

export function useDisableButton(initialState = false) {
  const [isDisabled, setIsDisabled] = useState(initialState);

  const enable = useCallback(() => setIsDisabled(false), []);
  const disable = useCallback(() => setIsDisabled(true), []);

  return {
    isDisabled,
    setIsDisabled,
    enable,
    disable,
  };
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
