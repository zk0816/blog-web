import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

import Header from "@/components/BlogHeader";
import routes from "@/router";
import './App.less';
import "antd/dist/antd.css";

const App = () => {
  return (
    <HashRouter>
      <div className="content">
        {React.useMemo(() => (
          <Header />
        ), [])}
        {renderRoutes(routes)}
        {/* <div style={{display: 'flex', justifyContent: 'center', borderTop: '1px #E5E5E5 solid'}}>{renderRoutes(routes)}</div> */}
      </div>
    </HashRouter>
  );
};

export default memo(App);
