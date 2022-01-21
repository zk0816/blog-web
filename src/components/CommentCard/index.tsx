/**
 * 评论组件 
 * https://q1.qlogo.cn/g?b=qq&nk=xxxxxxxx&s=640 获取头像
 */
import { Avatar, Input, Comment,Form} from 'antd';
import React, {useState} from 'react';
import { UserOutlined} from "@ant-design/icons";
import _ from 'lodash';

interface Props {
  title: React.ReactNode
  form: any
  [key: string] : any
}

export interface Comment {
  commentAvatar?: string //评论图片
  commentName?: string  //评论名称
  commentContent?: string //评论内容
  commentEmail?: string //评论邮箱
}

const Index: React.FC<Props> = React.forwardRef((props: Props, ref: any) => {
  const {title, form} = props;
  const [avatar,setAvatar] = useState('')

  React.useEffect(() => {
    const _comment = localStorage.getItem("comment");
    if (_comment) {
      const _obj = JSON.parse(_comment);
      form.setFieldsValue(({
        avatar: _obj.commentAvatar,
        name: _obj.commentName,
        content: _obj.commentContent,
        email: _obj.commentEmail
      }))
      setAvatar(_obj.commentAvatar);
    }
  },[])

  const onBlurName = (value: string) => {
    const _number = /^\d+$/.test(value || "");
    if (_number) {
      form.setFieldsValue({
        avatar: `https://q1.qlogo.cn/g?b=qq&nk=${value}&s=640`,
        name: undefined,
        email: `${value}@qq.com`,
      });
      setAvatar(`https://q1.qlogo.cn/g?b=qq&nk=${value}&s=640`);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        //marginTop: 30,
      }}
    >
      <div style={{ color: "black", fontSize: 20 }}>{title}</div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <div>
          <Form.Item name="avatar">
            <Avatar
              src={avatar}
              icon={<UserOutlined />}
              size={50}
              style={{ borderRadius: 5 }}
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1, marginLeft: 10 }}>
          <div style={{ display: "flex" }}>
            <Form.Item name="name">
              <Input
                addonBefore="昵称"
                placeholder="请输入qq号"
                style={{ width: 300, marginRight: 20 }}
                onBlur={(e) => onBlurName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                addonBefore="邮箱"
                placeholder="请输入邮箱"
                style={{ width: 300 }}
              />
            </Form.Item>
          </div>
          <div style={{ marginTop: 5 }}>
            <Form.Item name="content">
              <Input.TextArea
                placeholder="可以在昵称输入qq号自动获取头像和邮箱"
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Index;