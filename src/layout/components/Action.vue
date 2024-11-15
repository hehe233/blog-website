<template>
  <div class="kur_action">
    <div class="kur_action_item mode" @click="onClickChangeTheme">
      <svg class="mode-light" :class="{actived: state.isLight}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
        <path d="M234.24 512a277.76 277.76 0 1 0 555.52 0 277.76 277.76 0 1 0-555.52 0zM512 187.733a42.667 42.667 0 0 1-42.667-42.666v-102.4a42.667 42.667 0 0 1 85.334 0v102.826A42.667 42.667 0 0 1 512 187.733zm-258.987 107.52a42.667 42.667 0 0 1-29.866-12.373l-72.96-73.387a42.667 42.667 0 0 1 59.306-59.306l73.387 72.96a42.667 42.667 0 0 1 0 59.733 42.667 42.667 0 0 1-29.867 12.373zm-107.52 259.414H42.667a42.667 42.667 0 0 1 0-85.334h102.826a42.667 42.667 0 0 1 0 85.334zm34.134 331.946a42.667 42.667 0 0 1-29.44-72.106l72.96-73.387a42.667 42.667 0 0 1 59.733 59.733l-73.387 73.387a42.667 42.667 0 0 1-29.866 12.373zM512 1024a42.667 42.667 0 0 1-42.667-42.667V878.507a42.667 42.667 0 0 1 85.334 0v102.826A42.667 42.667 0 0 1 512 1024zm332.373-137.387a42.667 42.667 0 0 1-29.866-12.373l-73.387-73.387a42.667 42.667 0 0 1 0-59.733 42.667 42.667 0 0 1 59.733 0l72.96 73.387a42.667 42.667 0 0 1-29.44 72.106zm136.96-331.946H878.507a42.667 42.667 0 1 1 0-85.334h102.826a42.667 42.667 0 0 1 0 85.334zM770.987 295.253a42.667 42.667 0 0 1-29.867-12.373 42.667 42.667 0 0 1 0-59.733l73.387-72.96a42.667 42.667 0 1 1 59.306 59.306l-72.96 73.387a42.667 42.667 0 0 1-29.866 12.373z"></path>
      </svg>
      <svg class="mode-dark" :class="{actived: !state.isLight}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
        <path d="M587.264 104.96c33.28 57.856 52.224 124.928 52.224 196.608 0 218.112-176.128 394.752-393.728 394.752-29.696 0-58.368-3.584-86.528-9.728C223.744 832.512 369.152 934.4 538.624 934.4c229.376 0 414.72-186.368 414.72-416.256 1.024-212.992-159.744-389.12-366.08-413.184z"></path>
        <path d="M340.48 567.808l-23.552-70.144-70.144-23.552 70.144-23.552 23.552-70.144 23.552 70.144 70.144 23.552-70.144 23.552-23.552 70.144zM168.96 361.472l-30.208-91.136-91.648-30.208 91.136-30.208 30.72-91.648 30.208 91.136 91.136 30.208-91.136 30.208-30.208 91.648z"></path>
      </svg>
    </div>
    <div class="kur_action_item back2top" :class="{actived: !state.isTop}" @click="onClickBackToTop">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
        <path d="M725.902 498.916c18.205-251.45-93.298-410.738-205.369-475.592l-6.257-3.982-6.258 3.414c-111.502 64.853-224.711 224.142-204.8 475.59-55.751 53.476-80.214 116.623-80.214 204.8v15.36l179.2-35.27c11.378 40.39 58.596 69.973 113.21 69.973 54.613 0 101.262-29.582 112.64-68.836l180.337 36.41v-15.36c-.569-89.885-25.031-153.6-82.489-206.507zM571.733 392.533c-33.564 31.29-87.04 28.445-118.329-5.12s-28.444-87.04 5.12-117.76c33.565-31.289 87.04-28.444 118.33 5.12s28.444 86.471-5.12 117.76zm-56.32 368.64c-35.84 0-64.284 29.014-64.284 64.285 0 35.84 54.044 182.613 64.284 182.613s64.285-146.773 64.285-182.613c0-35.271-29.014-64.285-64.285-64.285z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DomUtil } from '@/util/dom';
import { onMounted, onUnmounted, reactive } from 'vue';

const state = reactive({
  isLight: true,
  isTop: true,
  scrollTimer: 0,
});
const onClickChangeTheme = () => {
  if (state.isLight) {
    state.isLight = false;
    document.documentElement.setAttribute('data-mode', 'dark');
  } else {
    state.isLight = true;
    document.documentElement.setAttribute('data-mode', 'light');
  }
}

const onClickBackToTop = () => {
  DomUtil.smoolScrollBody(0);
}

const setShowTip = () => {
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 10) {
    state.isTop = false;
  } else {
    state.isTop = true;
  }
}

const onScroll = () =>{
  state.scrollTimer && window.clearTimeout(state.scrollTimer);
  state.scrollTimer = window.setTimeout(setShowTip, 20);
}

onMounted(() => {
  document.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  document.removeEventListener('scroll', onScroll);
});

</script>

<style lang="scss" scoped>
  .kur_action {
    pointer-events: none;
    position: fixed;
    bottom: px2rem(90px);
    right: px2rem(30px);
    z-index: 90;
    &_item {
      position: relative;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      width: px2rem(40px);
      height: px2rem(40px);
      background: var(--sib-background);
      border-radius: 50%;
      cursor: pointer;
      -webkit-box-shadow: 0 0 px2rem(10px) rgba(0,0,0,.1),0 5px 20px rgba(0,0,0,.2);
      box-shadow: 0 0 px2rem(10px) rgba(0,0,0,.1),0 5px 20px rgba(0,0,0,.2);
      pointer-events: auto;
      margin-bottom: px2rem(15px);
      @include display-flex-center;
      &.mode {
        pointer-events: auto;
        margin-bottom: px2rem(15px);
        svg {
          -webkit-transform: scale(0);
          transform: scale(0);
          opacity: 0;
          -webkit-transition: opacity .85s,-webkit-transform .85s;
          transition: transform .85s,opacity .85s;
          transition: transform .85s,opacity .85s,-webkit-transform .85s;
          &.actived {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      &.back2top {
        pointer-events: none;
        visibility: hidden;
        -webkit-transform: scale(0);
        transform: scale(0);
        -webkit-transition: visibility .35s,-webkit-transform .35s;
        transition: visibility .35s,transform .35s;
        transition: visibility .35s,transform .35s,-webkit-transform .35s;
        &.actived {
          pointer-events: auto;
          visibility: visible;
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
      svg {
        position: absolute;
        width: px2rem(25px);
        height: px2rem(25px);
        fill: var(--theme);
      }
    }
  }
</style>