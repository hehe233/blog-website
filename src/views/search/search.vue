<template>
  <div class="kur_index__search">
    <div class="kur_archive__title">
      <div class="kur_archive__title-title">
        <i class="kur_archive__title-icon fa-regular fa-magnifying-glass"></i>
        搜索到<span class="muted">10</span>条与
        <span class="muted">233</span>
        <span>相关的文章：</span>
      </div>
    </div>
    <ul class="kur_archive__list kur_list">
      <ArticleItem :urlPrefix="state.urlPrefix" v-for="article in state.articles" :key="article.id" :article="article"/>
    </ul>
    <ul class="kur_pagination">
      <li class="prev disabled">
        <div>
          <i class="fa-solid fa-arrow-left-to-line"></i>
        </div>
      </li>
      <li class="actived">
        <div>1</div>
      </li>
      <li>
        <div>1</div>
      </li>
      <li>
        <div>1</div>
      </li>
      <li class="next">
        <div>
          <i class="fa-solid fa-arrow-right-to-line"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ArticleItem from '@/components/Article/ArticleItem.vue';
import { IArticle, IPagination } from '@/types';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
  type: undefined as string | undefined,
  id: undefined as number | undefined,
  articles: [] as IArticle[],
  pagination: {
    pageLimit: 1,
    currentPage: 1,
    total: 0,
  } as IPagination,
  urlPrefix: '' as string,
  isLoading: false as boolean,
});

const titleIcon = computed(() => {})

onMounted(() => {
  state.type = route.query.type?.toString();
  state.id = Number(route.query.id);
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