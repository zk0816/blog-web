/**
 * 天气预报组件 采用高德天气api
 */

import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import {getWeather,getCity,KEY} from './api';
import './index.css'

const Weather = () => {
  const [data,setData] = useState<any>({})

  useEffect(()=>{
    getCity({ key: KEY, address: "四川省成都市" })
      .then((res: any) => {
        getWeather({
          key: KEY,
          city: res.data.geocodes[0].adcode,
          extensions: "base",
        })
          .then((result: any) => {console.log(result.data), setData(result.data.lives[0]);})
          .catch((e: any) => message.error(e.message));
      })
      .catch((e: any) => message.error(e.message));
  },[])

  
  return (
    <div className="background">
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
            src={`/src/assets/img/${data.weather || "50d"}.${"svg"}`}
          ></img>
          <div className="infos">
            <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
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