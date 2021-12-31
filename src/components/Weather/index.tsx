/**
 * 天气预报组件 采用高德天气api
 */

import { message } from 'antd';
import React, { useEffect } from 'react';
import {getWeather,getCity,KEY} from './api';
import './index.less'

const Weather = () => {

  useEffect(()=>{
    getCity({ key: KEY, address: "四川省成都市" })
      .then((res: any) => {
        getWeather({
          key: KEY,
          city: res.data.geocodes[0].adcode,
          extensions: "base",
        })
          .then((result: any) => console.log(result.data))
          .catch((e: any) => message.error(e.message));
      })
      .catch((e: any) => message.error(e.message));
  },[])
  
  return (
    <div>
      <div className="icon sun-shower">
        <div className="cloud"></div>
        <div className="sun">
          <div className="rays"></div>
        </div>
        <div className="rain"></div>
      </div>

      <div className="icon thunder-storm">
        <div className="cloud"></div>
        <div className="lightning">
          <div className="bolt"></div>
          <div className="bolt"></div>
        </div>
      </div>

      <div className="icon cloudy">
        <div className="cloud"></div>
        <div className="cloud"></div>
      </div>

      <div className="icon flurries">
        <div className="cloud"></div>
        <div className="snow">
          <div className="flake"></div>
          <div className="flake"></div>
        </div>
      </div>

      <div className="icon sunny">
        <div className="sun">
          <div className="rays"></div>
        </div>
      </div>

      <div className="icon rainy">
        <div className="cloud"></div>
        <div className="rain"></div>
      </div>
    </div>
  );
}

export default Weather;