export const getDebounced = (fn, delay = 500) => {
  let existing;
  return (...args) => {
    clearTimeout(existing);
    existing = setTimeout(() => fn(...args), delay);
  };
};
