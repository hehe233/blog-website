<template>
  <div class="kur_index">
    <div class="kur_index__article">
      <div class="kur_index__title">
        <ul class="kur_index__title-title passage-list-tabs">
          <li
            v-for="tab in tabs"
            :key="tab.value"
            class="item"
            :class="{ actived: tab.value === state.activedTab }"
            @click="onClickTab(tab.value)">{{ tab.label }}</li>
          <li class="line" :style="{left: `${(state.activedTab - 1) * 72}px`}"></li>
        </ul>
      </div>
      <div class="kur_index__list">
        <div class="kur_list">
          <ArticleItem :urlPrefix="state.urlPrefix" v-for="article in state.articles" :key="article.id" :article="article"/>
        </div>
          <ArticleLoading v-show="state.isLoading" />
          <ArticleEmpty v-show="state.pagination.total"  />
      </div>
    </div>
  </div>
  <div class="kur_load" @click="onLoadMore" v-show="state.pagination.total !== state.articles.length || state.isLoading">{{state.isLoading ? '加载中' :'查看更多'}}</div>
</template>

<script lang="ts" setup>
import { BounceInUp } from '@/util/animation';
import { nextTick, onMounted, onUnmounted, reactive, watch } from 'vue';

import ArticleItem from '@/components/Article/ArticleItem.vue';
import ArticleLoading from '@/components/Article/ArticleLoading.vue';
import ArticleEmpty from '@/components/Article/ArticleEmpty.vue';
import { getArticleList } from '@/api/node';
import { ArticleParams, IArticle, IPagination } from '@/types';

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
    pageLimit: 1,
    currentPage: 1,
    total: 0,
  } as IPagination,
  activedTab: 1 as number,
  isLoading: false as boolean,
  urlPrefix: '' as string,
});

const getArticleLists = async () => {
  const reqData: ArticleParams = {
    currentPage: state.pagination.currentPage,
    pageLimit: state.pagination.pageLimit,
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
    const { data, meta, links } = await getArticleList(reqData);
    state.articles = state.articles.concat(data ?? []);
    state.pagination.total = meta?.count;
    state.urlPrefix = links?.self?.href?.split('/jsonapi')[0] || '';
  } catch (error) {
    console.error('[getArticleLists]', error);
  } finally {
    state.isLoading = false;
  }
}

const onLoadMore = async () => {
  if (state.isLoading) return;
  state.pagination.currentPage++;
  getArticleLists();
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
    position: relative;
    overflow-y: hidden;
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);

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
  .kur_load {
    position: relative;
    z-index: 1;
    margin: px2rem(15px) auto 0;
    width: px2rem(120px);
    height: px2rem(32px);
    line-height: px2rem(32px);
    text-align: center;
    border-radius: px2rem(16px);
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
    &:active {
      -webkit-transform: scale(.75);
      transform: scale(.75);
    }
  }
</style>