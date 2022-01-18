import request from '@/request';
import type { http } from '@/request/http';

export const KEY = '42ab9e34aefee42c54994b6ec5b9bbbc'

export interface Params {
  key: string //高德申请的key
  city: string //城市编码
  extensions?: string //气象类型 base:返回实况天气 all:返回预报天气
  output?: string //返回格式 JSON,XML
}

export interface AddressParams {
  key: string //高德申请的key
  ip?: string
}

/** 高德获取定位api*/
export function getAddress(params: AddressParams): any {
  return request.get(`/v3/ip`, { params});
}


/** 高德天气api*/
export function getWeather(params: Params): any {
  return request.get(`/v3/weather/weatherInfo`, { params});
}

export interface City {
  key: string 
  address: string //结构化地址信息 规则遵循：国家、省份、城市、区县、城镇、乡村、街道、门牌号码、屋邨、大厦，如：北京市朝阳区阜通东大街6号。
}

/** 高德地址 查询城市api*/
export function getCity(params: City): any {
  return request.get(`/v3/geocode/geo`, { params });
}
