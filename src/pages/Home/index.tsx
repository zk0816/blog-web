import React, { useEffect, useState } from "react";
import { message, BackTop } from "antd";
import useInitial from '@/hooks/useInitail';
import * as API from './api';
import List from './components/List';
import usePagination from '@/hooks/usePagination';
import { CaretUpOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
  const [delay, setDelay] = useState(true);
  const {data: categorylist,setLoading: setCateLoading} = useInitial(API.getCategory,[],'', delay) //查分类
  const { data: taglist,setLoading: setTagLoading } = useInitial(API.getTag, [], "",delay); //查标签
  const {list: articlelist, paginationConfig,setParams} = usePagination(API.getArticle,{pageSize: 10, current: 1}); //查文章
  const [list,setList] = useState<any>({category: [], tag: []});

  useEffect(() =>{
    const _params = localStorage.getItem("titleParams")
    const _list = _params && JSON.parse(_params);
    if (_params) {
      setDelay(true);
      setList({category: _list.category, tag: _list.tag})
    } else {
      setDelay(false);
      setCateLoading(true);
      setTagLoading(true);
    }
    return () => localStorage.clear();
  }, [])

  useEffect(()=>{
    if (categorylist.length > 0) {
      categorylist.unshift({ categoryName: "推荐", categoryId: -1 });
      categorylist.map((e: any, index: number) => {
        if (index === 0) {
          e.selected = true;
        } else {
          e.selected = false;
        }
      });
      setList({ ...list, category: categorylist });
    }
  }, [categorylist])

  useEffect(() => {
    if (taglist.length > 0) {
      taglist.unshift({ tagName: "全部", tagId: -1 });
      taglist.map((e: any, index: number) => {
        if (index === 0) {
          e.selected = true;
        } else {
          e.selected = false;
        }
      });
      setList({ ...list, tag: taglist });
    }
  }, [taglist]);

  return (
    <div className='content'>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <List
            list={articlelist}
            paginationConfig={paginationConfig}
            setParams={setParams}
          />
        </div>
      </div>
      <BackTop>
        <div className="up">
          <CaretUpOutlined />
        </div>
      </BackTop>
    </div>
  );
};


export default Home;
