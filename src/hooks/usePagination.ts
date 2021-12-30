import type { http } from '@/request/http';
import { useState, useEffect, useRef } from 'react';
import type { common } from '@/request/common';
import { message } from 'antd';
import type { TablePaginationConfig } from 'antd/lib/table';
import type { Draft } from 'immer';
import produce from 'immer';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface Params extends common.PaginationParam {
  [key: string]: any;
}
type API<T> = (params: Params) => http.PromisePageResp<T>;

interface Storage {
  delay?: boolean; // 是否 暂缓请求数据；
  pageName?: string; // 启用缓存在整个应用中的唯一值；
  notList?: boolean; // 为true时，读取缓存时，不将list赋值，而是只将innerParams 和 pagination 读取出来，进行接口参数的初始化。
}

interface Pagination extends TablePaginationConfig {
  lastPage?: boolean;
}

export interface State<T> {
  loading: boolean;
  innerParams: Params;
  errMsg: string;
  list: T[];
  pagination: Pagination;
}

function usePagination<T>(
  api: API<T>,
  params: Params = {},
  storage: Storage = { pageName: '', delay: false, notList: false },
) {
  const notList: boolean = storage.notList || false;
  const [state, setState] = useState<State<T>>({
    loading: !storage.pageName,
    innerParams: { ...params },
    errMsg: '',
    list: [],
    pagination: { total: 0, current: 1, pageSize: 10, lastPage: true },
  });
  const [storageInfo, setStorageInfo] = useState<State<T> | null>();
  /**
   * 判断是否有缓存，有则为true，无则为null;
   * 为了适应某些页面需要传递初始化参数，又要使用缓存的情况；
   *
   * 当读取的缓存为null时，则将hasStorage设置为null；
   * 当读取的缓存有时，则将hasStorage设置为true；
   *
   * 需要在使用的页面中使用useEffect监听hasStorage和所需要的初始化参数相关请求接口的赋值参数，
   *    1.当hasStorage为true时，需要将delay设置为false，解开后续需要翻页和查询的请求接口；
   *    2.当hasStorage为null是，需要将delay设置为false，并且使用setParams({...params}, true)将所需要的初始化参数设置，
   *      并将loading设置为true，进行接口请求；
   *
   * 使用示例在 保养套餐卡页面，文件路径为：src\pages\cas\MaintenanceCard\MPList\index.tsx
   */
  const [hasStorage, setHasStorage] = useState<true | null>();

  const storageParams = useRef<Params>();

  const _init_ = async () => {
    const data: State<T> = JSON.parse(sessionStorage.getItem(storage.pageName!) || 'null');
    // const data = await localforage.getItem<State>(storage.pageName!);
    setStorageInfo(data);
    setHasStorage(data === null ? null : true);
  };

  useEffect(() => {
    if (storage.pageName) {
      _init_();
    }
  }, []);

  useEffect(() => {
    if (storageInfo) {
      storageParams.current = storageInfo.innerParams;
      setState(
        produce(state, (df) => {
          df.loading = notList ? true : storageInfo.loading;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !notList && (df.list = storageInfo.list as Draft<T>[]);
          df.innerParams = storageInfo.innerParams;
          df.errMsg = storageInfo.errMsg;
          df.pagination = storageInfo.pagination;
        }),
      );
    } else if (storageInfo === null) {
      setState(
        produce(state, (df) => {
          df.loading = true;
        }),
      );
    }
  }, [storageInfo]);

  /**
   * 当delay为true时，loading为true也不能请求接口，
   * 当使用了delay时，需要将delay设置为false的同时将loading设置为true，才能进行请求接口；
   */
  useEffect(() => {
    if (storage.delay) return;
    if (state.loading)
      getListDataset(storageParams.current ? storageParams.current : state.innerParams || {});
  }, [state.loading, storage.delay]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    storage.pageName && sessionStorage.setItem(storage.pageName, JSON.stringify(state));
  }, [state.list]);

  function getListDataset(options: Params) {
    const _pa = setParams({ ...options });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!storageParams.current && (storageParams.current = undefined);
    return api(_pa)
      .then((res) => {
        if (res.data) {
          setState(
            produce(state, (df) => {
              df.innerParams = _pa;
              df.list = (res.data!.data || []) as Draft<T>[];
              df.pagination = {
                current: res.data!.current || 1,
                pageSize: res.data!.pageSize || 10,
                total: res.data!.total || 0,
                lastPage: res.data!.lastPage,
              };
              df.errMsg = '';
              df.loading = false;
            }),
          );
        }
      })
      .catch((e) => {
        setState(
          produce(state, (df) => {
            df.innerParams = _pa;
            df.list = [];
            df.pagination = {
              current: options.current || 1,
              pageSize: options.pageSize || 10,
            };
            df.errMsg = e.message;
            df.loading = false;
          }),
        );
        message.error(`查询失败:${e.message}`);
      });
  }

  /**
   * 内部缓存参数状态，innerParams
   * 当参数改变时，可能的场景是参数改变之后马上请求数据，或者参数改变之后，并不改变，等到点击确认按钮时才统一请求数据
   * 因此设置refreshing参数作为判断
   * refresing = true，时，直接请求接口
   */
  function setParams(options: Params = {}, refresing?: boolean) {
    const _pa = { ...state.innerParams, current: 1, ...options };
    if (refresing) {
      setState(
        produce(state, (df) => {
          df.innerParams = _pa;
          df.loading = true;
        }),
      );
    } else {
      setState(
        produce(state, (df) => {
          df.innerParams = _pa;
        }),
      );
    }
    return _pa;
  }

  const paginationConfig: TablePaginationConfig | false = {
    ...state.pagination,
    showSizeChanger: true,
    showQuickJumper: true,
    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange: (current, pageSize) => {
      setParams({ current, pageSize }, true);
    },
    // pageSize 变化的回调
    onShowSizeChange: (current, pageSize) => {
      setParams({ current, pageSize }, true);
    },
  };

  function setLoading(loading: boolean) {
    setState(
      produce(state, (df) => {
        df.loading = loading;
      }),
    );
  }
  function setList(list: any[]) {
    setState(
      produce(state, (df) => {
        df.list = list;
      }),
    );
  }
  function setErrMsg(errMsg: string) {
    setState(
      produce(state, (df) => {
        df.errMsg = errMsg;
      }),
    );
  }
  function updateList(item: T, index: number): void {
    setState(
      produce(state, (df) => {
        df.list[index] = item as Draft<T>;
      }),
    );
  }
  function push(item: T): void {
    if (state.pagination.lastPage && state.list.length < state.pagination.pageSize!) {
      setState(
        produce(state, (df) => {
          df.list.push(item as Draft<T>);
          df.pagination.total! += 1;
        }),
      );
    } else setLoading(true);
  }
  function unshift(item: T): void {
    if (state.pagination.lastPage && state.list.length < state.pagination.pageSize!) {
      setState(
        produce(state, (df) => {
          df.list.unshift(item as Draft<T>);
          df.pagination.total! += 1;
        }),
      );
    } else setLoading(true);
  }
  function pop(): void {
    if (state.pagination.lastPage) {
      setState(
        produce(state, (df) => {
          df.list.pop();
          df.pagination.total! -= 1;
        }),
      );
    } else setLoading(true);
  }
  function shift(): void {
    if (state.pagination.lastPage) {
      setState(
        produce(state, (df) => {
          df.list.shift();
          df.pagination.total! -= 1;
        }),
      );
    } else setLoading(true);
  }
  function splice(startIndex: number, count: number): void {
    if (state.pagination.lastPage) {
      setState(
        produce(state, (df) => {
          df.list.splice(startIndex, count);
          df.pagination.total! -= count;
        }),
      );
    } else setLoading(true);
  }

  /**参数重置 */
  // eslint-disable-next-line @typescript-eslint/no-shadow
  function resetParam(params?: Params) {
    const _pa = params ? { ...params, current: 1 } : { current: 1 };
    setState(
      produce(state, (df) => {
        df.innerParams = _pa;
        df.loading = true;
      }),
    );
  }

  return {
    hasStorage,
    list: state.list,
    loading: state.loading,
    errMsg: state.errMsg,
    innerParams: state.innerParams,
    paginationConfig,
    setList,
    setLoading,
    setErrMsg,
    setParams,
    resetParam,
    updateList,
    push,
    unshift,
    pop,
    shift,
    splice,
  };
}

export default usePagination;
