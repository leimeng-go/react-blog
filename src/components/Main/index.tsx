import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// 导入一个错误边界组件，用于捕获其子组件b
import ErrorBoundary from '@/components/ErrorBoundary';

import s from './index.scss';

// Suspense 组件允许组件等待某些操作完成，显示一个回退内容（在这里为空标签<></>）
// 使用lazy函数，组件被动态导入，这意味着他们将作为单独的chunk被加载，仅在需要时才加载这些代码。
// webpackPrefetch: true 是一个Webpack魔法注释，指示Webpack在空闲时间预取这个chunk,以加快后续导航的速度

const Home = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Home'));
const Articles = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Articles'));
const Classes = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Classes'));
const Tags = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Tags'));
const Say = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Say'));
const Msg = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Msg'));
const Link = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Link'));
const Show = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Show'));
const Log = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Log'));
const About = lazy(() => import(/* webpackPrefetch:true */ '@/pages/About'));
const Post = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Post'));
const ArtDetail = lazy(() => import(/* webpackPrefetch:true */ '@/pages/ArtDetail'));

const Main: React.FC = () => {
  return ( 
    <main className={s.main}>
      <div className={s.center}>
        <ErrorBoundary>  
          <Suspense fallback={<></>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='articles' element={<Articles />} />
              <Route path='classes' element={<Classes />} />
              <Route path='tags' element={<Tags />} />
              <Route path='say' element={<Say />} />
              <Route path='msg' element={<Msg />} />
              <Route path='link' element={<Link />} />
              <Route path='show' element={<Show />} />
              <Route path='log' element={<Log />} />
              <Route path='about' element={<About />} />
              <Route path='post' element={<Post />} />
              <Route path='artDetail' element={<ArtDetail />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Main;
