import * as React from 'react';
import './index.less'
import {Current} from '@/common/interface';
import moment from 'moment';
import IconFont from '@/icon';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

interface Props {
  data: Current
  onClick?: Function
}

const ArticleCard = ({ data, onClick }: Props) => {
  const [tag, setTag] = React.useState<Array<string | undefined>>([]);

  React.useEffect(() => {
    if (data) {
      const _data = data.tag!.map((e) => e.tagName);
      setTag(_data);
    }
  }, [data]);
  return (
    <div className="articlehead" onClick={() => onClick && onClick()}>
      <div
        className="card"
        style={{
          backgroundImage: `url(${data.cover_url})`,
          backgroundColor: data.cover_url ? "none" : "#00BCFF",
        }}
      >
        <div className="text">{data.title}</div>
      </div>
      <div className="msg">
        {/* 时间 */}
        <div className="time">
          <div className="left">
            <IconFont type="icon-shijian" className="icon" />
            {moment(data.time).format("YYYY-MM-DD")}
          </div>
          <div className="left">
            <IconFont type="icon-icon_category" className="icon" />
            {data.category?.categoryName}
          </div>
        </div>
        {/** 标签 */}
        <div className="tag">
          {tag.map((e, index) => (
            <div key={`index_${index}`} className="tagtitle">
              {e}
            </div>
          ))}
        </div>
        {/**喜好 */}
        <div className="like">
          <div className="icon">
            <span>
              <EyeOutlined />
            </span>
            <span className="number">{data.tour}</span>
          </div>
          <div className="icon">
            <span>
              <LikeOutlined />
            </span>
            <span className="number">{data.like === 0 ? "点赞" : data.like}</span>
          </div>
          <div className="icon">
            <span>
              <MessageOutlined />
            </span>
            <span className="number">
              {data.comment === 0 ? "评论" : data.comment}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;