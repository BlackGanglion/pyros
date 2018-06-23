export default {
  beforeFetch({ action }) {
    return Promise.resolve({
      action: {
        ...action,
        params: {
          ...Object.keys(action.params || {}).reduce((prev, curr) => {
            if (action.params[curr] !== undefined) {
              prev[curr] = action.params[curr];
            }

            return prev;
          }, {}),
        },
        url: action.url,
      },
    });
  },
};
