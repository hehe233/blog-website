<template>
  <div class="kur_index__categories">
    <div class="kur_index__title">
      <ul class="kur_index__title-title">
        <li class="item">全部分类<span class="totals">{{ categoriesCount }}</span></li>
      </ul>
    </div>
    <div class="kur_index__hot">
      <ul class="kur_index__hot-list animated fadeIn">
        <li class="item" v-for="category in allCategoriesList" :key="category.id">
          <router-link class="link" :to="{path: '/search', query:{type: 'category', id: category.attributes.drupal_internal__tid}}" :title="category.attributes.name">
            <figure class="inner">
              <img
                width="100%"
                height="120"
                class="image"
                :src="category.attributes.field_image_link?.uri 
                  ? `${urlPrefix}${category.attributes.field_image_link.uri.split('internal:')[1]}`
                  : DEFAULT_THUMBNAIL_URL"
                :alt="category.attributes.name"
                loading="lazy"
              />
              <figcaption class="title">{{ category.attributes.name }}</figcaption>
            </figure>
          </router-link>
        </li>
      </ul>
      <ArticleEmpty v-show="!categoriesCount"  />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { DEFAULT_THUMBNAIL_URL } from '@/config/info';
import ArticleEmpty from '@/components/Article/ArticleEmpty.vue';

const menuStore = useMenuStore();
const { categoriesCount, allCategoriesList,urlPrefix } = storeToRefs(menuStore);
</script>

<style lang="scss" scoped>
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
      padding: 0 px2rem(15px) px2rem(10px);
      &-list {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        -webkit-column-gap: px2rem(15px);
        -moz-column-gap: px2rem(15px);
        column-gap: px2rem(15px);
        padding-top: px2rem(12px);
        .item {
          margin-bottom: px2rem(10px);
          border: 1px solid var(--classC);
          overflow: hidden;
          border-radius: px2rem(4px);
          &:hover {
            .link {
              .inner {
                .title {
                  background: var(--classE);
                }
              }
            }
          }
          .link {
            display: block;
            .inner {
              position: relative;
              .image {
                width: 100%;
                height: px2rem(120px);
                -o-object-fit: cover;
                object-fit: cover;
                border-radius: var(--radius-inner) var(--radius-inner) 0 0;
                -webkit-transition: opacity .35s,-webkit-transform .3s;
                transition: opacity .35s,transform .3s;
                transition: opacity .35s,transform .3s,-webkit-transform .3s;
                will-change: transform;
              }
              .title {
                font-size: px2rem(13px);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                padding: 0 px2rem(8px);
                line-height: px2rem(32px);
                color: var(--minor);
                background: var(--classD);
                border-radius: 0 0 var(--radius-inner) var(--radius-inner);
              }
            }
          }
        }
      }
    }
  }
</style>