import { AxiosRequestConfig } from 'axios';

declare namespace http {
  interface Config extends AxiosRequestConfig {
    token?: string;
    contentType?: "json" | "form-urlencoded" | "form-data";
    prefix?: string;
  }

  interface Response<T> {
    readonly code: number;
    readonly data?: T;
  }

  type PromiseResp<T> = Promise<Response<T>>;
  type PromiseRespA<T> = Promise<Response<Array<T>>>;
}