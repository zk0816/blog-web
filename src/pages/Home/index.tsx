import React, { useEffect, useState } from "react";
import {load} from 'jinrishici';
import { message } from 'antd';
import useInitial from '@/hooks/useInitail';
import * as API from './api';
import './index.less'
import Weather from '@/components/Weather';
import AncientPoems from '@/components/AncientPoems';

const Home: React.FC = () => {
  const [content,setContent] = useState({});
  const {data: categorylist,} = useInitial(API.getCategory,[],'')
  const { data: taglist, } = useInitial(API.getTag, [], "");
  const [list,setList] = useState<any>({category: [], tag: []});

  useEffect(() => {
    /**
     * 获取古诗词 使用第三方插件 https://www.jinrishici.com/doc/
     * 详情看文档
     */
    load(
      (result: any) => {
        setContent(result.data.origin);
      },
      (errData: any) => {
        message.error(errData.message);
      }
    );
  }, [])

  useEffect(()=>{
    categorylist.unshift({categoryName: '推荐', categoryId: -1})
    categorylist.map((e:any,index: number) => {
      if (index === 0) {
        e.selected = true
      } else {
        e.selected = false
      }
    })
    setList({...list,category: categorylist})
  }, [categorylist])

  useEffect(() => {
    taglist.unshift({ tagName: "全部", tagId: -1 });
    taglist.map((e: any, index: number) => {
      if (index === 0) {
        e.selected = true;
      } else {
        e.selected = false;
      }
    });
    setList({ ...list, tag: taglist });
  }, [taglist]);

  const onEdit = (i:any,type:string) => {
    list[type].map((e:any,index:number) => {
      if (index === i){
        e.selected = true
      } else {
        e.selected = false
      }
    })
    setList({...list})
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {list.category.map((e: any, index: number) => (
          <div
            key={e.categoryId}
            className={e.selected ? "text oldtext" : "text newtext"}
            onClick={() => onEdit(index, "category")}
          >
            {e.categoryName}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {list.tag.map((e: any, index: number) => (
          <div
            key={e.tagId}
            className={e.selected ? "text oldtext" : "text newtext"}
            onClick={() => onEdit(index, "tag")}
          >
            {e.tagName}
          </div>
        ))}
      </div>
      <div
        style={{
          height: "100%",
          fontSize: 50,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginTop: 20 }}>
          <AncientPoems data={content} />
          <Weather />
        </div>
        <div>小虎之家</div>
        <div>22222</div>
      </div>
    </div>
  );
};

export default Home;
