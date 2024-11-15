<template>
  <aside class="kur_aside pos_left">
    <section class="kur_aside__item author">
      <img
        width="100%"
        height="120"
        class="image"
        src="@/assets/images/aside_pc.png"
        loading="lazy"
        alt="壁纸"
      />
      <div class="user">
        <div class="avatar_wrapper">
          <img class="avatar" src="@/assets/images/avatar.jpg" loading="lazy" alt="头像" />
        </div>
        <router-link to="/"
          class="link"
          target="_blank"
          rel="noopener noreferrer nofollow"
          v-cloak
        >
          {{ PersonInfo.name }}
        </router-link>
        <p class="motto kur_motto" v-cloak>
          {{ PersonInfo.motto }}
        </p>
      </div>
      <div class="count">
        <div class="item" :title="`累计分类数 ${categoriesCount}`">
          <span class="num">{{ categoriesCount }}</span>
          <span>分类数</span>
        </div>
        <div class="item" :title="`累计标签数 ${tagsCount}`">
          <span class="num">{{ tagsCount }}</span>
          <span>标签数</span>
        </div>
        <div class="item" :title="`累计文章数 ${articlesCount}`">
          <span class="num">{{ articlesCount }}</span>
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
        <i class="kur-font iconfont fa-regular fa-books"></i>
        <span class="text">最新文章</span>
      </div>
      <div class="kur_aside__item-contain">
        <ul class="list">
          <li class="item" v-for="article in stickyArticles" :key="article.id">
            <router-link
              :to="`/archives/${article.attributes.drupal_internal__nid}`"
              class="link"
              :title="article.attributes.title"
            >
              {{ article.attributes.title }}
            </router-link>
            <i class="kur-font iconfont fa-regular fa-link"></i>
          </li>
          <p class="kur_loading" v-if="loadingCategories"><i class="fa-regular fa-spinner fa-spin"></i></p>
          <ArticleEmpty v-if="!stickyArticles.length && !loadingCategories"  />
        </ul>
      </div>
    </section>
    <TagCloud :tags="allTagsList" :loading="loadingTags" />
  </aside>
</template>

<script lang="ts" setup>
import { PersonInfo } from '@/config/info';
import TagCloud from '@/components/TagCloud.vue';
import { useMenuStore } from '@/stores';
import { storeToRefs } from 'pinia';

import ArticleEmpty from '@/components/Article/ArticleEmpty.vue';

const menuStore = useMenuStore();
const { tagsCount, allTagsList, categoriesCount, articlesCount, stickyArticles, loadingTags, loadingCategories } = storeToRefs(menuStore);
</script>

<style lang="scss">
  .kur_aside {
    padding-bottom: px2rem(15px);
    margin-left: px2rem(15px);
    &__item {
      position: relative;
      width: px2rem(280px);
      margin-bottom: px2rem(15px);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);
      overflow: hidden;
      &:last-child {
        position: sticky;
        top: px2rem(75px);
        margin-bottom: 0;
        -webkit-transition: top 0.35s;
        transition: top 0.35s;
      }
      &.author {
        background: var(--background);
        padding: px2rem(45px) px2rem(15px) px2rem(15px);
        .image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: px2rem(120px);
          -o-object-fit: cover;
          object-fit: cover;
          z-index: 1;
          border-radius: var(--radius-wrap) var(--radius-wrap) 0 0;
        }
        &::before {
          content: "";
          position: absolute;
          top: px2rem(90px);
          left: 0;
          width: 100%;
          height: px2rem(30px);
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
          padding-bottom: px2rem(15px);
          @include display-flex-center;

          .avatar_wrapper {
            position: relative;
            width: px2rem(96px);
            height: px2rem(96px);
            margin-bottom: px2rem(4px);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          .avatar {
            display: block;
            width: px2rem(96px);
            height: px2rem(96px);
            overflow: hidden;
            padding: px2rem(4px);
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
            margin-bottom: px2rem(10px);
            text-align: center;
            font-size: px2rem(16px);
            font-weight: 500;
            text-shadow: 1px 1px px2rem(8px) var(--theme);
          }
          .motto {
            color: var(--main);
            text-align: center;
            word-break: break-word;
          }
        }
        .count {
          width: 100%;
          padding-bottom: px2rem(10px);
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
            font-size: px2rem(12px);
            @include display-flex-center;

            &:after {
              position: absolute;
              top: px2rem(12px);
              right: 0;
              content: "";
              width: 1px;
              height: px2rem(30px);
              background: var(--classC);
            }
            &:last-child:after {
              display: none;
            }
            .num {
              max-width: px2rem(70px);
              font-weight: 500;
              font-size: px2rem(22px);
              color: var(--title);
              margin-bottom: px2rem(3px);
              text-shadow: var(--text_shadow);
              @include truncate;
            }
          }
        }
        .social-account {
          -ms-flex-pack: distribute;
          justify-content: space-around;
          padding-top: px2rem(10px);
          text-align: center;
          font-size: px2rem(14px);
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
            line-height: px2rem(30px);
            margin-bottom: px2rem(15px);
            line-height: px2rem(20px);
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
              font-size: px2rem(18px);
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
            &:last-child {
              margin-bottom: 0;
            }
          }
          .kur_loading {
            font-size: px2rem(24px);
            text-align: center;
            color: var(--routine);
          }
        }
      }
      &-title {
        position: relative;
        font-size: px2rem(16px);
        font-weight: 500;
        height: px2rem(45px);
        line-height: px2rem(45px);
        padding: 0 px2rem(15px);
        color: var(--classF);
        border-bottom: 1px solid var(--classC);
        @include display-flex-center;

        .kur-font {
          margin-right: px2rem(10px);
          font-size: px2rem(20px);
          font-weight: 700;
          color: var(--theme);
        }
      }
      &-contain {
        position: relative;
        padding: px2rem(15px);
      }
    }
    @media (max-width: 992px) {
      display: none;
    }
  }
</style>