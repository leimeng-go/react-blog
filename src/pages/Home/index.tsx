import { useMount, useSafeState, useTitle } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '@/components/PageTitle';
import { setNavShow } from '@/redux/actions';
import { siteTitle } from '@/utils/constant';
import useTop from '@/utils/hooks/useTop';

import Aside from './Aside';
import s from './index.scss';
import Section from './Section';

interface Props {
  setNavShow?: Function;
}

const getPoem = require('jinrishici');

const Home: React.FC<Props> = ({ setNavShow }) => {
  // useTitle 是一个用于设置页面标题的Hook.
  useTitle(siteTitle);
  // useTop 自定义的hook
  useTop(setNavShow);

  // useSafeState 是一个安全版本的`useState`.当组件卸载后，尝试设置状态可能会导致内存泄漏和警告。
  const [poem, setPoem] = useSafeState('');
  // useMount 是用来在组件初次渲染时执行某些操作的Hook.
  useMount(() => {
    getPoem.load(
      (res: {
        data: {
          content: string;
        };
      }) => setPoem(res.data.content)
    );
  });

  return (
    <>
      <PageTitle title={siteTitle} desc={poem || ''} className={s.homeTitle} />
      <div className={s.body}>
        <Section />
        <Aside />
      </div>
    </>
  );
};

export default connect(() => ({}), { setNavShow })(Home);
