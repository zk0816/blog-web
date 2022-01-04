import request from '@/request';
import type { Categorty, Tag, Current } from './interface';
import type { http } from '@/request/http';

type P<T> = http.PromiseResp<T>;
type Page<T> = http.PromisePageResp<T>;

export interface Params {
  artid?: number;
  title: string;
  content?: string;
  categoryId: number;
  tagId: number;
  thumb_url?: string; //文章链接
  cover_url?: string; //文章封面
}


/** 查询文章*/
export function getArticle(params: any): Page<Current[]> {
  return request.get(`/article/list`, { params });
}


/** 查询分类*/
export function getCategory(): P<Categorty[]> {
  return request.get(`/category/list`);
}

/** 查询标签*/
export function getTag(): P<Tag[]> {
  return request.get(`/tag/list`);
}
