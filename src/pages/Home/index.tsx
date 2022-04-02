import React from "react";
import { BackTop } from "antd";
import * as API from '@/common/api';
import usePagination from '@/hooks/usePagination';
import { CaretUpOutlined } from '@ant-design/icons';
import Content from '@/components/Content';
import ArticleCard from '@/components/ArticleCard';
import './index.less'
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();
  const {list: articlelist, paginationConfig,setParams} = usePagination(API.getArticle,{pageSize: 10, current: 1}); //查文章

  return (
    <div className="home content">
      <Content
        title="记录成长 分享生活"
        subTitle="Taking notes life Minutes live"
        iconName="icon-linggan"
        iconTitle="我的寄语"
      >
        <p className="homemsg">己所不欲，勿施于人</p>
      </Content>
      <div className="flexgrid">
        {articlelist.map((e) => (
          <ArticleCard
            key={e.artid}
            data={e}
            onClick={() =>
              history.push({
                pathname: `/article/${e.artid}`,
              })
            }
          />
        ))}
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
