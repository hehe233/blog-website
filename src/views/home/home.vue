<template>
  <div class="kur_index__article">
    <div class="kur_index__title">
      <ul class="kur_index__title-title passage-list-tabs">
        <li
          v-for="tab in tabs"
          :key="tab.value"
          class="item"
          :class="{ actived: tab.value === state.activedTab }"
          @click="onClickTab(tab.value)">{{ tab.label }}</li>
        <li class="line" :style="{left: `${(state.activedTab - 1) * 56}px`}"></li>
      </ul>
    </div>
    <div class="kur_index__list">
      <div class="kur_list">
        <ArticleItem v-for="article in state.articles" :key="article.id" :article="article"/>
      </div>
        <ArticleLoading v-show="state.isLoading" />
        <ArticleEmpty v-show="state.articles.length"  />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BounceInUp } from '@/util/animation';
import { nextTick, onMounted, onUnmounted, reactive, watch } from 'vue';

import ArticleItem from '@/components/Article/ArticleItem.vue';
import ArticleLoading from '@/components/Article/ArticleLoading.vue';
import ArticleEmpty from '@/components/Article/ArticleEmpty.vue';
import { getArticleList } from '@/api/node';
import { ArticleParams, BaseParams, IArticle } from '@/types';

const tabs = [
  {
    label: '最新文章',
    value: 1,
  },
  {
    label: '热门文章',
    value: 2,
  },
];

const state = reactive({
  articles: [] as IArticle[],
  pagination: {
    pageLimit: 10,
    currentPage: 1,
  } as BaseParams,
  activedTab: 1 as number,
  isLoading: false as boolean,
});

const getArticleLists = async () => {
  const reqData: ArticleParams = {
    ...state.pagination,
    filter: {}
  }
  switch (state.activedTab) {
    case 1:
      reqData.filter!.sorts = ['-created']
      break;
    case 2:
      reqData.filter!.sticky = true;
      break;
  }
  try {
    state.isLoading = true;
    const { data } = await getArticleList(reqData);
    state.articles = data;
  } catch (error) {
    console.error('[getArticleLists]', error);
  } finally {
    state.isLoading = false;
  }
}

const onClickTab = (activedTab: number) => {
  state.activedTab = activedTab;
  state.pagination.currentPage = 1;
  state.articles = [];
  getArticleLists();
}

watch(() => state.articles, () => {
  nextTick(() => BounceInUp.onScroll());
});

onMounted(async () => {
  BounceInUp.init();
  getArticleLists();
});

onUnmounted(() => {
  BounceInUp.destroy();
});
</script>

<style lang="scss" scoped>
  .kur_index {
    &__article {
      padding: 0 px2rem(15px);
    }
    &__title {
      border-bottom: 1px solid var(--classC);
      @include display-flex-center;

      &-title {
        position: relative;
        color: var(--theme);
        font-weight: 500;
        height: px2rem(44px);
        line-height: px2rem(44px);
        @include display-flex-center;

        .item {
          cursor: pointer;
          margin-right: px2rem(16px);
          font-size: px2rem(14px);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: var(--routine);
          -webkit-transition: color 0.35s;
          transition: color 0.35s;
          &.actived {
            color: var(--theme);
            font-weight: 700;
          }
        }
        .line {
          position: absolute;
          width: px2rem(56px);
          bottom: -1px;
          left: 0;
          height: 2px;
          content: "";
          background: var(--theme);
          border-radius: 1px;
          -webkit-transition: left 0.35s, width 0.35s;
          transition: left 0.35s, width 0.35s;
        }
      }
    }
    &__list {
      &__item {
        will-change: transform;
        background: var(--background);
      }
    }
  }
</style>