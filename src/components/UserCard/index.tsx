/**
 * 个人信息卡片
 */

import React, { useState } from 'react';
import { Image, Modal, Popover } from "antd";
import { EnvironmentOutlined, GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

interface Props {
  width?: number
  height?: number
  imgwidth?: number
  imgheight?: number
}

const User = (props: Props) => {
  const { width= 300, height=400,imgwidth =128,imgheight=128 } = props
  return (
    <div
      style={{
        width,
        height,
        padding: 15,
        backgroundColor: "rgba(12,7,10)",
        opacity: 0.7,
        borderRadius: 5,
      }}
    >
      <div style={{textAlign: 'center'}}>
        <Image
          preview={false}
          width={imgwidth}
          height={imgheight}
          src="../src/assets/img/uesr.jpeg"
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
          <div style={{ fontSize: 24, fontWeight: "bold" }}>13</div>
        </div>
        <div>
          <div style={{ fontSize: 14 }}>分类</div>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>13</div>
        </div>
        <div>
          <div style={{ fontSize: 14 }}>标签</div>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>13</div>
        </div>
      </div>
      <div
        style={{
          fontSize: "40px",
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
              src="../src/assets/img/qq.jpg"
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
              src="../src/assets/img/weixin.png"
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