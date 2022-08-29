export const navigate = (to, state = {}, isReplace = false) => {
  const historyChangeEvent = new CustomEvent('historychange', {
    detail: {
      to,
      isReplace,
      state,
    },
  });

  dispatchEvent(historyChangeEvent);
};
