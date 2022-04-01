import React from 'react'
import './index.less';
import { useScroll } from "ahooks";

interface Props {
  title: string
  subtitle?: string
}

const Content = ({title, subtitle}: Props) => {
  const scroll = useScroll(document);
  return (
    <div>
      <div
        className="bg"
        style={{ zIndex: scroll && scroll.top > 25 ? 0 : 100 }}
      >
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

export default Content;