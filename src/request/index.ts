import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { http } from './http';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '请求参数异常，类型不正确。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '访问地址不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 配置request请求时的默认参数
 */
const config_ = {
  contentType: 'json',
  prefix: 'api',
  timeout: 10 * 1000,
  params: {
    _s: new Date().getTime(),
  },
};

axios.interceptors.request.use((config: http.Config) => {
  const _params = Object.assign({}, config_.params, config.params);
  // eslint-disable-next-line no-param-reassign
  config = Object.assign({}, config_, config);
  config.params = _params;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //config.token && (config.headers.Authorization = config.token);
  // @ts-ignore
  config.headers.Authorization = 'Bearer ' + `${localStorage.getItem('token')}`;

  if (config.contentType == 'json') {
    // @ts-ignore
    config.headers['Content-Type'] = 'application/json';
  }

  if (config.contentType == 'form-urlencoded') {
    // @ts-ignore
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.transformRequest = (data) => {
      let key,
        // eslint-disable-next-line prefer-const
        result = [];
      if (typeof data === 'string') {
        return data;
      }

      for (key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          result.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }
      }
      return result.join('&');
    };
  }

  if (config.contentType == 'form-data') {
    // @ts-ignore
    config.headers['Content-Type'] = 'multipart/form-data';
    config.transformRequest = (data) => {
      if (data instanceof FormData) {
        return data;
      }
      const f = new FormData();
      Object.entries(data).forEach(([key, value]: any[]) => {
        f.append(key, value);
      });
      return f;
    };
  }

  if (config.prefix) {
    //增加判断 使用高德api
    if (config.url!.includes('v3')) {
      config.url = `/${config.url}`.replace('//', '/');
    } else {
      config.url = `/${config.prefix}${config.url}`.replace('//', '/');
    }
    // if (!config.url!.includes('http')) {
    //   config.url = `/${config.prefix}${config.url}`.replace('//', '/');
    // }
  }
  return config;
});

// @ts-ignore
axios.interceptors.response.use(
  (response: AxiosResponse<http.Response<any>>) => {
    const data = response.data;

    /**
     * 此处需要配合团队内部定义的规范进行处理，如果一旦发现success为false，则继续处理异常逻辑，内部规范中，data的数据格式必须为上述 http.Response中的格式
     * 在此处，当success = false 时，仍然要处理对应的异常逻辑
     * 阿里云网页接口，直接返回接口结果
     */
    if (data) {
      const aliURL = 'at.alicdn.com';
      const { responseURL } = response.request;
      if (response.status === 200 && data.code == undefined) {
        return response;
      }
      if ((response.status === 200 && responseURL.includes(aliURL)) || data.success || data.data)
        return data;

      const code = data.code || response.status;
      // @ts-ignore
      const message = data.result || codeMessage[code] || response.statusText;
      const error = new Error(message);
      // @ts-ignore
      error.code = code;
      return Promise.reject(error);
    }

    console.error(
      '正常返回的response中未找到data，该场景暂时未做处理，如在实践中遇到，请联系@yangbo补充该处逻辑。',
    );
    return response;
  },
  (err: any) => {
    const response: AxiosResponse<any> = err.response;
    const code = response.status;
    // @ts-ignore
    const message = codeMessage[code] || response.statusText;
    const error = new Error(message);
    // @ts-ignore
    error.code = code;

    return Promise.reject(error);
  },
);

export function get<T>(requestURL: string, config?: http.Config): http.PromiseResp<T> {
  // @ts-ignore
  return axios.get(requestURL, config);
}

export function post<T>(
  requestURL: string,
  params: any,
  config?: http.Config,
): http.PromiseResp<T> {
  // @ts-ignore
  return axios.post(requestURL, params, config);
}

export function put<T>(requestURL: string, params: any, config?: http.Config): http.PromiseResp<T> {
  // @ts-ignore
  return axios.put(requestURL, params, config);
}

export default { get, post, put };
