import useInitial from '@/hooks/useInitail';
import React, { useRef } from "react";
import { Viewer} from "@bytemd/react";
import * as API from './api';
import gfm from "@bytemd/plugin-gfm";
import highlightssr from "@bytemd/plugin-highlight-ssr";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import math from "@bytemd/plugin-math";
import mermaid from "@bytemd/plugin-mermaid";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid_zhHans from "@bytemd/plugin-mermaid/lib/locales/zh_Hans.json";
import math_zhHans from "@bytemd/plugin-math/lib/locales/zh_Hans.json";
import gfm_zhHans from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import CommentCard from '@/components/CommentCard';

import "bytemd/dist/index.min.css";
import "juejin-markdown-themes/dist/channing-cyan.min.css";
import "highlight.js/styles/a11y-dark.css";

import MarkdownNavbar from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import "./index.less";
import { Button, message, Avatar, Comment, Form } from "antd";
import { useParams } from "react-router-dom";
import { CommentList, CommentType, Reply } from './api';
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import ReplyModal from '@/pages/Article/components/ReplyModal';
import _ from 'lodash'
import Content from '@/components/Content';
import IconFont from '@/icon';
import moment from 'moment';


const plugins = [
  breaks(),
  footnotes(),
  frontmatter(),
  gfm({ locale: gfm_zhHans }),
  highlight(),
  highlightssr(),
  math({ locale: math_zhHans }),
  mermaid({ locale: mermaid_zhHans }),
  mediumZoom(),
  // Add more plugins here
];


const Article: React.FC = () => {
  const {artid} = useParams<any>();
  const {data} = useInitial(API.getArticleDetail,{content: ''},{artid: Number(artid)})
  const {data: commentList, setLoading: setCommentLoading} = useInitial(API.findCommentList,[], {artid: Number(artid)})
  const [visible,setVisible] = React.useState(false);
  const [row, setRow] = React.useState<CommentType>({});
  const [form] = Form.useForm();

  const onSave = (values:any) => {
    const params: API.Comment = {
      artid,
      commentAvatar: values.avatar,
      commentEmail: values.email,
      commentContent: values.content,
      commentName: values.name
    };
    if (!params.commentContent) return message.error("请填写内容");
    if (!params.commentName) return message.error("请填写昵称");
    if (!params.commentEmail) return message.error("请填写邮箱");
    API.addComment(params).then(res => {
      message.success("评论成功");
      const _obj = JSON.stringify({...params,commentContent: undefined})
      localStorage.setItem('comment', _obj);
      form.setFieldsValue({
        content: undefined
      })
      setCommentLoading(true);
    }).catch(err => message.error(err.message));
  }
  return (
    <div>
      <Content height="8rem">
        <div className="article-content">
          <div className="info">
            <div className="tag">
              {data.tag &&
                data.tag.split(",").map((e, index) => (
                  <div key={`index_${index}`} className="tagtitle">
                    {e}
                  </div>
                ))}
            </div>
            <div>
              <div className="left">
                <IconFont type="icon-icon_category" className="icon" />
                {data.category}
              </div>
            </div>
          </div>
          <div className="infotime">
            <div className="left">
              <IconFont type="icon-calendar-full" className="icon" />
              最新更新:{moment(data.time).format("YYYY-MM-DD")}
            </div>
          </div>
          <div className="article-container">
            <Viewer value={data.content} plugins={plugins} />
          </div>
          <div className="nav-container">
            {/* <div className="list">目录</div> */}
            <MarkdownNavbar source={data.content} />
          </div>
          <Form
            form={form}
            onFinish={_.debounce(onSave, 1000)}
            style={{ backgroundColor: "#FFF", marginTop: "2rem" }}
          >
            <Form.Item>
              <CommentCard title="评论" form={form} />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: "#fff",
                  padding: "0px 20px 10px 20px",
                }}
              >
                <Button type="primary" htmlType="submit">
                  发送
                </Button>
              </div>
            </Form.Item>
          </Form>
          <div className="comment">
            {commentList.map((e: CommentList) => (
              <Comment
                style={{ maxWidth: 720 }}
                key={e.commentId}
                actions={[
                  <span key="comment-nested-reply-to">
                    <MessageOutlined
                      onClick={() => {
                        setVisible(true);
                        setRow(e);
                      }}
                    />
                  </span>,
                ]}
                author={
                  <span
                    style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
                  >
                    {e.commentName}
                  </span>
                }
                avatar={
                  <Avatar
                    src={e.commentAvatar}
                    icon={<UserOutlined />}
                    size={50}
                    style={{ borderRadius: 5 }}
                  />
                }
                content={
                  <div style={{ color: "black" }}>{e.commentContent}</div>
                }
              >
                {e.replys.map((v: Reply) => (
                  <Comment
                    key={v.replyId}
                    style={{
                      background: "rgba(247,248,250,.7)",
                      paddingInline: 20,
                      maxWidth: 720,
                    }}
                    author={
                      <span
                        style={{
                          color: "black",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {v.replyName}
                      </span>
                    }
                    avatar={
                      <Avatar
                        src={v.replyAvatar}
                        icon={<UserOutlined />}
                        size={50}
                        style={{ borderRadius: 5 }}
                      />
                    }
                    content={
                      <div style={{ color: "black" }}>{v.replyContent}</div>
                    }
                  />
                ))}
              </Comment>
            ))}
            <ReplyModal
              visible={visible}
              setVisible={setVisible}
              setLoading={setCommentLoading}
              row={row}
            />
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Article;