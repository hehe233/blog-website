<template>
  <li
    class="kur_list__item default"
    need-animation
  >
    <router-link
      :to="`/archives/${props.article.attributes.drupal_internal__nid}`"
      class="thumbnail"
      :title="props.article.attributes.title"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        width="100%"
        height="100%"
        class="ls-is-cached"
        :src="thumbnailSrc"
        :alt="props.article.attributes.title"
        loading="lazy"
      />
      <time datetime="2022-05-24">2022-05-24</time>
      <i class="kur-font iconfont"></i>
    </router-link>
    <div class="information">
      <router-link
        :to="`/archives/${props.article.attributes.drupal_internal__nid}`"
        class="title"
        :title="props.article.attributes.title"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="badge" style="display: inline-block" v-if="props.article.attributes.sticky">置顶</span>
        {{ props.article.attributes.title }}
      </router-link>
      <router-link
        :to="`/archives/${props.article.attributes.drupal_internal__nid}`"
        class="abstract"
        title="文章摘要"
        target="_blank"
        rel="noopener noreferrer"
        >{{ props.article.attributes.body.summary }}</router-link>
      <div class="meta">
        <ul class="items">
          <li>{{ props.article.attributes.created?.split('T')?.[0]  }}</li>
        </ul>
        <ul class="categories">
          <li class="pcate">
            <i class="icon fa-regular fa-layer-group"></i>
            <router-link
              class="link"
              target="_blank"
              to="/categories/algorithm"
              >{{ categoryName }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { IArticle } from '@/types';
import { computed, PropType } from 'vue';
import { useMenuStore } from '@/stores';
import { storeToRefs } from 'pinia';

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    required: true,
  },
  urlPrefix: {
    type: String,
    required: true,
  }
});

const menuStore = useMenuStore();
const { categoriesIdMap } = storeToRefs(menuStore);

const categoryId = computed(() => {
  return props.article.relationships.field_category.data.meta.drupal_internal__target_id;
})

const thumbnailSrc = computed(() => {
  const suffixUrl = props.article.attributes.field_image_link?.uri
    || categoriesIdMap.value?.[categoryId.value].url;
  if (!suffixUrl) {
    return '';
  }
  return `${props.urlPrefix}${suffixUrl.split('internal:')[1]}`
});

const categoryName = computed(() => {
  return categoriesIdMap.value?.[categoryId.value]?.name
    || categoryId.value
})
</script>

<style lang="scss" scoped>
  .kur_list__item {
    position: relative;
    width: 100%;
    border-bottom: 1px solid var(--classC);
    padding: px2rem(15px) 0;
    &::before {
      position: absolute;
      z-index: 1;
      top: px2rem(15px);
      left: px2rem(-15px);
      content: "";
      width: px2rem(4px);
      height: px2rem(25px);
      border-radius: 2px;
      background: var(--theme);
      -webkit-transform: scaleY(0);
      transform: scaleY(0);
      -webkit-transition: -webkit-transform 0.35s;
      transition: transform 0.35s;
      transition: transform 0.35s, -webkit-transform 0.35s;
    }
    .thumbnail {
      background: var(--classD);
      border-radius: var(--radius-inner);
    }
    &.default {
      position: relative;
      @include display-flex;

      &:hover {
        &::before {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
        .thumbnail {
          img {
            opacity: 0.8;
          }
          time {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
        .information {
          .title {
            color: var(--theme);
          }
        }
      }
      .thumbnail {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        position: relative;
        width: px2rem(210px);
        height: px2rem(140px);
        margin-right: px2rem(15px);
        overflow: hidden;
        img {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border: 1px solid var(--classD);
          -webkit-transition: opacity 0.35s;
          transition: opacity 0.35s;
          width: 100%;
          height: 100%;
          -o-object-fit: cover;
          object-fit: cover;
          border-radius: var(--radius-inner);
        }
        time {
          position: absolute;
          z-index: 1;
          top: px2rem(5px);
          right: px2rem(5px);
          background: var(--theme);
          height: px2rem(20px);
          line-height: px2rem(20px);
          padding: 0 px2rem(8px);
          color: #fff;
          font-size: px2rem(12px);
          border-radius: px2rem(10px);
          -webkit-transition: -webkit-transform 0.35s;
          transition: transform 0.35s;
          transition: transform 0.35s, -webkit-transform 0.35s;
          -webkit-transform: translate3d(120%, 0, 0);
          transform: translate3d(120%, 0, 0);
        }
        .kur-font {
          position: absolute;
          z-index: 1;
          top: px2rem(3px);
          left: px2rem(5px);
          font-size: px2rem(18px);
          color: #f5f5f5;
        }
      }
      .information {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        min-width: 0;
        @include display-flex;

        .title {
          margin-bottom: px2rem(10px);
          color: var(--main);
          font-size: px2rem(18px);
          line-height: px2rem(24px);
          max-height: px2rem(48px);
          -webkit-transition: color 0.35s;
          transition: color 0.35s;
          @include truncate-two;

          .badge {
            height: px2rem(20px);
            padding: 0 px2rem(6px);
            margin-right: px2rem(5px);
            line-height: px2rem(20px);
            font-size: px2rem(12px);
            white-space: nowrap;
            vertical-align: px2rem(2px);
            color: #fff;
            background-image: -webkit-linear-gradient(
              0deg,
              #3ca5f6 0,
              #a86af9 100%
            );
            border-radius: px2rem(2px) px2rem(6px);
          }
        }
        .abstract {
          color: var(--minor);
          line-height: px2rem(22px);
          max-height: px2rem(44px);
          opacity: 0.85;
          @include truncate-two;
        }
      }
    }
    .meta {
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      margin-top: auto;
      color: var(--minor);
      font-size: px2rem(14px);
      @include display-flex-center;
      .items {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        @include display-flex-center;

        li::after {
          content: "/";
          color: var(--seat);
          padding: 0 px2rem(5px);
        }
      }
      .categories {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        max-width: px2rem(320px);
        white-space: nowrap;
        // overflow-x: auto;
        @include display-flex-center;

        .pcate {
          margin-left: px2rem(5px);
          @include display-flex-center;

          .icon {
            margin-right: px2rem(3px);
            @include setWH(14px,14px);
          }
          .link {
            color: var(--minor);
            &:hover{
              color: var(--theme);
            }
          }
        }
      }
    }
  }
</style>