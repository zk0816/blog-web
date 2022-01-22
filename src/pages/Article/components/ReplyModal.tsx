import { CommentType } from '@/pages/Article/api';
import React from 'react';
import {Modal, Form, message} from 'antd';
import CommentCard from '@/components/CommentCard';
import * as API from '../api';
import _ from 'lodash';

interface Props {
  setLoading?: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  row: CommentType;
  visible: boolean;
}

const ReplyModal: React.FC<Props> = (props: Props) => {
  const {row,setLoading,setVisible,visible} = props;
  const [form] = Form.useForm();

  const handleOk = (value:any) => {
    const params = {
      commentid: row.commentId,
      replyName: value.name,
      replyAvatar: value.avatar,
      replyContent: value.content,
      replyEmail: value.email
    };
    if (!params.replyContent) return message.error("请填写内容");
    if (!params.replyName) return message.error("请填写昵称");
    if (!params.replyEmail) return message.error("请填写邮箱");
    API.addReply(params)
      .then((res) => {
        message.success("回复成功");
        const _obj = JSON.stringify({ ...params});
        localStorage.setItem("comment", _obj);
        form.setFieldsValue({
          content: undefined,
        });
        setLoading && setLoading(true);
        setVisible(false);
      })
      .catch((err) => message.error(err.message));
  }
  return (
    <Modal
      visible={visible}
      onOk={form.submit}
      onCancel={() => setVisible(false)}
      width={800}
      centered
      cancelText="取消"
      okText="发送"
    >
      <Form form={form} onFinish={_.debounce(handleOk,1000)}>
        <Form.Item>
          <CommentCard
            title={
              <span>
                回复给
                <span style={{ color: "#6193bb" }}>{row.commentName}</span>:
              </span>
            }
            form={form}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ReplyModal;