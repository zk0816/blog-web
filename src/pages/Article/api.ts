import { Current } from '@/pages/Home/interface';
import request from '@/request';

import type { http } from '@/request/http';

type P<T> = http.PromiseResp<T>;

export interface Params {
  artid?: number;
  title: string;
  content?: string;
  categoryId: number;
  tagId: number;
  thumb_url?: string; //文章链接
  cover_url?: string; //文章封面
}


/** 查询文章详情*/
export function getArticleDetail(params: any): P<Current> {
  return request.get(`/article/detail`, { params });
}
