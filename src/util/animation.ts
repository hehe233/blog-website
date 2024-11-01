declare var J_IS_MOBILE: boolean;

let scrollTimer = 0;

export const BounceInUp = {
  checkNeedAnimationList () {
    let listSet = new Set<HTMLElement>(document.querySelectorAll('[need-animation]'));
    let hasAnimatedList: HTMLElement[] = [...document.querySelectorAll('[need-animation].animated')] as HTMLElement[];
    if (listSet.size === hasAnimatedList.length) {
      return [];
    }
    hasAnimatedList.forEach(dom => {
      if (listSet.has(dom)) {
        listSet.delete(dom);
      }
    });
    return [...listSet];
  },

  isElemInViewport (el: HTMLElement | null) {
    if (!el) {
      return false;
    }
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const rect = el.getBoundingClientRect();
    const top = rect.top;
    const bottom = rect.bottom;
    let deltaHeight = 100;
    let deltaBottom = 150;
    if (typeof J_IS_MOBILE === 'boolean' && J_IS_MOBILE) {
      deltaHeight = 20;
      deltaBottom = 20;
    }
    return (top > 0 && top <= viewPortHeight - deltaHeight) || (bottom > deltaBottom && bottom <= viewPortHeight - deltaHeight);
  },

  addAnimation () {
    let list = BounceInUp.checkNeedAnimationList();
    let animatedIndex = 1;
    list.forEach(el => {
      let isInviewport = BounceInUp.isElemInViewport(el);
      if (isInviewport) {
        setTimeout(() => {
          el.setAttribute('visibility', '');
          el.setAttribute('animated', '');
          el.style.animationName = el.getAttribute('data-animate') || 'bounceInUp';
        }, 100 * animatedIndex);
        animatedIndex++;
      }
    });
  },

  onScroll () {
    scrollTimer && window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(BounceInUp.addAnimation, 40);
  },

  reset () {
    const list = document.querySelectorAll('[need-animation]');
    [...list].forEach(el => {
      try {
        el.classList.remove('animated');
        el.classList.remove('visibility');
      } catch (e) {
        el.className = el.className.replace('animated', '').replace('visibility', '');
      }
      (el as HTMLElement).style.animationName = 'none';
    });
  },

  init () {
    setTimeout(() => {
      BounceInUp.addAnimation();
      document.addEventListener('scroll', BounceInUp.onScroll);
    }, 320);
  },

  destroy () {
    document.removeEventListener('scroll', BounceInUp.onScroll);
  },
}
