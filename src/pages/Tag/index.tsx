import Content from '@/components/Content';
import useInitial from '@/hooks/useInitail';
import React, { useState } from 'react';
import * as API from '@/common/api';
import './index.less'
import { NavLink,useLocation } from 'react-router-dom';
import ArticleList from '@/components/ArticleList';
import { Color } from '@/style/global';

const Tag: React.FC = () => {
  const { data} = useInitial(API.getTag, [], ""); //查标签
  const {search} = useLocation()
  const [params, setParams] = useState({});

  React.useEffect(() => {
    if (search) {
      const tagId = search.substring(1);
      setParams({tagId})
    }
  }, [search]);

  return (
    <div className="content">
      <Content
        title="记录成长 分享生活"
        subTitle="Taking notes life Minutes live"
        iconName="icon-biaoqian"
        iconTitle="文章标签"
      >
        <div className="taglist">
          {data.map((v, index) => (
            <NavLink
              to={`/tag/${v.tagName}?${v.tagId}`}
              key={`index_${index}`}
              className="tag"
              activeStyle={{ color: "#fff", backgroundColor: Color.primaryColor }}
            >
              {v.tagName}
            </NavLink>
          ))}
        </div>
      </Content>
      {search && <ArticleList param={params} delay />}
    </div>
  );
}

export default Tag;