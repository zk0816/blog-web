import React from "react";
import { BackTop, Pagination} from "antd";
import * as API from '@/common/api';
import usePagination from '@/hooks/usePagination';
import { CaretUpOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Content from '@/components/Content';
import ArticleCard from '@/components/ArticleCard';
import './index.less'
import { useHistory } from 'react-router-dom';
import { Color } from '@/style/global';

const Home: React.FC = () => {
  const history = useHistory();
  const {list: articlelist, paginationConfig,setParams} = usePagination(API.getArticle,{pageSize: 2, current: 1}); //查文章

  function itemRender(current: number, type: string, originalElement: React.ReactNode) {
    if (type === "prev") {
      return (
        <div
          className="page"
          style={{
            backgroundColor:
              paginationConfig.current === 1 ? "grey" : Color.primaryColor,
          }}
        >
          <LeftOutlined />
        </div>
      );
    }
    if (type === "next") {
      return (
        <div
          className="page"
          style={{
            backgroundColor: paginationConfig.lastPage
              ? "grey"
              : Color.primaryColor,
          }}
        >
          <RightOutlined />
        </div>
      );
    }
    return originalElement;
  }

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
        {articlelist.map((e,index) => (
          <div key={e.artid} style={{margin: ((index - 1) % 3 === 0 || index + 1 === 2) ? '0 2.6rem 1rem 2.6rem' : '0 0 1rem 0'}}>
            <ArticleCard
              data={e}
              onClick={() =>
                history.push({
                  pathname: `/article/${e.artid}`,
                })
              }
            />
          </div>
        ))}
      </div>
      <Pagination
        simple
        // defaultCurrent={paginationConfig.current}
        current={paginationConfig.current}
        total={paginationConfig.total}
        itemRender={itemRender}
        className="pagetion"
        onChange={(e) => setParams({ pageSize: 9, current: e }, true)}
      />
      <BackTop>
        <div className="up">
          <CaretUpOutlined />
        </div>
      </BackTop>
    </div>
  );
};


export default Home;
