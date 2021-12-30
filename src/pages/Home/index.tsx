import React, { useEffect, useState } from "react";
import {load} from 'jinrishici';
import { message } from 'antd';
import useInitial from '@/hooks/useInitail';
import * as API from './api';

const Home: React.FC = () => {
  const [content,setContent] = useState({});
  const {data: categorylist} = useInitial(API.getCategory,[],'')

  useEffect(() => {
    load(
      (result: any) => {
        setContent(result.origin);
      },
      (errData: any) => {
        message.error(errData.message)
      }
    );
  }, [])

  return (
    <div>
      <div style={{display: 'flex',justifyContent:'center'}}>
        {categorylist.map((e:any) => (
          <div key={e.categoryId} style={{paddingInline: 10, fontSize: 15}}>{e.categoryName}</div>
        ))}
      </div>
      <div></div>
      <div
        style={{
          height: "100%",
          fontSize: 50,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>11111</div>
        <div>小虎之家</div>
        <div>22222</div>
      </div>
    </div>
  );
};

export default Home;
