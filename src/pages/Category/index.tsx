import React, { useState } from 'react';
import Content from '@/components/Content';
import './index.less'
import useInitial from '@/hooks/useInitail';
import * as API from "@/common/api";
import { NavLink, useLocation } from 'react-router-dom';
import { Color } from '@/style/global';
import ArticleList from '@/components/ArticleList';

const Category: React.FC = () => {
  const { data } = useInitial(API.getCategory, [], ""); //查分类
  const { search } = useLocation();
  const [params, setParams] = useState({});

  React.useEffect(() => {
    if (search) {
      const categoryId = search.substring(1);
      setParams({ categoryId });
    }
  }, [search]);
  return (
    <div className="content">
      <Content
        title="记录成长 分享生活"
        subTitle="Taking notes life Minutes live"
        iconName="icon-icon_category"
        iconTitle="文章分类"
      >
        <div className="taglist">
          {data.map((v, index) => (
            <NavLink
              to={`/category/${v.categoryName}?${v.categoryId}`}
              key={`index_${index}`}
              className="tag"
              activeStyle={{
                color: "#fff",
                backgroundColor: Color.primaryColor,
              }}
            >
              {v.categoryName}
            </NavLink>
          ))}
        </div>
      </Content>
      {search && <ArticleList param={params} delay />}
    </div>
  );
};;

export default Category;