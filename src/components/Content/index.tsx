import React from 'react'
import './index.less';
import { useScroll } from "ahooks";
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
  const scroll = useScroll(document);
  const subscroll = useScroll(document);
  return (
    <div className="flexcolumn">
      <div
        className="bg"
        style={{ zIndex: scroll && scroll.top > 25 ? 0 : 100, height }}
      >
        <div className="title">{title}</div>
        <div className="subtitle">{subTitle}</div>
      </div>
      <div
        className="sub"
        style={{ zIndex: subscroll && subscroll.top > 50 ? 0 : 120 }}
      >
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