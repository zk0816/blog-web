import React from 'react';
import './index.less'
import { NavLink } from "react-router-dom";
import IconFont from '@/icon';
import { Input, Popover } from "antd";
import useInitial from '@/hooks/useInitail';
import * as API from "@/common/api";
import PopoverList from '@/components/PopoverList';

const data = [
  {
    title: "首页",
    path: "/home",
    icon: "icon-shouye-shouye",
  },
  {
    title: "标签",
    path: "/tag",
    icon: "icon-biaoqian",
  },
  {
    title: "分类",
    path: "/category",
    icon: "icon-icon_category",
  },
  {
    title: "我的书籍",
    path: "/book",
    icon: "icon-tushu",
  },
];

const Header = () => {
  const {data: categorylist} = useInitial(API.getCategory,[],'') //查分类

  return (
    <div className="head">
      <div className="tent">
        <IconFont
          type="icon-sousuo1"
          className="icon"
          style={{ color: "#fff" }}
        />
        <Input className="input" />
        {/** 路由 */}
        {data.map((value, index: number) => (
          <NavLink
            key={`index-${index}`}
            to={value.path}
            activeStyle={{ color: "#eee" }}
            style={(isActive) => ({ color: isActive ? "#eee" : "#fff" })}
          >
            <Popover
              className="titleLink"
              content={
                value.path == "/category" && (
                  <PopoverList
                    data={categorylist}
                  />
                )
              }
            >
              <IconFont type={value.icon} className="icon" />
              <div className="title">{value.title}</div>
            </Popover>
          </NavLink>
        ))}

        {/** 设置 */}
        <div className="titleLink" style={{ color: "#fff" }}>
          <IconFont type="icon-shezhi" className="icon" />
          <div className="title">设置</div>
        </div>
      </div>
    </div>
  );
}

export default Header;