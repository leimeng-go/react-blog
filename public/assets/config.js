// 用于设置字体大小的函数，通过获取页面的<html>元素，然后将其字体大小设置为窗口宽度除以450，并加上px单位。
function inMobile() {
  document.getElementsByTagName('html')[0].style.fontSize =
    document.documentElement.clientWidth / 450 + 'px';
}
// 当DOM内容加载完成时执行inMobile函数
document.addEventListener('DOMContentLoaded', inMobile);
// 当窗口大小改变的时，执行inMobile函数，以便在不同屏幕尺寸下更新字体大小
window.onresize = inMobile;
