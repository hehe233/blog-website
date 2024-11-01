import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IResponse {
  code?: any;
  isSuccess: boolean;
  data: any;
  msg: any;
  contentType: string;
}

export interface IAxios extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export type IAxiosError = ErrorProcessor;

class ErrorProcessor extends Error {
  private _code: number;
  private _status: number;
  msg: string;

  constructor (status = 200, code = 0, defaultMsg = '未知错误') {
    defaultMsg = defaultMsg || '未知错误';
    super(defaultMsg);
    this._code = code || 0;
    this._status = status;
    this.msg = defaultMsg;
  }

  get message () {
    return this.msg;
  }

  get code () {
    return this._code;
  }

  get status () {
    return this._status;
  }

  toString () {
    return this.msg;
  }

  toJSON () {
    return {
      msg: this.msg,
      code: this._code,
      status: this._status,
    };
  }
}

const options: AxiosRequestConfig = {
  timeout: 90 * 1000,
  // baseURL: '/api',
};

const instance = axios.create(options);

const handleResponse = function (res: AxiosResponse) {
  res.status !== 200 && console.log('%c status ', 'background: red; color: #fff', res.status);
  switch (res.status) {
    case 200:
      return Promise.resolve(res.data);
    default:
      return Promise.reject(new ErrorProcessor(res.status));
  }
};

const axiosThen = function (response: AxiosResponse) {
  return handleResponse(response).then(resData => {
    // 兼容 axios 在接受blob数据时 会把整个data转化为blob类型，从而导致resData.data不存在
    if (resData instanceof Blob) {
      return resData;
    } else if (resData.isSuccess) {
      return Promise.resolve(resData.data);
    } else {
      console.log('%c CATCH ERROR', 'background: red; color: #fff', resData.msg);
      return Promise.reject(new Error(resData.msg));
    }
  });
};

const axiosCatch = function (error: AxiosError) {
  if (error && error.response) {
    const response = error.response;
    const resData = response.data as IResponse || {};
    switch (response.status) {
      default:
        console.log('%c CATCH ERROR 3', 'background: red; color: #fff', resData.msg || 'request error');
        return Promise.reject(new ErrorProcessor(
          response.status,
          resData.code || -1,
          resData.msg || 'request error'
        ));
    }
  }

  return Promise.reject(new ErrorProcessor(
    500,
    -1,
    error ? (error.message || (error + '')) : 'request error'
  ));
}

instance.interceptors.request.use(config => {
  if (window.location.search) {
    // const searchParams = new URLSearchParams(window.location.search);
    // config.headers = {
    //   'sso-username': config.headers['sso-username'] || searchParams.get('username'),
    //   'sso-token': config.headers['sso-token'] || searchParams.get('token'),
    // };
  }
  return config;
});

instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return axiosThen(response);
}, error => axiosCatch(error));

export default (instance as IAxios);
