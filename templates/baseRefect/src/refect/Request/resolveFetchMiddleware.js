/**
 * @file fetch middleware 的 middleware，对响应的结果进行处理，判断当前请求是否成功
 * @see http://gitlab.alibaba-inc.com/dt-npm/fetch-middleware/tree/master
 */
export default {
  afterFetch({ action, result }) {
    let method = (action.dataType || '').toLowerCase();
    if (!method) {
      method = 'json';
    }

    return result[method]().then(data => {
      if (data && data.message) {
        return Promise.reject({
          error: {
            result: data,
            reason: result.message || '响应格式错误',
          },
          action
        });
      }
      return Promise.resolve({
        action,
        result: data
      });
    });
  }
};
