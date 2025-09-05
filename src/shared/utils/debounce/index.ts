// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const debounce = (func: Function, wait: number) => {
  let timeoutId: NodeJS.Timeout | undefined;
  return (...args: unknown[]) => {
    const later = () => {
      timeoutId = undefined;
      func(...args);
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
  };
};

export default debounce;
