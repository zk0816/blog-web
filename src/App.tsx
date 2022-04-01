import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

import Header from "@/components/Header";
import Footer from '@/components/Footer';
import routes from "@/router";
import './App.less';
import "antd/dist/antd.css";

const App = () => {
  return (
    <HashRouter>
      <div className="content">
        <Header />
        {renderRoutes(routes)}
        <Footer />
      </div>
    </HashRouter>
  );
};

export default memo(App);
