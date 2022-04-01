import React from 'react';
import './index.less'
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import IconFont from '@/icon';
import { Input } from "antd";

const data = [
  {
    title: "首页",
    path: "/home",
    icon: "icon-shouye-shouye",
  },
  {
    title: "标签",
    path: "/say",
    icon: "icon-biaoqian",
  },
  {
    title: "分类",
    path: "/message",
    icon: "icon-icon_category",
  },
  {
    title: "我的书籍",
    path: "/photo",
    icon: "icon-tushu",
  },
  {
    title: "设置",
    path: "/friend",
    icon: "icon-shezhi",
  },
];

const Header = () => {
  const history = useHistory();
  return (
    <div className="head">
      <div className="tent">
        <IconFont type="icon-sousuo1" className="icon" />
        <Input className='input'/>
        {data.map((value, index: number) => (
          <NavLink
            key={`index-${index}`}
            to={value.path}
            activeStyle={{ color: "#007fff" }}
            className="titleLink"
          >
            <IconFont type={value.icon} className="icon" />
            <div className="title">{value.title}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Header;