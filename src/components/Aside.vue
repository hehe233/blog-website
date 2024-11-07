<template>
  <aside class="kur_aside pos_left">
    <section class="kur_aside__item author">
      <img
        width="100%"
        height="120"
        class="image"
        src=""
        loading="lazy"
        alt="壁纸"
      />
      <div class="user">
        <div class="avatar_wrapper">
          <img class="avatar" src="" loading="lazy" alt="头像" />
        </div>
        <a
          class="link"
          href="#"
          target="_blank"
          rel="noopener noreferrer nofollow"
          v-cloak
        >
          {{ PersonInfo.name }}
        </a>
        <p class="motto kur_motto" v-cloak>
          {{ PersonInfo.motto }}
        </p>
      </div>
      <div class="count">
        <div class="item" :title="`累计分类数 ${state.categoriesNums}`">
          <span class="num">{{ state.categoriesNums }}</span>
          <span>分类数</span>
        </div>
        <div class="item" :title="`累计标签数 ${state.tagsNums}`">
          <span class="num">{{ state.tagsNums }}</span>
          <span>标签数</span>
        </div>
        <div class="item" :title="`累计文章数 ${state.articlesNums}`">
          <span class="num">{{ state.articlesNums }}</span>
          <span>文章数</span>
        </div>
      </div>
      <div class="social-account">
        <a
          class="github"
          :href="PersonInfo.github"
          target="_blank"
          title="Github"
          rel="noopener noreferrer nofollow"
        >
          <i class="fa-brands fa-github"></i>
        </a>
        <a
          class="bilibili"
          :href="PersonInfo.bilibili"
          target="_blank"
          title="B站"
          rel="noopener noreferrer nofollow"
        >
          <i class="fa-brands fa-bilibili"></i>
        </a>
        <a
          class="email"
          :href="`mailto:${PersonInfo.matlto}`"
          target="_blank"
          title="邮箱"
          rel="noopener noreferrer nofollow"
        >
          <i class="fa-regular fa-at"></i>
        </a>
      </div>
    </section>
    <section class="kur_aside__item newest">
      <div class="kur_aside__item-title">
        <i class="kur-font iconfont icon-trending-content-22-01"></i>
        <span class="text">最新文章</span>
      </div>
      <div class="kur_aside__item-contain">
        <ul class="list">
          <li class="item">
            <a
              v-for="article in state.articles"
              :key="article.id"
              :href="'/archives/' + article.attributes.drupal_internal__nid"
              class="link"
              :title="article.title"
              >{{ article.attributes.title }}</a
            >
            <i class="kur-font iconfont icon-link1"></i>
          </li>
        </ul>
      </div>
    </section>
  </aside>
</template>

<script lang="ts" setup>
import { PersonInfo } from '@/config/info';
import { reactive } from 'vue';

const state = reactive({
  articles: [
    {
      "type": "node--article",
      "id": "cd387eca-80e1-4baa-a5f1-1a96821a52ad",
      "links": {
          "self": {
              "href": "http:\/\/localhost\/drupal\/jsonapi\/node\/article\/cd387eca-80e1-4baa-a5f1-1a96821a52ad?resourceVersion=id%3A5"
          }
      },
      "attributes": {
          "drupal_internal__nid": 1,
          "title": "Drupal jsonapi \u521d\u7ea7\u5165\u95e8\u5b9e\u8df5"
      }
    }
  ] as any[],
  tags: [
    {
      "type": "taxonomy_term--tags",
      "id": "fbea5020-4647-4b6d-9701-2d27eb6e6b22",
      "links": {
          "self": {
              "href": "http:\/\/localhost\/drupal\/jsonapi\/taxonomy_term\/tags\/fbea5020-4647-4b6d-9701-2d27eb6e6b22?resourceVersion=id%3A6"
          }
      },
      "attributes": {
          "name": "drupal",
          "path": {
              "alias": "\/tags\/drupal",
              "pid": 1,
              "langcode": "zh-hans"
          },
          "field_color": "#ea5455"
      }
    },
    {
      "type": "taxonomy_term--tags",
      "id": "2fa4da8b-5f5a-4b18-9a94-2b99703503bd",
      "links": {
          "self": {
              "href": "http:\/\/localhost\/drupal\/jsonapi\/taxonomy_term\/tags\/2fa4da8b-5f5a-4b18-9a94-2b99703503bd?resourceVersion=id%3A5"
          }
      },
      "attributes": {
          "name": "javascript",
          "path": {
              "alias": "\/tags\/javascript",
              "pid": 2,
              "langcode": "zh-hans"
          },
          "field_color": "#49C628"
      }
    }
  ] as any[],
  articlesNums: 0,
  tagsNums: 0,
  categoriesNums: 0,
});
</script>

