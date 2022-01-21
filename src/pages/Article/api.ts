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

export interface Comment {
  commentAvatar?: string //评论图片
  commentName?: string  //评论名称
  commentContent?: string //评论内容
  commentEmail?: string //评论邮箱
  commentId?: number
  artid?: number //文章id
}

export interface CommentType extends Comment{}

/** 评论*/
export function addComment(params: Comment): P<Current> {
  return request.post(`/comment/create`, { ...params });
}

/** 回复*/
export function addReply(params: Reply): P<Current> {
  return request.post(`/reply/create`, { ...params });
}

export interface Reply {
  replyId?: number,
  replyName?: string,
  replyAvatar?: string,
  replyEmail?: string,
  replyContent?: string
}

export interface CommentList extends Comment {
  replys: Reply[]
}
/** 根据文章id查询所有评论及回复*/
export function findCommentList(params: Comment): P<CommentList[]> {
  return request.get(`/comment/list`, { params});
}
