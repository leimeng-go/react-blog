import { useMount } from 'ahooks';

// setNavShow?: Function  ？表示这个参数可选，类型是Function
const useTop = (setNavShow?: Function) => {
  useMount(() => {
    // window.scrollTo(0,0) 是一个JavaScript方法，用于将浏览器窗口滚动到指定的坐标位置。0,0表示页面的左上角
    window.scrollTo(0, 0);
    setNavShow?.(true);
  });
};

export default useTop;
