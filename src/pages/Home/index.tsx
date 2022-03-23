import React, { useEffect, useState } from "react";
import { message, BackTop } from "antd";
import useInitial from '@/hooks/useInitail';
import * as API from './api';
import './index.less'
import Weather from '@/components/WeatherCard';
import List from './components/List';
import usePagination from '@/hooks/usePagination';
import User from '@/components/UserCard';
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

  const onEdit = (i:any,type:string) => {
    list[type].map((e:any,index:number) => {
      if (index === i){
        e.selected = true
      } else {
        e.selected = false
      }
    })
    const _list = JSON.stringify({...list})
    localStorage.setItem('titleParams', _list)
    setList({...list})
  }

  return (
    <div
      style={{
        //display: "flex",
        //justifyContent: "center",
        borderTop: "1px #E5E5E5 solid",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            height: 45,
            // 吸顶
            position: "sticky",
            top: 0,
          }}
        >
          {list.category.map((e: any, index: number) => (
            <div
              key={`category_${index}`}
              className={e.selected ? "title old" : "title new"}
              onClick={() => onEdit(index, "category")}
            >
              {e.categoryName}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          {list.tag.map((e: any, index: number) => (
            <div
              key={`tag_${index}`}
              className={e.selected ? "oldtext" : "title newtext"}
              onClick={() => onEdit(index, "tag")}
            >
              {e.tagName}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
            <div style={{textAlign: 'center'}}>
              <a className="data" href="https://beian.miit.gov.cn">
                蜀ICP备2022006165号
              </a>
            </div>
          </div>
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
