import React, {useEffect, useRef, useState } from 'react';
import type { Categorty, Tag, Current } from '../interface';
import diffTime from '@/utils/time';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './List.less';
import { Button, Image } from 'antd';
import { useScroll } from "ahooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";

interface Props {
  list: Current[];
  paginationConfig: any;
  setParams: (value: any, refrensh: boolean) => void;
}

const List = (props:Props) => {
  const { list, paginationConfig,setParams } = props;
  const history = useHistory();
  const scroll = useScroll(document); //滚动高度

  useEffect(() => {
    console.log("xxxxx", list);
  }, [list]);

  //网页高度
  const showHeight = window.innerHeight;
  // 所有内容高度
  const allHeight = document.body.scrollHeight;

  const useFn = _.throttle(() => {
    setParams({ pageSize: paginationConfig.pageSize + 10 }, true);
  }, 1000)

  useEffect(() => {
    // (所有内容高度 = 文档显示区域高度 + 滚动高度) 时即为触底
    if (allHeight <= showHeight + (scroll?.top || 0) + 100) {
      if (paginationConfig.lastPage == false) {
        useFn();
      }
    }
  },[scroll])

  return (
    <div className="article">
      {list.map((e: Current, index: number) => (
        <div
          key={`article_${index}`}
          className="content_article"
          onClick={() =>
            history.push({
              pathname: `/article/${e.artid}`,
              // search: `${e.artid}`,
              // state: e.artid,
            })
          }
        >
          <div
            style={{
              width: e.cover_url ? "516px" : "100%",
            }}
            className="left"
          >
            <div style={{ fontSize: 13 }} className="text">
              <span style={{ marginRight: 3 }}>
                {diffTime(e.time, new Date().valueOf())}
              </span>
              {e.tag?.map((e: any) => (
                <span key={e.tagId}>| {e.tagName}</span>
              ))}
            </div>
            <div style={{ fontSize: 16, fontWeight: "bold" }} className="text">
              {e.title}
            </div>
            <div
              style={{
                fontSize: 13,
              }}
              className="text2"
            >
              {e.content}
            </div>
            <div style={{ fontSize: 13 }} className="text">
              <div className="icon">
                <span>
                  <EyeOutlined />
                </span>
                <span className="number">{e.tour}</span>
              </div>
              <div className="icon">
                <span>
                  <LikeOutlined />
                </span>
                <span className="number">{e.like}</span>
              </div>
              <div className="icon">
                <span>
                  <MessageOutlined />
                </span>
                <span className="number">{e.comment}</span>
              </div>
            </div>
          </div>
          {e.cover_url && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image
                preview={false}
                src={e.cover_url}
                width={120}
                height={80}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default List;