import { useState, useEffect } from 'react';
import { http } from '@/request/http';
import { message } from 'antd';

type APIFunc<T, P> = (params: P) => http.PromiseResp<T>

/**
 * @param {api} —api.ts件中封装的接口请求方法
 * @param {defaultData} 页面初始化时接口数据的默认值
 * @param {params} 接口所需要的参数  注意，这里请传入接口需要的完整的参数
 * @param {delay} 当该值为true时，接口不请求
 */

interface InitialStatus<P, T> {
  param: P,
  errMsg: string,
  loading: boolean,
  data: T,
  refreshing: boolean
}

export default function useInitial<T, P>(api: APIFunc<T, P>, defaultData: T, _params: P, delay?: boolean) {
  const [state, setState] = useState<InitialStatus<P, T>>({
    param: _params,
    errMsg: '',
    loading: true,
    data: defaultData,
    refreshing: !delay
  });

  useEffect(() => {
    if (delay) return;
    if (state.refreshing) getData(state.param || _params);
  }, [delay, state.refreshing]);

  function getData(params: P) {
    api(params).then(res => {
      let data = res.data || defaultData;

      // @ts-ignore
      if (Object.prototype.toString.call(data) === '[object Array]' && data.length === 0) {
        // @ts-ignore
        data = defaultData || [];
      }
      setState({
        ...state,
        data,
        errMsg: '',
        loading: false,
        refreshing: false
      });
    }).catch(e => {
      message.error(e.message);
      setState({
        ...state,
        errMsg: e.message,
        loading: false,
        refreshing: false
      });
    });
  }

  function setParams(params: P, _refreshing?: boolean) {
    const param = typeof params == "object" ? { ..._params, ...state.param, ...params } : params;
    setState({ ...state, param, loading: _refreshing || false, refreshing: _refreshing || false });
  }

  return {
    errMsg: state.errMsg,
    data: state.data as T,
    setData: (data: any) => setState({ ...state, data }),
    setErrMsg: (errMsg: string) => setState({ ...state, errMsg }),
    loading: state.loading,
    setLoading: (loading: boolean) => setState({ ...state, loading, refreshing: loading }),
    params: state.param || _params,
    setParams
  };
}