<style lang="scss" scoped>
  .kur_aside {
    padding-bottom: 0.9375rem;
    margin-left: 0.9375rem;
    &__item {
      position: relative;
      width: 17.5rem;
      margin-bottom: 0.9375rem;
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);
      overflow: hidden;
      &:last-child {
        position: sticky;
        top: 75px;
        margin-bottom: 0;
        -webkit-transition: top 0.35s;
        transition: top 0.35s;
      }
      &.author {
        background: var(--background);
        padding: 2.8125rem 0.9375rem 0.9375rem;
        .image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 7.5rem;
          -o-object-fit: cover;
          object-fit: cover;
          z-index: 1;
          border-radius: var(--radius-wrap) var(--radius-wrap) 0 0;
        }
        &::before {
          content: "";
          position: absolute;
          top: 5.625rem;
          left: 0;
          width: 100%;
          height: 1.875rem;
          z-index: 2;
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(255, 255, 255, 0)),
            to(var(--background))
          );
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            var(--background)
          );
        }
        .user {
          position: relative;
          z-index: 4;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          padding-bottom: 0.9375rem;
          @include display-flex-center;

          .avatar_wrapper {
            position: relative;
            width: 6rem;
            height: 6rem;
            margin-bottom: 0.25rem;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          .avatar {
            display: block;
            width: 6rem;
            height: 6rem;
            overflow: hidden;
            padding: 0.25rem;
            -o-object-fit: cover;
            object-fit: cover;
            background: var(--classC);
            -webkit-transition: -webkit-transform 0.75s;
            transition: transform 0.75s;
            transition: transform 0.75s, -webkit-transform 0.75s;
            border-radius: 50%;
            &:hover {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }

          .link {
            color: var(--theme);
            margin-bottom: 0.625rem;
            text-align: center;
            font-size: 1rem;
            font-weight: 500;
            text-shadow: 1px 1px 0.5rem var(--theme);
          }
          .motto {
            color: var(--main);
            text-align: center;
            word-break: break-word;
          }
        }
        .count {
          width: 100%;
          padding-bottom: 0.625rem;
          @include display-flex-center;

          .item {
            position: relative;
            min-width: 0;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            color: var(--routine);
            font-size: 0.75rem;
            @include display-flex-center;

            &:after {
              position: absolute;
              top: 0.75rem;
              right: 0;
              content: "";
              width: 1px;
              height: 1.875rem;
              background: var(--classC);
            }
            &:last-child:after {
              display: none;
            }
            .num {
              max-width: 4.375rem;
              font-weight: 500;
              font-size: 1.375rem;
              color: var(--title);
              margin-bottom: 0.1875rem;
              text-shadow: var(--text_shadow);
              @include truncate;
            }
          }
        }
        .social-account {
          -ms-flex-pack: distribute;
          justify-content: space-around;
          padding-top: 10px;
          text-align: center;
          font-size: 14px;
          border-top: 1px solid var(--classC);
          @include display-flex-center;

          a {
            -webkit-transform: scale(0.9);
            transform: scale(0.9);
            display: inline-block;
            margin: 0 2px;
            font-size: 0;
            color: var(--minor);
            -webkit-transition: -webkit-transform 0.2s;
            transition: transform 0.2s;
            transition: transform 0.2s, -webkit-transform 0.2s;
            &:hover {
              -webkit-transform: scale(1);
              transform: scale(1);
            }

            i {
              font-size: px2rem(22px);
            }

            &.github {
              color: var(--title)
            }

            &.bilibili {
              color: #fb7299;
            }

            &.email {
              color: #dc4835;
            }
          }
        }
      }
      &.newest {
        background: var(--background);
        .list {
          padding-top: 1px;
          .item {
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            line-height: 1.875rem;
            margin-bottom: 0.9375rem;
            line-height: 1.25rem;
            @include display-flex-center;

            .link {
              position: relative;
              color: var(--routine);
              max-width: 85%;
              @include truncate;

              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 1px;
                background: var(--theme);
                -webkit-transition: all 0.35s;
                transition: all 0.35s;
              }
            }
            .kur-font {
              font-size: 1.125rem;
              color: var(--routine);
              -webkit-transition: -webkit-transform 0.3s;
              transition: transform 0.3s;
              transition: transform 0.3s, -webkit-transform 0.3s;
            }
            &:hover {
              .link {
                color: var(--theme);
                &::after {
                  width: 100%;
                }
              }
              .kur-font {
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
                color: var(--theme);
              }
            }
          }
        }
      }
      &-title {
        position: relative;
        font-size: 1rem;
        font-weight: 500;
        height: 2.8125rem;
        line-height: 2.8125rem;
        padding: 0 0.9375rem;
        color: var(--classF);
        border-bottom: 1px solid var(--classC);
        @include display-flex-center;

        .kur-font {
          margin-right: 0.3125rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--theme);
        }
      }
      &-contain {
        position: relative;
        padding: 0.9375rem;
      }
    }
  }
</style>