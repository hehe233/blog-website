<template>
  <div class="kur_index__search">
    <div class="kur_archive__title">
      <div class="kur_archive__title-title" >
        <template v-if="state.type === 'search'">
          <i class="kur_archive__title-icon fa-regular fa-magnifying-glass"></i>
          搜索到<span class="muted">{{ state.pagination.total }}</span>条与
          <span class="muted">{{ state.keyword }}</span>
          <span>相关的文章：</span>
        </template>
        <template v-else-if="state.type === 'tag'">
          <i class="kur_archive__title-icon fa-regular fa-feather"></i>以下是
          <span class="muted ellipsis">{{ state.id ? tagsIdMap?.[state.id]?.name ?? state.id  : undefined }}</span>
          <span>相关的文章</span>
        </template>
        <template v-else-if="state.type === 'category'">
          <i class="kur_archive__title-icon fa-regular fa-feather"></i>以下是
          <span class="muted ellipsis">{{ state.id ? categoriesIdMap?.[state.id]?.name ?? state.id : undefined }}</span>
          <span>相关的文章</span>
        </template>
      </div>
    </div>
    <ul class="kur_archive__list kur_list">
      <ArticleItem :urlPrefix="state.urlPrefix" v-for="article in state.articles" :key="article.id" :article="article"/>
    </ul>
    <ArticleLoading v-show="state.isLoading" />
    <Empty v-show="!state.pagination.total && !state.isLoading"  />
    <ul class="kur_pagination" v-show="state.pagination.total">
      <li class="prev" :class="{disabled: state.pagination.currentPage <= 1}" @click="onClickPrevBtn">
        <div>
          <i class="fa-solid fa-arrow-left-to-line"></i>
        </div>
      </li>
      <li
        v-for="index in pageNums"
        :key="index"
        :class="{actived: state.pagination.currentPage === index}"
        @click="onClickPageBtn(index)"
      >
        <div>{{ index }}</div>
      </li>
      <li class="next" :class="{disabled: state.pagination.currentPage >= pageNums}" @click="onClickNextBtn">
        <div>
          <i class="fa-solid fa-arrow-right-to-line"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores';
import { ArticleParams, IArticle, IPagination } from '@/types';
import { storeToRefs } from 'pinia';
import { computed, nextTick, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getArticleList } from '@/api/node';
import { BounceInUp } from '@/util/animation';
import Message from '@/plugins/message/message';

import ArticleItem from '@/components/Article/ArticleItem.vue';
import ArticleLoading from '@/components/Article/ArticleLoading.vue';
import Empty from '@/components/Empty.vue';

const route = useRoute();
const state = reactive({
  type: undefined as string | undefined,
  id: undefined as number | undefined,
  keyword: undefined as string | undefined,
  articles: [] as IArticle[],
  pagination: {
    pageLimit: 2,
    currentPage: 1,
    total: 0,
  } as IPagination,
  urlPrefix: '' as string,
  isLoading: false as boolean,
});

const menuStore = useMenuStore();
const { tagsIdMap, categoriesIdMap } = storeToRefs(menuStore);

const pageNums = computed(() => {
  if (state.pagination.total <= state.pagination.pageLimit) return 1;
  return Math.floor(state.pagination.total / state.pagination.pageLimit) + (state.pagination.total % state.pagination.pageLimit > 0 ? 1 : 0);
});

const fetchArticles = async () => {
  const reqData: ArticleParams = {
    currentPage: state.pagination.currentPage,
    pageLimit: state.pagination.pageLimit,
    filter: {},
  }
  switch (state.type) {
    case 'search':
      reqData.like = {
        title: state.keyword,
        body: state.keyword
      }
      break;
    case 'tag':
      if (!state.id) return;
      reqData.filter!.tags = [state.id.toString()];
      break;
    case 'category':
      if (!state.id) return;
      reqData.filter!.categories = [state.id.toString()];
      break;
  }
  try {
    state.isLoading = true;
    const { data, meta, links } = await getArticleList(reqData);
    state.articles = data;
    state.pagination.total = meta?.count;
    state.urlPrefix = links?.self?.href?.split('/jsonapi')[0] || '';
  } catch (error: any) {
    Message.error('加载文章失败: ' + error.message || error.toString());
    console.error('[getArticleLists]', error);
  } finally {
    state.isLoading = false;
  }
}

const onClickPageBtn = (index: number) => {
  if (state.pagination.currentPage === index) return;
  state.pagination.currentPage = index;
  fetchArticles();
}

const onClickPrevBtn = () => {
  state.pagination.currentPage = 1;
  fetchArticles();
}

const onClickNextBtn = () => {
  state.pagination.currentPage = pageNums.value;
  fetchArticles();
}

watch(() => state.articles, () => {
  nextTick(() => BounceInUp.onScroll());
});

watch([() => route.query.type, () => route.query.id, () => route.query.keyword], ([type, id, keyword]) => {
  state.type = type?.toString();
  state.id = Number(id);
  state.keyword = keyword?.toString();
  fetchArticles();
}, {immediate: true});

onMounted(() => {
  BounceInUp.init();
});

onUnmounted(() => {
  BounceInUp.destroy();
});
</script>

<style lang="scss">
  .kur_archive {
    &__title {
      height: px2rem(45px);
      color: var(--main);
      line-height: px2rem(45px);
      border-bottom: 1px solid var(--classC);
      @include display-flex-center;
      &-title {
        @include display-flex-center;
        .kur_archive__title-icon {
          margin-right: px2rem(5px);
          color: var(--theme);
          font-size: px2rem(18px);
          vertical-align: middle;
        }
        .muted {
          position: relative;
          top: -1px;
          margin: 0 px2rem(5px);
          color: var(--theme);
          font-weight: 700;
          @include truncate;
        }
      }
    }
    .kur_pagination {
      padding-top: px2rem(36px);
      padding-bottom: px2rem(30px);
      @include display-flex-center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      li {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-left: px2rem(5px);
        overflow: hidden;
        background: var(--sib-background);
        border-radius: px2rem(3px);
        -webkit-box-shadow: var(--box-shadow-pager);
        box-shadow: var(--box-shadow-pager);
        &.prev {
          border-radius: px2rem(6px) px2rem(3px) px2rem(3px) px2rem(6px);
        }
        &.disabled {
          pointer-events: none;
          div {
            color: var(--classA);
          }
        }
        &.actived {
          font-weight: 600;
          background: var(--theme);
          -webkit-box-shadow: 0 px2rem(3px) px2rem(20px) px2rem(-2px) var(--theme);
          box-shadow: 0 px2rem(3px) px2rem(20px) px2rem(-2px) var(--theme);
          div {
            color: #fff;
          }
        }
        &.next {
          border-radius: px2rem(3px) px2rem(6px) px2rem(6px) px2rem(3px);
        }
        div {
          cursor: pointer;
          height: px2rem(32px);
          line-height: px2rem(32px);
          padding: 0 px2rem(14px);
          color: var(--main);
          &:hover {
            color: #fff;
            background: var(--theme);
          }
        }
      }
    }
  }
</style>