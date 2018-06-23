import createFetchMiddleware, { applyFetchMiddleware } from 'redux-composable-fetch';
import resolveFetchMiddleware from './resolveFetchMiddleware';
import filterFetchMiddleware from './filterFetchMiddleware';

function patchedCreateFetchMiddleware(options, config) {
  const finalOptions = applyFetchMiddleware(options);
  return createFetchMiddleware(finalOptions, config);
}

const finalFetchMiddleware = applyFetchMiddleware(
  filterFetchMiddleware,
  resolveFetchMiddleware,
);

function createRequest(options = {}, config = {}) {
  return function (...args) {
    return patchedCreateFetchMiddleware(options, {
      ...config,
      promiseMode: true,
    })()(() => {}).apply(null, args);
  };
}

const Request = createRequest(finalFetchMiddleware);

const finalRequest = (fetchObj: any, ...otherArgs: any[]) => {
  let { method = 'GET', params = {} } = fetchObj;

  if (method.toUpperCase() === 'POST') {
    params = _.mapValues(params, val => {
      return JSON.stringify(val);
    });
  }

  return Request({ ...fetchObj, params }, ...otherArgs);
};

export default finalRequest;