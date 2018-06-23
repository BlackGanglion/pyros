import Request from '../Request/Request';

function effectReducer(state, manager) {
  return {
    onFetchPending(field, url, options, meta) {
      return {
        ...state,
        [field]: {
          ...(state[field] || {}),
          isLoading: true,
          hasError: false
        }
      };
    },
    onFetchFulfilled(field, data, url, options) {
      return {
        ...state,
        [field]: {
          ...(state[field] || {}),
          isLoading: false,
          hasError: false,
          data
        }
      };
    },
    onFetchRejected(field, err, url, options) {
      return {
        ...state,
        [field]: {
          ...(state[field] || {}),
          isLoading: false,
          hasError: true,
          message: err.message
        }
      };
    }
  };
}

function fetchEffector({ getActions, namespace, getStore }) {
  return {
    fetch(url, options, field, meta) {
      const actions = getActions();
      const dispatch = getStore().dispatch;

      dispatch(actions.onFetchPending(field, url, options, meta));

      return new Promise((resolve, reject) => {
        Request({ ...options, url }).then(
          (data) => {
            console.log(data);
            dispatch(actions.onFetchFulfilled(field, data, url, options));
            resolve(data);
          },
          (err) => {
            dispatch(actions.onFetchRejected(field, err, url, options));
            reject(err);
          }
        );
      });
    }
  };
}

export default {
  effector: fetchEffector,
  putinReducer: effectReducer
};
