import React from 'react';
import Content from '@/components/Content';
import './index.less'
import useInitial from '@/hooks/useInitail';
import * as API from "@/common/api";

const Category: React.FC = () => {
  const { data } = useInitial(API.getCategory, [], ""); //查标签
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
            <div key={`index_${index}`} className="tag">
              {v.categoryName}
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
};;

export default Category;