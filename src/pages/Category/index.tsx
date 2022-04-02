import React from 'react';
import Content from '@/components/Content';
import './index.less'

const Category: React.FC = () => {
  return (
    <div className="category">
      <Content
        title="记录成长 分享生活"
        subTitle="Taking notes life Minutes live"
        iconName="icon-tushu"
        iconTitle="我的书籍"
      />
    </div>
  );
};

export default Category;