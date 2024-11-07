<template>
  <header class="kur_header">
    <div class="kur_header__above topInDown" ref="menuAbove">
      <div class="kur_container kur_header__above-container">
        <i
          class="iconfont fa-regular fa-bars kur_header__above-slideicon"
          id="menuPeBtn"
          @click="clickPEMenuIcon"></i>
        <router-link to="/" class="kur_header__above-logo">
          <img
            src=""
            alt="LOGO"
            loading="lazy"
            style="border-radius: 0px"
          />
        </router-link>
        <nav class="kur_header__above-nav" v-cloak>
          <template v-for="menu in menuTree" :key="menu.name">
            <router-link
              :to="menu.path"
              class="item"
              :class="{
                current: activedMenu === menu.path,
              }"
              v-if="!menu.children?.length"
            >
              <i class="iconfont" :class="menu.meta?.icon"></i>
              {{ menu.meta?.title }}
            </router-link>
            <div
              class="kur_dropdown"
              :class="{
                actived: state.activedDropFrameMenu === menu.name?.toString()
              }"
              trigger="hover"
              placement="60px"
              @mouseenter="showDropFrame(menu.name?.toString())"
              @mouseleave="hideDropFrame"
              v-if="menu.children?.length"
            >
              <div class="kur_dropdown__link" v-cloak>
                <router-link
                  :to="menu.path"
                  class="item"
                  :class="{
                    current:
                      activedMenu === menu.path ||
                      menu.children.findIndex((sub: RouteRecordRaw) => `${menu.path}/${sub.path}` === activedMenu) > -1,
                  }"
                >
                <i class="iconfont" :class="menu.meta?.icon"></i>
                {{ menu.meta?.title }}
                </router-link>
                <div class="rotateDiv" />
              </div>
              <ul class="kur_dropdown__menu" style="top: 60px" v-cloak>
                <li v-for="childMenu in menu.children" :key="childMenu.name">
                  <router-link
                    :to="childMenu.path"
                    class="item"
                    :class="{
                      current: `${menu.path}/${childMenu.path}` === activedMenu,
                    }"
                  >
                    <i class="iconfont" :class="childMenu.meta?.icon"></i>
                    {{ childMenu.meta?.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </template>
        </nav>
        <form class="kur_header__above-search" method="get" action="/search">
          <input
            maxlength="16"
            autocomplete="off"
            placeholder="请输入关键字..."
            name="keyword"
            value=""
            class="input"
            type="text"
            @focusin="showResultFrame"
            @focusout="hideResultFrame"
          />
          <button type="submit" class="submit" aria-label="搜索按钮">
            <i class="iconfont fa-regular fa-magnifying-glass submit-search"></i>
          </button>
          <span class="icon"></span>
          <nav
            class="result"
            :class="{
              actived: state.isResultFrameVisable
            }"
            ref="navResult"
            v-cloak
          >
            <a
              v-for="(article, index) in state.stickyArticleList"
              :key="article.id"
              :href="'/archives/' + article.attributes.drupal_internal__nid"
              :title="article.title"
              class="item"
            >
              <span class="sort">{{ index + 1 }}</span>
              <span class="text">{{ article.attributes.title }}</span>
            </a>
          </nav>
        </form>
        <i
          class="iconfont fa-regular fa-magnifying-glass kur_header__above-searchicon"
          @click="clickPESearchBtn"></i>
      </div>
    </div>
    <div 
      class="kur_header__slideout"
      :class="{
        actived: state.isSildeOutVisable
      }"
    >
      <div class="kur_header__slideout-wrap">
        <img
          width="100%"
          height="150"
          class="kur_header__slideout-image"
          src=""
          alt="aside background"
          loading="lazy"
        />
        <div class="kur_header__slideout-author">
          <img
            width="50"
            height="50"
            class="avatar"
            src=""
            alt="avatar"
            loading="lazy"
          />
          <div class="info">
            <a class="link" href="#" target="_blank" v-cloak>{{ info.name }}</a>
            <p class="motto" v-cloak>{{ info.motto }}</p>
          </div>
        </div>
        <div class="social-account">
          <a class="github" :href="info.github" target="_blank" title="Github">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
            >
              <path
                d="M512 95.872a426.666667 426.666667 0 0 0-134.912 831.445333c21.333333 3.754667 29.312-9.045333 29.312-20.266666 0-10.112-0.512-43.733333-0.512-79.445334-107.221333 19.712-134.954667-26.154667-143.488-50.133333a155.136 155.136 0 0 0-43.733333-60.288c-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333a85.376 85.376 0 0 1 65.621333 43.733333 91.178667 91.178667 0 0 0 124.245334 35.2 89.770667 89.770667 0 0 1 27.221333-57.088c-94.933333-10.666667-194.133333-47.445333-194.133333-210.645333a166.058667 166.058667 0 0 1 43.733333-114.688 153.344 153.344 0 0 1 4.266667-113.066667s35.712-11.178667 117.333333 43.733333a402.218667 402.218667 0 0 1 213.333333 0c81.578667-55.466667 117.333333-43.733333 117.333334-43.733333a153.301333 153.301333 0 0 1 4.266666 113.066667 165.077333 165.077333 0 0 1 43.733334 114.688c0 163.712-99.754667 199.978667-194.688 210.645333a101.034667 101.034667 0 0 1 28.8 78.933333c0 57.088-0.512 102.954667-0.512 117.333334 0 11.221333 7.978667 24.533333 29.312 20.266666A426.88 426.88 0 0 0 512 95.872z"
                fill="#333"
              ></path>
            </svg>
          </a>
          <a class="bilibili" :href="info.bilibili" target="_blank" title="B站">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
            >
              <path
                d="M777.514667 131.669333a53.333333 53.333333 0 0 1 0 75.434667L728.746667 255.829333h49.92A160 160 0 0 1 938.666667 415.872v320a160 160 0 0 1-160 160H245.333333A160 160 0 0 1 85.333333 735.872v-320a160 160 0 0 1 160-160h49.749334L246.4 207.146667a53.333333 53.333333 0 1 1 75.392-75.434667l113.152 113.152c3.370667 3.370667 6.186667 7.04 8.448 10.965333h137.088c2.261333-3.925333 5.12-7.68 8.490667-11.008l113.109333-113.152a53.333333 53.333333 0 0 1 75.434667 0z m1.152 231.253334H245.333333a53.333333 53.333333 0 0 0-53.205333 49.365333l-0.128 4.010667v320c0 28.117333 21.76 51.157333 49.365333 53.162666l3.968 0.170667h533.333334a53.333333 53.333333 0 0 0 53.205333-49.365333l0.128-3.968v-320c0-29.44-23.893333-53.333333-53.333333-53.333334z m-426.666667 106.666666c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z m320 0c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z"
                fill="#fb7299"
              ></path>
            </svg>
          </a>
          <a
            class="email"
            :href="`mailto:${info.matlto}`"
            target="_blank"
            title="邮箱"
          >
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="22"
            >
              <path
                d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m341.333333-426.666667a341.333333 341.333333 0 1 0-169.301333 294.869333l-43.008-73.685333A256 256 0 1 1 768 512v42.666667a42.666667 42.666667 0 0 1-85.333333 0V384h-57.770667a170.666667 170.666667 0 1 0 2.816 253.44A128 128 0 0 0 853.333333 554.666667v-42.666667z m-341.333333-85.333333a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z"
                fill="#dc4835"
              ></path>
            </svg>
          </a>
        </div>
        <ul class="kur_header__slideout-count" v-cloak>
          <li class="item">
            <i class="kur-font kur-icon-riji"></i>
            <span
              >累计撰写 <strong>{{ state.articlesNums }}</strong> 篇文章</span
            >
          </li>
          <li class="item">
            <i class="kur-font kur-icon-remen"></i>
            <span
              >累计创建 <strong>{{ state.tagsCNums }}</strong> 个标签</span
            >
          </li>
          <li class="item">
            <i class="kur-font kur-icon-message"></i>
            <span
              >累计收到 <strong>{{ state.commentsNums }}</strong> 条评论</span
            >
          </li>
        </ul>
        <nav class="kur_header__slideout-menu">
          <p class="link panel" @click="onClickExpandPEMenu">
            <span>栏目</span>
            <i class="rotateDiv" :class="{actived: state.isExpandedPEMenu}" />
          </p>
          <Collapse :when="state.isExpandedPEMenu">
            <ul class="slides panel-body">
              <template v-for="menu in menuTree" :key="menu.name">
                <li
                  v-if="!menu.children?.length"
                  style="height: 40px"
                  class="contentChild"
                >
                  <router-link
                    class="link"
                    :class="{
                      current: activedMenu === menu.path,
                    }"
                    :to="menu.path"
                    :title="menu.meta?.title"
                    >{{ menu.meta?.title }}
                  </router-link>
                </li>
                <li v-else class="hasChild">
                  <div
                    class="link hasChild-body contentChild"
                    :class="{
                      current: activedMenu === menu.path,
                      in: menu.children.findIndex((sub: RouteRecordRaw) => `${menu.path}/${sub.path}` === activedMenu) > -1,
                    }"
                    style="height: 40px"
                  >
                    <router-link :to="menu.path" :title="menu.meta?.title">
                      {{ menu.meta?.title }}
                    </router-link>
                    <div
                      class="rotateDiv"
                      @click="onClickExpandPESubMenu(menu.name?.toString())"
                      :class="{actived: state.activedCollapseSubMenu === menu.name?.toString()}"
                    />
                  </div>
                  <Collapse :when="state.activedCollapseSubMenu === menu.name?.toString()">
                    <ul
                      class="slides subdirectory contentChild"
                      style="height: 40px"
                    >
                      <li
                        v-for="childMenu in menu.children"
                        :key="childMenu.name"
                        style="height: 40px"
                      >
                        <router-link
                          class="link"
                          :class="{
                            current: `${menu.path}/${childMenu.path}` === activedMenu,
                          }"
                          :to="childMenu.path"
                          :title="childMenu.meta?.title"
                          >{{ childMenu.meta?.title }}</router-link
                        >
                      </li>
                    </ul>
                  </Collapse>
                </li>
              </template>
            </ul>
          </Collapse>
        </nav>
      </div>
    </div>
    <div
      class="kur_header__searchout"
      :class="{actived: state.isSearchoutFrameVisable}"
      v-cloak
    >
      <div class="kur_container">
        <div class="kur_header__searchout-inner">
          <form
            class="kur_header__above-search-mobile"
            method="get"
            action="/search"
          >
            <input
              maxlength="16"
              autocomplete="off"
              placeholder="请输入关键字..."
              name="keyword"
              value=""
              class="input"
              type="text"
            />
            <button type="submit" class="submit">搜索</button>
          </form>
          <div class="title">
            <i class="iconfont fa-regular fa-cloud kur-font"></i>标签搜索
          </div>
          <ul class="tags">
            <li class="item" v-for="tag in state.tags" :key="tag.id" v-cloak>
              <a
                :style="{ background: tag.attributes.field_color }"
                :href="tag.attributes.path.alias"
                :title="tag.attributes.name"
                >{{ tag.attributes.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="kur_header__mask"
      :class="{actived: state.isSildeOutVisable || state.isSearchoutFrameVisable}"
      @click="onCancelPESildeOut"
    ></div>
  </header>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import { Collapse } from 'vue-collapsed';
import { blogRouter } from '@/plugins/router/index.ts';

const route = useRoute();

const info = {
  name: '',
  motto: '',
  github: '',
  bilibili: '',
  matlto: '',
}

const state = reactive({
  stickyArticleList: [
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
  tagsCNums: 0,
  commentsNums: 0,

  activedDropFrameMenu: undefined  as undefined | string, // PC端下拉二级菜单
  activedCollapseSubMenu: undefined as undefined | string, // 移动端二级菜单展开
  isSildeOutVisable: false, // 移动端侧边栏
  isResultFrameVisable: false, // PC端搜索热点展示
  isSearchoutFrameVisable: false, // 移动端搜索下拉栏
  isExpandedPEMenu: false, // 移动端侧边栏菜单
});

const activedMenu = computed(() => {
  return route.path;
})

const menuTree = computed(() => {
  return blogRouter.children?.filter(route => !route.meta?.hidden) || [];
});

const clickPESearchBtn = () => {
  state.isSearchoutFrameVisable = true;
  state.isSildeOutVisable = false;
}

const clickPEMenuIcon = () => {
  state.isSearchoutFrameVisable = false;
  state.isSildeOutVisable = true;
}

const onClickExpandPEMenu = () => {
  state.isExpandedPEMenu = !state.isExpandedPEMenu;
}

const showResultFrame = () => {
  state.isResultFrameVisable = true;
}

const hideResultFrame = () => {
  state.isResultFrameVisable = false;
}

const showDropFrame = (name: string | undefined) => {
  state.activedDropFrameMenu = name;
}

const onClickExpandPESubMenu = (name: string | undefined) => {
  if (state.activedCollapseSubMenu === name) {
    state.activedCollapseSubMenu = undefined;
  } else {
    state.activedCollapseSubMenu = name;
  }
}

const hideDropFrame = () => {
  state.activedDropFrameMenu = undefined;
}

const onCancelPESildeOut = () => {
  state.isSearchoutFrameVisable = false;
  state.isSildeOutVisable = false;
}
</script>

<style lang="scss" scoped>
.kur_header {
  position: relative;
  z-index: 100;
  width: 100%;
  height: px2rem(60px);

  &__above {
    position: fixed;
    top: 0;
    z-index: 6;
    width: 100%;
    background: var(--background);
    -webkit-box-shadow: 0 2px px2rem(10px) 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px px2rem(10px) 0 rgba(0, 0, 0, 0.2);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    will-change: opacity, transform;
    -webkit-transition: opacity, -webkit-transform 0.35s;
    transition: opacity, transform 0.35s;
    transition: opacity, transform 0.35s, -webkit-transform 0.35s;

    &.solid {
      -webkit-backdrop-filter: unset;
      backdrop-filter: unset;
      background: var(--background);
      -webkit-box-shadow: unset;
      box-shadow: unset;
    }

    &.actived {
      -webkit-transform: translate3d(0, -60px, 0);
      transform: translate3d(0, -60px, 0);
    }

    &-container {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      min-height: px2rem(44px);
      margin: 0 auto;

      @media (max-width: 768px) {
        height: px2rem(55px);
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      @media (max-width: 500px) {
        margin: 0 auto;
        height: px2rem(50px);
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
    }

    &-slideicon {
      display: none;
      cursor: pointer;
      font-size: px2rem(20px);
      color: var(--routine);

      @media (max-width: 768px) {
        display: block;
      }
    }

    &-logo {
      position: relative;
      height: px2rem(60px);
      margin-right: px2rem(10px);
      padding-right: px2rem(18px);
      @include display-flex-center;

      @media (max-width: 1200px) {
        padding-right: px2rem(9px);
      }

      @media (max-width: 768px) {
        height: px2rem(55px);
        margin-right: 0;
        padding-right: 0;
      }

      @media (max-width: 500px) {
        height: px2rem(50px);
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: px2rem(20px);
        background: var(--classC);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);

        @media (max-width: 768px) {
          display: none;
        }
      }

      img {
        min-width: px2rem(40px);
        max-width: px2rem(150px);
        height: px2rem(40px);
        -o-object-fit: cover;
        object-fit: cover;

        @media (max-width: 768px) {
          max-height: px2rem(45px);
        }
      }
    }

    &-nav {
      @include display-flex-center;

      @media (max-width: 768px) {
        display: none;
      }

      .kur_dropdown {
        margin-right: px2rem(16px);

        &.actived {
          .kur_dropdown__link {
            .item {
              color: var(--theme);
              &.current {
                color: var(--theme);

                &::after {
                  opacity: 0;
                  -webkit-transform: scaleX(0.25);
                  transform: scaleX(0.25);
                }
              }
            }
          }
        }

        &__link {
          @include display-flex-center;

          .item {
            height: px2rem(60px);
            line-height: px2rem(60px);
            font-size: px2rem(16px);
            font-size: initial;
            padding-left: px2rem(8px);
            padding-right: px2rem(3px);
            -webkit-transition: color 0.35s;
            transition: color 0.35s;
            white-space: nowrap;
            color: var(--main);

            &:hover {
              color: var(--theme);

              &::after {
                opacity: 0;
                -webkit-transform: scaleX(0.25);
                transform: scaleX(0.25);
              }
            }
          }
        }

        &__menu {
          min-width: px2rem(90px);
          max-width: px2rem(200px);
          text-align: center;

          &::before {
            content: "";
            position: absolute;
            top: px2rem(-10px);
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: px2rem(8px) solid transparent;
            border-right: px2rem(8px) solid transparent;
            border-bottom: px2rem(8px) solid var(--theme);
          }

          .item {
            display: block;
            height: px2rem(34px);
            margin-right: 0;
            line-height: px2rem(34px);
            color: var(--classF);
            padding: 0 px2rem(16px);
            -webkit-transition: color 0.35s, background 0.35s;
            transition: color 0.35s, background 0.35s;
            @include truncate;

            &:hover {
              color: var(--theme);
              background: var(--sib);

              &::after {
                opacity: 0;
                -webkit-transform: scaleX(0.25);
                transform: scaleX(0.25);
              }
            }
            &.current {
              color: var(--theme);
              background: var(--sib);

              &::after {
                opacity: 0;
                -webkit-transform: scaleX(0.25);
                transform: scaleX(0.25);
              }
            }
          }
        }
      }

      .item {
        cursor: pointer;
        position: relative;
        height: px2rem(60px);
        line-height: px2rem(60px);
        font-size: px2rem(16px);
        padding: 0 px2rem(8px);
        margin-right: px2rem(10px);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        white-space: nowrap;
        color: var(--main);
        -webkit-transition: color 0.35s;
        transition: color 0.35s;
        @include display-flex-center;
        // :last-child {
        //   margin-right: 0;
        // }

        &::after {
          opacity: 0;
          position: absolute;
          bottom: 0;
          left: px2rem(6px);
          right: px2rem(6px);
          content: "";
          height: px2rem(3px);
          -webkit-transform: scaleX(0.25);
          transform: scaleX(0.25);
          background: var(--theme);
          border-radius: px2rem(6px) px2rem(6px) 0 0;
          -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
          transition: opacity 0.5s, transform 0.5s;
          transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;
        }

        &:hover {
          color: var(--theme);

          &::after {
            opacity: 0.3;
            -webkit-transform: scaleX(0.7);
            transform: scaleX(0.7);
          }
        }

        &.current {
          color: var(--theme);

          &::after {
            opacity: 1;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
          }
        }

        i {
          display: none;
          margin-right: px2rem(4px);
          font-size: px2rem(16px);
          font-size: initial;
          -webkit-transition: -webkit-transform 0.5s;
          transition: transform 0.5s;
          transition: transform 0.5s, -webkit-transform 0.5s;

          @media (min-width: 1024px) {
            display: inline-block;
          }
        }
      }
    }

    &-search {
      position: relative;
      margin-left: auto;
      @include display-flex-center;

      @media (max-width: 768px) {
        display: none;
      }

      .input {
        background: var(--classC);
        width: px2rem(70px);
        height: px2rem(34px);
        border: 1px solid transparent;
        padding: 0 px2rem(14px) 0 px2rem(16px);
        color: var(--routine);
        -webkit-transition: width 0.35s, border-color 0.35s, padding-right 0.35s;
        transition: width 0.35s, border-color 0.35s, padding-right 0.35s;
        border-radius: px2rem(17px) 0 0 px2rem(17px);

        @media (min-width: 1024px) {
          width: px2rem(170px);
        }

        &:focus {
          background: var(--background);
          border-color: var(--theme);
          padding-right: px2rem(28px);
          width: px2rem(170px);
        }

        &:focus ~ .icon {
          -webkit-transform: translate3d(0, -50%, 0) rotateY(180deg);
          transform: translate3d(0, -50%, 0) rotateY(180deg);
        }
      }

      .icon {
        position: absolute;
        top: 50%;
        right: px2rem(44px);
        width: px2rem(28px);
        height: px2rem(38px);
        background: url(data:image/png;base64,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);
        background-size: 100% 100%;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        transition: transform 0.35s, -webkit-transform 0.35s;
        -webkit-transform: translate3d(100%, -50%, 0) rotateY(180deg);
        transform: translate3d(100%, -50%, 0) rotateY(180deg);
      }

      .submit {
        position: relative;
        z-index: 1;
        width: px2rem(50px);;
        height: px2rem(34px);
        border: 0;
        background: var(--theme);
        border-radius: 0 px2rem(17px) px2rem(17px) 0;

        &-search {
          -webkit-transform-origin: right bottom;
          transform-origin: right bottom;
          font-size: px2rem(16px);
          color: #fff;
        }
      }

      .result {
        position: absolute;
        z-index: 2;
        top: px2rem(60px);
        left: 0;
        right: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        visibility: hidden;
        opacity: 0;
        background: var(--sib-background);
        -webkit-box-shadow: 0 0 px2rem(10px) rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 px2rem(10px) rgba(0, 0, 0, 0.15);
        border-radius: var(--radius-inner);
        -webkit-transition: visibility 0.35s, opacity 0.35s,
          -webkit-transform 0.35s;
        transition: visibility 0.35s, opacity 0.35s, transform 0.35s;
        transition: visibility 0.35s, opacity 0.35s, transform 0.35s,
          -webkit-transform 0.35s;
        -webkit-transform: translate3d(0, 16px, 0);
        transform: translate3d(0, 16px, 0);

        &.actived {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          opacity: 1;
          visibility: visible;
        }

        .item {
          height: px2rem(40px);
          line-height: px2rem(40px);
          overflow: hidden;
          padding: 0 px2rem(10px);
          border-bottom: 1px solid var(--classD);
          -webkit-transition: background 0.35s;
          transition: background 0.35s;
          @include display-flex-center;

          &:hover {
            background: var(--classC);
          }

          &:first-child {
            border-radius: var(--radius-inner) var(--radius-inner) 0 0;
          }

          &:last-child {
            border-radius: 0 0 var(--radius-inner) var(--radius-inner);
            border-bottom: none;
          }

          &:nth-child(1) > .sort {
            background: #fe2d46;
          }

          &:nth-child(2) > .sort {
            background: #f60;
          }

          &:nth-child(3) > .sort {
            background: #faa90e;
          }

          .sort {
            color: #fff;
            background: #7f7f8c;
            width: px2rem(18px);
            height: px2rem(18px);
            line-height: px2rem(18px);
            border-radius: 2px;
            text-align: center;
            margin-right: px2rem(8px);
            font-weight: 500;
          }

          .text {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            min-width: 0;
            color: var(--routine);
            font-size: px2rem(12px);
            @include truncate;
          }
        }
      }
      &-mobile {
        position: relative;
        margin-left: auto;
        @include display-flex-center;
        .input {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          background: var(--classC);
          width: px2rem(170px);
          height: px2rem(34px);
          border: 1px solid transparent;
          padding: 0 px2rem(14px) 0 px2rem(16px);
          color: var(--routine);
          -webkit-transition: width 0.35s, border-color 0.35s,
            padding-right 0.35s;
          transition: width 0.35s, border-color 0.35s, padding-right 0.35s;
          border-radius: px2rem(17px) 0 0 px2rem(17px);
          &:focus {
            background: var(--background);
            border-color: var(--theme);
            padding-right: px2rem(28px);
            width: px2rem(170px);
          }
        }
        .submit {
          position: relative;
          z-index: 1;
          width: px2rem(50px);
          height: px2rem(34px);
          color: #fff;
          border: 0;
          background: var(--theme);
          border-radius: 0 px2rem(17px) px2rem(17px) 0;
        }
      }
    }

    &-searchicon {
      display: none;
      cursor: pointer;
      font-size: px2rem(20px);
      color: var(--routine);

      @media (max-width: 768px) {
        display: block;
        margin-left: 0;
      }

      @media (max-width: 500px) {
        margin-left: 0;
      }
    }
  }

  &__slideout {
    visibility: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 78%;
    max-width: px2rem(480px);
    background: var(--classD);
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    -webkit-transition: visibility 0.35s, -webkit-transform 0.35s;
    transition: transform 0.35s, visibility 0.35s;
    transition: transform 0.35s, visibility 0.35s, -webkit-transform 0.35s;

    &.actived {
      visibility: visible;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    &-wrap {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      -ms-scroll-chaining: none;
      overscroll-behavior: contain;
      position: relative;
      padding: px2rem(135px) px2rem(15px) px2rem(15px);
      height: 100%;

      .social-account {
        padding: 0;
        margin-bottom: px2rem(10px);
        border: unset;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        text-align: center;
        font-size: px2rem(14px);
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
        }
      }
    }

    &-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(150px);
      -o-object-fit: cover;
      object-fit: cover;
      z-index: -1;
    }

    &-author {
      margin-bottom: px2rem(15px);
      padding: px2rem(15px);
      background: var(--background);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);
      @include display-flex-center;

      .avatar {
        width: px2rem(50px);
        height: px2rem(50px);
        margin-right: px2rem(10px);
        border-radius: var(--radius-inner);
      }

      .info {
        overflow: hidden;
        line-height: px2rem(25px);

        .link {
          display: block;
          font-size: px2rem(15px);
          font-weight: 500;
          color: var(--main);
          cursor: pointer;
          @include truncate;
        }

        .motto {
          max-width: px2rem(170px);
          font-size: px2rem(12px);
          color: var(--routine);
          @include truncate;
        }
      }
    }

    &-count {
      margin-bottom: px2rem(15px);
      padding: px2rem(10px) px2rem(15px);
      background: var(--background);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);

      .item {
        color: var(--routine);
        padding: px2rem(5px) 0;
        @include display-flex-center;

        i {
          color: var(--routine);
          margin-right: px2rem(5px);
        }

        strong {
          font-weight: 500;
          color: var(--theme);
        }
      }
    }

    &-menu {
      overflow: hidden;
      padding: px2rem(10px) px2rem(15px);
      background: var(--background);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);

      .link {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: px2rem(10px) 0;
        color: var(--main);
        -webkit-transition: color 0.15s;
        transition: color 0.15s;
        cursor: pointer;
        @include display-flex-center;

        .rotateDiv {
          display: block;
          width: px2rem(7px);
          height: px2rem(7px);
          -webkit-transform: translateY(10%) rotate(-45deg);
          transform: translateY(10%) rotate(-45deg);
          border-width: 0;
          border-color: var(--main);
          border-style: solid;
          border-bottom-width: 1px;
          border-right-width: 1px;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 500ms;
          margin-left: px2rem(8px);
          margin-right: px2rem(8px);
          &.actived {
            -webkit-transform: translateY(10%) rotate(45deg);
            transform: translateY(10%) rotate(45deg);
            border-color: var(--theme);
          }
        }

        &.in,
        &.in a {
          color: var(--theme);
        }

        a {
          -webkit-transition: color 0.15s;
          transition: color 0.15s;
          color: var(--routine);
        }
      }

      .slides {
        border-left: 1px solid var(--classC);
        padding-left: px2rem(15px);
        transition: height 500ms cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;

        .link {
          color: var(--routine);

          &.current {
            color: var(--theme);
            font-weight: 500;
            font-size: px2rem(15px);
          }
        }
      }
    }
  }

  &__searchout {
    position: absolute;
    top: px2rem(60px);
    left: 0;
    right: 0;
    z-index: 5;
    background: var(--background);
    border-top: 1px solid var(--classC);
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    -webkit-transition: visibility 0.35s, -webkit-transform 0.35s;
    transition: transform 0.35s, visibility 0.35s;
    transition: transform 0.35s, visibility 0.35s, -webkit-transform 0.35s;
    visibility: hidden;
    @media (max-width: 768px) {
      top: px2rem(50px);
    }

    &.actived {
      visibility: visible;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    .kur_container {
      margin-bottom: px2rem(10px) !important;
    }

    &-inner {
      padding: px2rem(15px) 0;
      width: 100%;
      .title {
        color: var(--routine);
        padding: px2rem(14px) 0 px2rem(10px);
        font-size: px2rem(14px);
        @include display-flex-center;
        .kur-font {
          margin-right: px2rem(5px);
          font-size: px2rem(14px);
          color: var(--routine);
        }
      }
      .tags {
        @include display-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin: 0 px2rem(-5px) px2rem(-5px);
        max-height: px2rem(250px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-scroll-chaining: none;
        overscroll-behavior: contain;
        .item {
          padding: px2rem(4px);
          a {
            display: block;
            padding: 0 px2rem(10px);
            height: px2rem(24px);
            line-height: px2rem(24px);
            border-radius: px2rem(2px);
            font-size: px2rem(12px);
            color: #fff;
          }
        }
      }
    }
  }

  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    opacity: 0;
    visibility: hidden;
    -webkit-transition: visibility 0.35s, opacity 0.35s;
    transition: visibility 0.35s, opacity 0.35s;
    &.actived {
      visibility: visible;
      opacity: 1;
    }
    &.slideout {
      z-index: 6;
    }
  }

  @media only screen and (max-width: 500px) {
    height: px2rem(50px);
  }

  @media only screen and (max-width: 768px) {
    top: 0;
    height: px2rem(55px);
    -webkit-animation-fill-mode: backwards;
    animation-fill-mode: backwards;
  }
}
</style>