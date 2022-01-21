import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";

import Header from "@/components/BlogHeader";
import routes from "@/router";
import './App.less';
import "antd/dist/antd.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="content">
        <Header />
        <div style={{display: 'flex', justifyContent: 'center'}}>{renderRoutes(routes)}</div>
      </div>
    </BrowserRouter>
  );
};

export default memo(App);
