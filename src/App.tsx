import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

import Header from "@/components/BlogHeader";
import routes from "@/router";
// import "antd/dist/antd.css";

const App = () => {
  return (
    <HashRouter>
      <Header />
      {renderRoutes(routes)}
    </HashRouter>
  );
};

export default memo(App);
