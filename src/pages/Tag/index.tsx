import Content from '@/components/Content';
import useInitial from '@/hooks/useInitail';
import React from 'react';
import * as API from '@/common/api';
import './index.less'

const Tag: React.FC = () => {
  const { data} = useInitial(API.getTag, [], ""); //查标签
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
              <div key={`index_${index}`} className='tag'>{v.tagName}</div>
            ))}
        </div>
      </Content>
    </div>
  );
}

export default Tag;