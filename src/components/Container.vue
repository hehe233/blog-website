<template>
  <div
    class="kur_container kur_main_container animated showInUp revert"
    :class="`page-${props.viewName}`"
  >
    <div class="kur_main">
      <div :class="className">
        <slot />
      </div>
      <div class="kur_load" v-if="props.viewName === 'home'">查看更多</div>
    </div>
    <Aside v-if="hasSideBar" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

const props = defineProps({
  viewName: {
    type: String as PropType<'home' | 'journals' | 'links' | 'sheet' | 'archives' | 'categories' | 'tags' | 'search'>,
    required: true,
  }
});

const hasSideBar = computed(() => {
  return ['search', 'sheet'].includes(props.viewName)
});

const className = computed(() => {
  return {
    kur_index: ['home', 'archives', 'categories', 'tags'].includes(props.viewName),
    kur_archives__filing: props.viewName === 'archives',
    kur_archive: props.viewName === 'search',
    kur_detail: [ 'journals', 'links', 'sheet' ].includes(props.viewName),
  }
});
</script>

<style lang="scss">
  .kur_main_container {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-top: 20px;
    &.revert {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: reverse;
      -ms-flex-direction: row-reverse;
      flex-direction: row-reverse;
      .kur_aside {
        margin-left: 0;
        margin-right: 0.9375rem;
      }
    }
  }
  .kur_main {
    min-width: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-bottom: 0.9375rem;
  }
  .kur_index {
    overflow-y: hidden;
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
  }
  .kur_detail {
    position: relative;
    margin-bottom: 0.9375rem;
    padding: 1.25rem;
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
  }
  .page-journals {
    .kur_detail {
      position: relative;
      overflow-y: hidden;
    }
  }
  .kur_archives__filing {
    background: var(--background);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-wrap);
  }
  .kur_archive {
    padding: 0 0.9375rem;
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
  }
  .kur_load {
    position: relative;
    z-index: 1;
    margin: 15px auto 0;
    width: 120px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 16px;
    cursor: pointer;
    background: var(--background);
    -webkit-transition: -webkit-transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
    &:hover {
      color: var(--theme);
    }
  }
</style>