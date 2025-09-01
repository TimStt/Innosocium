import { RefObject, useEffect } from 'react';

export default function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  ignoreSelectors: string[] = []
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Если клик произошел внутри элемента или его нет, игнорируем
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Если клик произошел в элементе, совпадающем с селектором, игнорируем
      if (
        ignoreSelectors.some((selector) => {
          const ignoredElement = document.querySelector(selector);
          return (
            ignoredElement && ignoredElement.contains(event.target as Node)
          );
        })
      ) {
        return;
      }

      // Вызываем обработчик
      console.log('  // Вызываем обработчик');
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, ignoreSelectors]);
}
