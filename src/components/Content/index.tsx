import React from 'react'
import './index.less';
import IconFont from '@/icon';

interface Props {
  title?: string
  subTitle?: string
  iconName?: string
  iconTitle?: string
  children?: React.ReactNode
  height?: string
}

const Content = ({title, subTitle,iconName,iconTitle, children,height}: Props) => {
  return (
    <div className="flexcolumn">
      <div className="bg" style={{ height }}>
        <div className="title">{title}</div>
        <div className="subtitle">{subTitle}</div>
      </div>
      <div className="sub">
        <div className="subcontent">
          <IconFont type={iconName!} style={{ marginRight: "0.6rem" }} />
          {iconTitle}
        </div>
        {children}
      </div>
    </div>
  );
}

export default Content;