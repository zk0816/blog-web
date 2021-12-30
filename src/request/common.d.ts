export declare namespace common {
  interface Action<T> {
    type: string;
    payload?: T;
    success?: (val?: any) => any;
    error?: (val?: any) => any;
    [key: string]: any;
  }

  interface Params {
    [key: string]: any;
  }

  /**
   * @type P: Type of payload
   * @type C: Type of callback
   */
  export type Dispatch = <P = any, C = (payload: P) => void>(action: {
    type: string;
    payload?: P;
    callback?: C;
    [key: string]: any;
  }) => any;

  interface Pagination {
    current: number;
    pageSize: number;
    total: number;
    lastPage?: boolean;
  }

  interface PaginationDateset<T> {
    list: T[];
    pagination: Pagination;
  }

  interface PageParams {
    current?: number,
    pageSize?: number,
    [key: string]: any
  }

  interface Page<T> {
    /**
     * 当前页
     */
    current: number;

    /**
     * 当前页
     */
    currentPage: number;
    data: T[];

    /**
     * 当前页的最后一项
     */
    endIndex: number;

    /**
     * 当前页的第一项
     */
    startIndex: number;
    extInfo: string;

    /**
     * 是否是最后一项
     *
     * 默认值： false
     */
    lastPage: boolean;

    /**
     * 下一页
     */
    nextPage: number;

    /**
     * 上一页
     */
    previousPage: number;

    pageSize: number;

    /**
     * 总页数
     */
    total: number;

    /**
     * 单位
     *
     * 默认：条
     */
    unit: string;
  }

  interface EffectsMap {
    /**
     * put 返回值大概如下
     * {
        '@@redux-saga/IO': true,
        'cars/query': payload
      }
     */
    put: <T>(action: Action<T>) => Object;
    call: (apiFunc: Function, Params: any) => any;
    select: Function;
    take: Function;
    cancel: Function;
    [key: string]: any;
  }

  /**
   * 分页查询参数
   */
  interface PaginationParam {
    /**
     * 当前页
     */
    current?: number;
    /**
     * 每页条数
     */
    pageSize?: number;
  }

  /**
   * searchInput
   * antd -> Table -> Column -> props -> filterDropdown 属性回调传入的参数
   */
  interface FilterDropdownProps {
    clearFilters: Function;
    confirm: Function;
    filters: any;
    getPopupContainer: Function;
    prefixCls: string;
    selectedKeys: any[];
    setSelectedKeys: Function;
  }

  /**
   * 表单组件中，form.getFieldDecorator 往子组件中注入的默认参数
   */
  interface FieldDecorator {
    /**
     * valuePropName指定的值，默认为value，具体的值视情况而定
     */
    value?: any;

    /**
     * trigger 指定的用于监听数据变化的回调函数，默认为onChange，当内部的值改变时，需要调用一次该方法
     */
    onChange?: any;

    /**
     * 表单值的字段，与 getFieldDecorator 第一个字段保持一致
     */
    id?: string;

    /**
     * 字段键值对
     */
    "data-__field"?: any;

    /**
     * 描述所有配置信息，options
     */
    "data-__meta"?: any;
  }  
}
