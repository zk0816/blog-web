import { Input, Modal } from 'antd'
import React, { useMemo, useState } from 'react'
import * as API from "@/common/api";
import usePagination from '@/hooks/usePagination';
import _ from 'lodash';
import IconFont from '@/icon';
import './index.less'
import List from '@/components/Header/components/List';
import { MyContext } from '@/components/Header';



const HeadModal = () => {
  const [delay, setDelay] = useState(true);
  const { list, setParams, setList } = usePagination(
    API.getArticle,
    { pageSize: 10, current: 1 },
    { delay }
  ); //查文章

  const onSearch = _.debounce((value: string) => {
    if (value) {
      setDelay(false);
      setParams({ keywords: value }, true);
    } else {
      setList([]);
    }
    }, 1000);

  const HeadSearch = useMemo(() => (
    <MyContext.Consumer>
      {(value) => (
        <div>
          <div
            className="titleLink"
            style={{ color: "#333" }}
            onClick={() => value.setVisible(true)}
          >
            <IconFont type="icon-sousuo1" className="icon" />
            <div className="title">搜索</div>
          </div>
          <Input
            bordered={false}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}
    </MyContext.Consumer>
  ),[delay]);

  return (
    <MyContext.Consumer>
      {(value) => (
        <Modal
          title={HeadSearch}
          visible={value.visible}
          onCancel={() => value.setVisible(false)}
          footer={null}
          closable={false}
        >
          <List data={list} />
        </Modal>
      )}
    </MyContext.Consumer>
  );
}

export default HeadModal;