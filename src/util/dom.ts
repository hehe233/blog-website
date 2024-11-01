export const DomUtil = {
  /**
   * 获取元素距离页面顶部高度
   * @param el
   */
  getElemTop (el: HTMLElement) {
    if (!el) {
      return 0;
    }
    let actualTop = el.offsetTop;
    let curElem = el.offsetParent as HTMLElement | null;
    while (curElem) {
      actualTop += curElem.offsetTop;
      curElem = curElem.offsetParent as HTMLElement | null;
    }
    return actualTop;
  },

  smoolScrollBody (top: number) {
    try {
      document.documentElement.scrollTo({
        top,
        behavior: 'smooth',
      });
      document.body.scrollTo({
        top,
        behavior: 'smooth',
      });
    } catch (e) {
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
    }
  },
}