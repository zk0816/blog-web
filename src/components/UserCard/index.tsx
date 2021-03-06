/**
 * 个人信息卡片
 * 
 */

import React, { useState } from 'react';
import { Image, Modal, Popover } from "antd";
import { EnvironmentOutlined, GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

interface Props {
  width?: number  //卡片宽
  height?: number //卡片高
  imgwidth?: number //图片宽
  imgheight?: number //图片高
}

const User = (props: Props) => {
  const { width= 240, height=300,imgwidth =128,imgheight=128 } = props
  return (
    <div
      style={{
        width,
        height,
        padding: 15,
        backgroundColor: "#ffffff",
        opacity: 0.7,
        borderRadius: 5,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Image
          preview={false}
          width={imgwidth}
          height={imgheight}
          src="/img/uesr.jpeg"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: "bold",
          margin: "8px 0",
          textAlign: "center",
        }}
      >
        皮皮虎
      </div>
      <div style={{ fontSize: 14, textAlign: "center" }}>
        <EnvironmentOutlined />
        成都
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "8px 0",
        }}
      >
        <div>
          <div style={{ fontSize: 14 }}>文章</div>
          <div style={{ fontSize: 16, fontWeight: "bold" }}>13</div>
        </div>
        <div>
          <div style={{ fontSize: 14 }}>分类</div>
          <div style={{ fontSize: 16, fontWeight: "bold" }}>13</div>
        </div>
        <div>
          <div style={{ fontSize: 14 }}>标签</div>
          <div style={{ fontSize: 16, fontWeight: "bold" }}>13</div>
        </div>
      </div>
      <div
        style={{
          fontSize: "25px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <GithubOutlined
          onClick={() => {
            const url: any = window.open("about:blank");
            url.location.href = "https://github.com/zk0816";
          }}
        />
        <Popover
          trigger="hover"
          content={
            <Image
              src="/img/qq.jpg"
              width={100}
              height={100}
              preview={false}
            />
          }
        >
          <QqOutlined onClick={() => {}} />
        </Popover>
        <Popover
          trigger="hover"
          content={
            <Image
              src="/img/weixin.png"
              width={100}
              height={100}
              preview={false}
            />
          }
        >
          <WechatOutlined onClick={() => {}} />
        </Popover>
      </div>
    </div>
  );
}

export default User;