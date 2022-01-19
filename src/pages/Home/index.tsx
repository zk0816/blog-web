import React, { useEffect, useState } from "react";
import { message } from 'antd';
import useInitial from '@/hooks/useInitail';
import * as API from './api';
import './index.less'
import Weather from '@/components/WeatherCard';
import List from './components/List';
import usePagination from '@/hooks/usePagination';
import User from '@/components/UserCard';


const Home: React.FC = () => {
  const {data: categorylist,} = useInitial(API.getCategory,[],'') //查分类
  const { data: taglist, } = useInitial(API.getTag, [], ""); //查标签
  const {list: articlelist, paginationConfig,setParams} = usePagination(API.getArticle,{pageSize: 10, current: 1}); //查文章
  const [list,setList] = useState<any>({category: [], tag: []});

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
            key={`category_${index}`}
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
            key={`tag_${index}`}
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
        <div>
          <Weather />
        </div>
        <div>
          <List
            list={articlelist}
            paginationConfig={paginationConfig}
            setParams={setParams}
          />
        </div>
        <div>
          <User />
        </div>
      </div>
    </div>
  );
};

export default Home;
