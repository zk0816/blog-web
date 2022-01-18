import useInitial from '@/hooks/useInitail';
import React from 'react';
import {RouteComponentProps } from "react-router-dom";
import { Viewer } from "@bytemd/react";
import * as API from './api';
import gfm from "@bytemd/plugin-gfm";
import highlightssr from "@bytemd/plugin-highlight-ssr";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";
import mermaid from "@bytemd/plugin-mermaid";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid_zhHans from "@bytemd/plugin-mermaid/lib/locales/zh_Hans.json";
import math_zhHans from "@bytemd/plugin-math/lib/locales/zh_Hans.json";
import gfm_zhHans from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";

import "bytemd/dist/index.min.css";
import "juejin-markdown-themes/dist/channing-cyan.min.css";
import "highlight.js/styles/a11y-dark.css";

import MarkdownNavbar from "markdown-navbar";
// The default style of markdown-navbar should be imported additionally
import "markdown-navbar/dist/navbar.css";
import "./index.less";

const plugins = [
  breaks(),
  footnotes(),
  frontmatter(),
  gemoji(),
  gfm({ locale: gfm_zhHans }),
  highlight(),
  highlightssr(),
  math({ locale: math_zhHans }),
  mermaid({ locale: mermaid_zhHans }),
  mediumZoom(),
  // Add more plugins here
];


const Article = (props: RouteComponentProps) => {
  const artid = props.location.search.slice(1);
  const {data} = useInitial(API.getArticleDetail,{content: ''},{artid: Number(artid)})

  console.log(data)
  return (
    <div>
      <div className="article-container">
        <Viewer value={data.content} plugins={plugins} />
      </div>
      <div className="nav-container">
        <div style={{color: 'black', fontSize: 20,textAlign: 'center'}}>目录</div>
        <MarkdownNavbar source={data.content} />
      </div>
    </div>
  );
};

export default Article;