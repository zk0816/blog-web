import * as React from 'react';
import * as API from "@/common/api";
import usePagination from '@/hooks/usePagination';
import ArticleCard from '@/components/ArticleCard';
import { BackTop, Pagination } from 'antd';
import { CaretUpOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Color } from '@/style/global';
import { useHistory } from 'react-router-dom';
import "./index.less";

interface Props {
  delay?: boolean  // 控制请求 是否进入页面就请求
  param?: Params //参数
}

type Params = {
  tagId?: number
  categoryId?: number
}


const ArticleList = (props: Props) => {
  const history = useHistory();
  const {delay,param} = props;
  const [hidden, setHidden] = React.useState(delay);
  const { list, paginationConfig, setParams} = usePagination(API.getArticle, {pageSize: 9,current: 1,},{delay: hidden}); //查文章

  React.useEffect(() => {
    if (param &&  Object.keys(param).length > 0) {
      setHidden(false)
      setParams( {current: 1,pageSize: 9,...param,},true)
    }
  }, [param])

  function itemRender(
    current: number,
    type: string,
    originalElement: React.ReactNode
  ) {
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
    <div className="flexcolumn" style={{minHeight: '25rem'}}>
      <div className="flexgrid">
        {list.map((e, index) => (
          <div
            key={e.artid}
            style={{
              margin:
                (index - 1) % 3 === 0 || index + 1 === 2
                  ? "0 2.6rem 1rem 2.6rem"
                  : "0 0 1rem 0",
            }}
          >
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
}

export default ArticleList;