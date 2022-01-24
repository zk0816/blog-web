import React from 'react';
import './index.less'
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

const data = [
  {
    title: "文章",
    path: "/home",
  },
  {
    title: "说说",
    path: "/say",
  },
  {
    title: "留言",
    path: "/message",
  },
  {
    title: "相册",
    path: "/photo",
  },
  {
    title: "友链",
    path: "/friend",
  },
];

const Header = () => {
  const history = useHistory();
  return (
    <div className="head">
      <div className="tent">
        <HomeOutlined
          style={{ fontSize: "20px" }}
          onClick={() => history.push("/home")}
        />
        <div className="nav">
          {data.map((value: any, index: number) => (
            <NavLink
              key={`index-${index}`}
              style={{
                fontSize: 20,
                width: 70,
                textAlign: "center",
                height: 38,
                lineHeight: "38px",
                //color: "#333333",
              }}
              to={value.path}
              className="titlelink"
              activeStyle={{color:'#007fff'}}
            >
              {value.title}
            </NavLink>
          ))}
        </div>
        <SettingOutlined
          style={{ fontSize: "20px" }}
          onClick={() => history.push("/home")}
        />
      </div>
    </div>
  );
}

export default Header;