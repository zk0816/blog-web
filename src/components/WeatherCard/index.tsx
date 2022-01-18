/**
 * 天气预报组件 采用高德天气api
 */

import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import {getWeather,getCity,KEY,getAddress} from './api';
import './index.css'

const Weather = () => {
  const [data,setData] = useState<any>({})

  //目前只做的天气气象
  const desWeather = ['多云','雷阵雨','晴','晴间多云','雪','雨']

  useEffect(()=>{
    // 获取ip 根据ip获取城市 根据城市获取天气
    getAddress({ key: KEY })
      .then((value:any) => {
        getCity({ key: KEY, address: value.data.city })
          .then((res: any) => {
            getWeather({
              key: KEY,
              city: res.data.geocodes[0].adcode,
              extensions: "base",
            })
              .then((result: any) => {
                setData(result.data.lives[0]);
              })
              .catch((e: any) => message.error(e.message));
          })
          .catch((e: any) => message.error(e.message));
      })
      .catch((e: any) => message.error(e.message));
    
  },[])

  
  return (
    <div className="background" style={{opacity: 0.7}}>
      <div className="container">
        <div id="card" className="weather">
          <div className="details">
            <div className="temp">
              {data.temperature}
              <span>&deg;</span>
            </div>
            <div className="right">
              <div id="summary">{data.weather}</div>
              <div
                style={{ fontWeight: "bold", marginTop: "4px", fontSize: 30 }}
              >
                {data.city}
              </div>
            </div>
          </div>
          <img
            className="weatherimg"
            alt="image1"
            src={`/src/assets/img/${
              desWeather.includes(data.weather) ? data.weather : "50d"
            }.${"svg"}`}
          ></img>
          <div className="infos">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <img
                alt="humidity1"
                className="humidityimg"
                style={{ width: "5", height: "5" }}
                src="/src/assets/img/humidity.svg"
              ></img>
              <div className="humidity">空气湿度 {data.humidity}%</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt="windspeed1"
                className="windimg"
                style={{ width: "5", height: "5" }}
                src="/src/assets/img/wind.svg"
              ></img>
              <div className="windspeed">风力级别 {data.windpower}级</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;