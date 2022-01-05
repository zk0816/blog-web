/**
 * 古诗词
 */

import React from 'react';

interface Props {
  //内容
  data: Data
  //宽度
  width?: number 
}

interface Data {
  title: string; //标题
  author: string; //作者
  content: string[]; //内容
  dynasty: string; //朝代
}

const AncientPoems = (props: Props) => {
  const {data,width = 300} = props
  const detail: any[] = [];
  data.content && data.content.map((e:string) => {
    e.split('。').map((value:string) => {
      if (value.length > 0) {
        detail.push(value);
      }
    })
  })
  
  return (
    <div
      style={{
        width,
        backgroundColor: "rgba(12,7,10)",
        opacity: 0.7,
        borderRadius: "5px",
        marginBottom: 20,
        fontSize: 13,
        padding: "10px",
      }}
    >
      <h3 style={{ color: "#FFF", fontSize: 16 }}>{data.title}</h3>
      <h4
        style={{ color: "#FFF", fontSize: 14 }}
      >{`${data.dynasty}·${data.author}`}</h4>
      {detail.map((e: string, index: number) => (
        <div key={`index_${index}`} style={{paddingTop: '2px'}}>{e}。</div>
      ))}
    </div>
  );
}

export default AncientPoems;