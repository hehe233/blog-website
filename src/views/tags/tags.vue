<template>
  <div class="kur_index__categories">
    <div class="kur_index__title">
      <ul class="kur_index__title-title">
        <li class="item">全部标签<span class="totals">{{ tagsCount }}</span></li>
      </ul>
    </div>
    <div class="kur_index__hot">
      <ul class="kur_index__hot-list-tag animated fadeIn" v-if="tagsCount">
        <li class="item" v-for="tag in allTagsList" :key="tag.id">
          <router-link class="link" :to="{path: '/search', query:{type: 'tag', id: tag.attributes.drupal_internal__tid}}" :title="tag.attributes.name">
            <span :title="tag.attributes.name">{{ tag.attributes.name }}</span>
          </router-link>
        </li>
      </ul>
      <p class="kur_loading" v-if="loadingTags"><i class="fa-regular fa-spinner fa-spin"></i></p>
      <Empty v-show="!tagsCount && !loadingTags"  />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores';
import { storeToRefs } from 'pinia';
import Empty from '@/components/Empty.vue';

const menuStore = useMenuStore();
const { tagsCount, allTagsList, loadingTags } = storeToRefs(menuStore);
</script>

<style lang="scss">
  .kur_index {
    &__title {
      border-bottom: 1px solid var(--classC);
      @include display-flex-center;
      &-title {
        position: relative;
        color: var(--theme);
        font-weight: 500;
        height: px2rem(44px);
        line-height: px2rem(44px);
        padding-left: px2rem(15px);
        @include display-flex-center;
        .item {
          cursor: pointer;
          margin-right: px2rem(16px);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: var(--theme);
          font-weight: 700;
          .totals {
            display: inline-block;
            margin-left: px2rem(5px);
            padding: 0 px2rem(5px);
            height: px2rem(18px);
            line-height: px2rem(18px);
            font-size: px2rem(12px);
            color: var(--minor);
            background: var(--sub-background);
            border-radius: px2rem(3px);
          }
        }
      }
    }
    &__hot {
      padding: 0 px2rem(15px);
      &-list-tag {
        padding-top: px2rem(20px);
        padding-bottom: px2rem(10px);
        overflow: hidden;
        flex-wrap: wrap;
        @include display-flex-center;
        .item {
          margin: 0 px2rem(6px) px2rem(10px);
          font-size: px2rem(14px);
          color: var(--routine);
          background: var(--background-tags);
          border: 1px solid var(--classB);
          border-radius: px2rem(3px);
          -webkit-transition: -webkit-transform .25s;
          transition: transform .25s;
          transition: transform .25s,-webkit-transform .25s;
          &:hover {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
            background: var(--theme);
            border-color: var(--theme);
            -webkit-box-shadow: var(--box-shadow-tags);
            box-shadow: var(--box-shadow-tags);
            .link {
              color: var(--classD);
            }
          }
          .link {
            display: block;
            padding: 0 px2rem(10px);
            height: px2rem(28px);
            line-height: px2rem(28px);
            font-size: 0;
            color: var(--routine);
            span {
              display: inline-block;
              max-width: px2rem(120px);
              font-size: px2rem(14px);
              @include truncate;
            }
          }
        }
      }
      .kur_loading {
        padding: px2rem(24px) 0;
        font-size: px2rem(24px);
        text-align: center;
        color: var(--routine);
      }
    }
  }
</style>