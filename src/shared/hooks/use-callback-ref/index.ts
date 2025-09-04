import { useCallback } from 'react';

export const useCallbackRef = <T>(callback: (node: T | undefined) => void) => {
  const setRef = useCallback(
    (node: T) => {
      if (node) {
        callback(node);
      }

      return () => {
        callback(undefined);
      };
    },
    [callback],
  );

  return setRef;
};
