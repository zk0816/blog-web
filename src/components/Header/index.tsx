import React, { useState, useContext, createContext } from "react";
import './index.less'
import { NavLink } from "react-router-dom";
import IconFont from '@/icon';
import {Popover } from "antd";
import useInitial from '@/hooks/useInitail';
import * as API from "@/common/api";
import PopoverList from '@/components/PopoverList';
import { useScroll } from 'ahooks';
import HeadModal from '@/components/Header/components/HeadModal';

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

export const MyContext = createContext<any>(null);

const Header = () => {
  const { data: categorylist } = useInitial(API.getCategory, [], ""); //查分类
  const [visible,setVisible] = useState(false);
  const scroll = useScroll(document);

  return (
    <div
      className="head"
      style={{
        boxShadow:
          scroll && scroll.top > 25
            ? "0rem 0.2rem 0.2rem 0rem rgba(17,156,215,0.85)"
            : "none",
      }}
    >
      <div className="tent">
        {/**搜索 */}
        <div
          className="titleLink"
          style={{ color: "#fff" }}
          onClick={() => setVisible(true)}
        >
          <IconFont type="icon-sousuo1" className="icon" />
          <div className="title">搜索</div>
        </div>
        <MyContext.Provider value={{visible,setVisible}}>
          <HeadModal />
        </MyContext.Provider>
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
                value.path == "/category" && <PopoverList data={categorylist} />
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
};

export default Header;