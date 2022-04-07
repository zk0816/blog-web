import React from "react";
import Content from '@/components/Content';
import './index.less'
import ArticleList from '@/components/ArticleList';

const Home: React.FC = () => {

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
      <ArticleList delay={false} />
    </div>
  );
};


export default Home;
