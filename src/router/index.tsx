// src/router->index.js  (配置路由映射)
// import React from 'react'
// const RMDiscover = React.lazy(() => import('@/pages/Discover'))
// const RMRecommend = React.lazy(() => import('@/pages/Discover/subpages/Recommend'));
// const RMRanking = React.lazy(() => import('@/pages/Discover/subpages/Ranking'));
// const RMSongs = React.lazy(() => import('@/pages/Discover/subpages/Songs'));
// const RMDjradio = React.lazy(() => import('@/pages/Discover/subpages/Djradio'));
// const RMArtist = React.lazy(() => import('@/pages/Discover/subpages/Artist'));
// const RMAlbum = React.lazy(() => import('@/pages/Discover/subpages/Album'));
// const RMPlayer = React.lazy(() => import('@/pages/Discover/subpages/Player'));
import {Redirect} from 'react-router-dom';
import React from 'react';
import Article from '@/pages/Article';
import Home from '@/pages/Home';
import Friend from '@/pages/Firend';

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/home" />,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/article",
    component: Article,
  },
  {
    path: "/friend",
    component: Friend,
  },
];

export default routes;