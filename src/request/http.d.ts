import { common } from "./common";
import { AxiosRequestConfig } from 'axios';

declare namespace http {
  interface Config extends AxiosRequestConfig {
    token?: string;
    contentType?: "json" | "form-urlencoded" | "form-data";
    prefix?: string;
  }

  interface Response<T> {
    readonly code: number;
    readonly success: boolean;
    readonly result: string;
    readonly data?: T;
  }

  type PromiseResp<T> = Promise<Response<T>>;
  type PromiseRespA<T> = Promise<Response<Array<T>>>;
  type PageResponse<T> = Response<common.Page<T>>;
  type PromisePageResp<T> = Promise<PageResponse<T>>;
}
