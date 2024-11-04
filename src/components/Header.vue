<template>
  <header class="kur_header">
    <div class="kur_header__above topInDown" ref="menuAbove">
      <div class="kur_container kur_header__above-container">
        <i
          class="iconfont icon-mune-02-01 kur_header__above-slideicon"
          id="menuPeBtn"
          @click="clickPEMenuIcon"
        ></i>
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
              <i class="iconfont" :class="menu.meta?.icon"></i>{{ menu.meta?.title }}
            </router-link>
            <div
              class="kur_dropdown"
              :class="{
                actived: state.activedDropFrameMenu === menu.name?.toString()
              }"
              trigger="hover"
              placement="3.75rem"
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
                      menu.children.findIndex(sub => `${menu.path}/${sub.path}` === activedMenu) > -1,
                  }"
                >
                  <i class="iconfont" :class="menu.meta?.icon"></i>{{ menu.meta?.title }}
                </router-link>
                <div class="rotateDiv"></div>
              </div>
              <ul class="kur_dropdown__menu" style="top: 3.75rem" v-cloak>
                <li v-for="childMenu in menu.children" :key="childMenu.name">
                  <router-link
                    :to="childMenu.path"
                    class="item"
                    :class="{
                      current: `${menu.path}/${childMenu.path}` === activedMenu,
                    }"
                  >
                    <i class="iconfont" :class="childMenu.meta?.icon"></i
                    >{{ childMenu.meta?.title }}
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
            <i class="iconfont icon-sousuo submit-search"></i>
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
          class="iconfont icon-search-01 kur_header__above-searchicon"
          @click="clickPESearchBtn"
        ></i>
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
          <a class="link panel" href="#" @click="onClickExpandPEMenu">
            <span>栏目</span>
            <div class="rotateDiv"></div>
          </a>
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
                    >{{ menu.meta?.title }}</router-link>
                </li>
                <li v-else class="hasChild">
                  <div
                    class="link hasChild-body contentChild"
                    :class="{
                      current: activedMenu === menu.path,
                      in: menu.children.findIndex(sub => `${menu.path}/${sub.path}` === activedMenu) > -1,
                    }"
                    style="height: 40px"
                  >
                    <router-link :to="menu.path" :title="menu.meta?.title">
                      {{ menu.meta?.title }}</router-link
                    >
                    <div class="rotateDiv" @click="onClickExpandPESubMenu(menu.name?.toString())"></div>
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
    <div class="kur_header__searchout" v-cloak>
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
            <i class="iconfont kur-font icon-yingyong"></i>标签搜索
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
    <div class="kur_header__mask"></div>
  </header>
</template>

<script lang="ts" setup>
import { routes } from '@/plugins/router';
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Collapse } from 'vue-collapsed'

const route = useRoute();

const info = {
  name: '',
  motto: '',
  github: '',
  bilibili: '',
  matlto: '',
}

const state = reactive({
  stickyArticleList: [] as any[],
  tags: [] as any[],
  articlesNums: 0,
  tagsCNums: 0,
  commentsNums: 0,

  activedDropFrameMenu: undefined  as undefined | string,
  activedCollapseSubMenu: undefined as undefined | string,
  isSildeOutVisable: false,
  isResultFrameVisable: false,
  isExpandedPEMenu: false,
});

const activedMenu = computed(() => {
  return route.path;
})

const menuTree = computed(() => {
  return routes.filter(route => route.meta?.hidden);
});

const clickPESearchBtn = () => {
  // TODO: 跳转到搜索结果页
}

const clickPEMenuIcon = () => {
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
  state.activedCollapseSubMenu = name;
}

const hideDropFrame = () => {
  state.activedDropFrameMenu = undefined;
}
</script>

<style lang="scss" scoped>
@mixin display-flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

@mixin display-flex-center {
  @include display-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

@mixin truncate {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.kur_header {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 3.75rem;

  @media (max-width: 768px) {
    top: 0;
    height: 3.4375rem;
    -webkit-animation-fill-mode: backwards;
    animation-fill-mode: backwards;
  }

  @media (max-width: 500px) {
    height: 3.125rem;
  }

  &__above {
    position: fixed;
    top: 0;
    z-index: 6;
    width: 100%;
    background: var(--background);
    -webkit-box-shadow: 0 2px 0.625rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 0.625rem 0 rgba(0, 0, 0, 0.2);
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
      -webkit-transform: translate3d(0, -3.75rem, 0);
      transform: translate3d(0, -3.75rem, 0);
    }

    &-container {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      min-height: 2.75rem;
      margin: 0 auto;

      @media (max-width: 768px) {
        height: 3.4375rem;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      @media (max-width: 500px) {
        margin: 0 auto;
        height: 3.125rem;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
    }

    &-slideicon {
      display: none;
      cursor: pointer;
      font-size: 1.25rem;
      color: var(--routine);

      @media (max-width: 768px) {
        display: block;
      }
    }

    &-logo {
      @include display-flex-center;
      position: relative;
      height: 3.75rem;
      margin-right: 0.625rem;
      padding-right: 1.125rem;

      @media (max-width: 1200px) {
        padding-right: 0.6rem;
      }

      @media (max-width: 768px) {
        height: 3.4375rem;
        margin-right: 0;
        padding-right: 0;
      }

      @media (max-width: 500px) {
        height: 3.125rem;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 1.25rem;
        background: var(--classC);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);

        @media (max-width: 768px) {
          display: none;
        }
      }

      img {
        min-width: 2.5rem;
        max-width: 9.375rem;
        height: 2.5rem;
        -o-object-fit: cover;
        object-fit: cover;

        @media (max-width: 768px) {
          max-height: 2.8125rem;
        }
      }
    }

    &-nav {
      @include display-flex-center;

      @media (max-width: 768px) {
        display: none;
      }

      .kur_dropdown {
        margin-right: 1rem;

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
            height: 3.75rem;
            line-height: 3.75rem;
            font-size: 1rem;
            font-size: initial;
            padding-left: 0.5rem;
            padding-right: 0.1875rem;
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
          min-width: 5.625rem;
          max-width: 12.5rem;
          text-align: center;

          &::before {
            content: "";
            position: absolute;
            top: -0.625rem;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 0.5rem solid transparent;
            border-right: 0.5rem solid transparent;
            border-bottom: 0.5rem solid var(--theme);
          }

          .item {
            display: block;
            height: 2.125rem;
            margin-right: 0;
            line-height: 2.125rem;
            color: var(--classF);
            @include truncate;
            padding: 0 1rem;
            -webkit-transition: color 0.35s, background 0.35s;
            transition: color 0.35s, background 0.35s;

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
        @include display-flex-center;
        cursor: pointer;
        position: relative;
        height: 3.75rem;
        line-height: 3.75rem;
        font-size: 1rem;
        padding: 0 0.5rem;
        margin-right: 0.625rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        white-space: nowrap;
        color: var(--main);
        -webkit-transition: color 0.35s;
        transition: color 0.35s;
        // :last-child {
        //   margin-right: 0;
        // }

        &::after {
          opacity: 0;
          position: absolute;
          bottom: 0;
          left: 0.375rem;
          right: 0.375rem;
          content: "";
          height: 0.1875rem;
          -webkit-transform: scaleX(0.25);
          transform: scaleX(0.25);
          background: var(--theme);
          border-radius: 0.375rem 0.375rem 0 0;
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
          margin-right: 0.25rem;
          font-size: 1rem;
          font-size: initial;
          -webkit-transition: -webkit-transform 0.5s;
          transition: transform 0.5s;
          transition: transform 0.5s, -webkit-transform 0.5s;

          @media (min-width: 1024px) {
            display: inline-block;
          }
        }
      }

      .travelling-link {
        @include display-flex-center;
        height: 3.75rem;
        line-height: 3.75rem;
        font-size: 1rem;
        font-family: "Lobster";
        position: relative;
        -webkit-transition: -webkit-transform 0.5s;
        transition: transform 0.5s;
        transition: transform 0.5s, -webkit-transform 0.5s;

        @media (max-width: 768px) {
          display: none;
        }

        color: var(--main);

        &:hover {
          color: var(--theme);

          &::before {
            opacity: 0.3;
            -webkit-transform: scaleX(0.7);
            transform: scaleX(0.7);
          }
        }

        &:hover i {
          color: var(--theme);
        }

        &::before {
          opacity: 0;
          position: absolute;
          bottom: 0;
          left: 0.375rem;
          right: 0.375rem;
          content: "";
          height: 0.1875rem;
          -webkit-transform: scaleX(0.25);
          transform: scaleX(0.25);
          background: var(--theme);
          border-radius: 0.375rem 0.375rem 0 0;
          -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
          transition: opacity 0.5s, transform 0.5s;
          transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;

          @media (max-width: 768px) {
            display: none;
          }
        }

        i {
          color: var(--main);
          display: inline-block;
          margin-right: 0.1rem;
          font-size: 1rem;
          font-size: initial;
          -webkit-transition: -webkit-transform 0.5s;
          transition: transform 0.5s;
          transition: transform 0.5s, -webkit-transform 0.5s;
        }
      }
    }

    &-search {
      position: relative;
      margin-left: auto;

      @media (max-width: 768px) {
        display: none;
      }

      @include display-flex-center;

      .input {
        background: var(--classC);
        width: 4.375rem;
        height: 2.125rem;
        border: 1px solid transparent;
        padding: 0 0.875rem 0 1rem;
        color: var(--routine);
        -webkit-transition: width 0.35s, border-color 0.35s, padding-right 0.35s;
        transition: width 0.35s, border-color 0.35s, padding-right 0.35s;
        border-radius: 1.0625rem 0 0 1.0625rem;

        @media (min-width: 1024px) {
          width: 10.625rem;
        }

        &:focus {
          background: var(--background);
          border-color: var(--theme);
          padding-right: 1.75rem;
          width: 10.625rem;
        }

        &:focus ~ .icon {
          -webkit-transform: translate3d(0, -50%, 0) rotateY(180deg);
          transform: translate3d(0, -50%, 0) rotateY(180deg);
        }
      }

      .icon {
        position: absolute;
        top: 50%;
        right: 2.75rem;
        width: 1.75rem;
        height: 2.375rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAmCAYAAADX7PtfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAHKElEQVRYw93Xe3DNdxrH8ecXiSK7i1qWFWW3rekiE2x3VEemtkkVVbWy4jY6atma2YpS6rJoozvbpRF1qW1EEYIk5xZE5EKE3CQi0SB30VwEIeeWnDi3nPf+kUNTE1R3mNn945n5nZkz8zrP53y/39/3EUCeZsn/HCgi80Rky1MDn/H2vjB6SpBVRMb9V6CI+InIBhE58bOez5b9xm9E0wu//0NTr/4+9SKyX0TGicjiP320kpBd+xCRv/0kUFEUf49OnfJGBwWzWn3UcfCGSa8xO1zxFoi3gLbJyZb8S/QeOIhRb0/hiA1GvjkREfF9bFBEQv0C3ySyrIaEO5DjaCXFYkdttKEyWFEbrKiNNjRmBztLrrIqVsfAYb507tJVryjKi48FisiK8Qs/IL4FVEYbOTY7l3FSjJNCp4PDpnZoOzi+BSKKq+j3wostiqK8/KPBv27+6pja9H03uXYHl3FwyeWgGCcFTscPwXalMdnZU1VPn4GDTCLS90eB2ibHHpXRhtpgRWWwkmqxU4yTEpwcvaUno7kZ7f1dtitds4tVcYcRkZMiskhRlCEPBdUG2/a7oNpoQ2Oyc8zUwrsp+QREp7CxpA6N0YbaaENtvBtrW2lMdsIy8xn00u/4aPly9h04QEBgICKy+oGgymiNUBltaN2xflxwlUmqdArKvyX0RBZf1ejbge5y/zi10cbg4SO4Ul3N8dRUqmprcQETJ01CUZQxHXdotH+jMtpYdLact9RniMzOxX6rDAzlrEzOIKLO+EPMXRqTnbCs88yePQuA18aOpWuPXuyIiKCouBgROfQA0Bq1tqiGsPRsMFbiaigBfQXoy1mZnMnOa6YOMBsHb7ewKbuAWTNnAhAQGEjPPn3JyMmh2W5HUZScDkGd0b5/RuoFqmtLiNj8GSLCxcwEMFTw95RM/l1ruBepxtTW2YKMYiYdPouuycHg4SOpqa8nTqPhclkZDuBcYSEiEtMxaLZHByXmU1qUiYeHByLCsZhIMFayPfMs/yy9TrzZQZzByqeX6pigzSLqbB5z4k+jNTvYcCqbvj4++i/Cwi7kFZxvidq/3+UzYAAi8l6HYLzZfiAoIZfoiHBEBBGhNDcZ9BXkln5LoCaLoMR8punOsCM7j8b6EjBWsDjxDHtuNKE1O9h95RrT14QyJngm01at48u8IkTktPtg6da9e/dffb8PTXbVVG0mqRva4pw8PgBMV6CxHBrLuVhZRMO1Ypw3LrPt8zXYrl8CfTmrUzL5ut2C0jY50TW3om1yEm+B/oNf0rvBYfPff//59pEefUd9BtKPU5oQS+vtMmgsx3W7DJf7GfNV5kyfgoiQpNoNxko+Tsog8u6Cuu8wiLfAb/2Gt7hBRUR6tAdTpmozQV/etjrbYXfBxspzKEpb3MU5x8FYwUxdOirDfXvTvT+1TU569vt17YP+w+RJ0ae4WdUWlcsdJfqKtmd9BWcSDiIijHvdH8xVVFdfYmpiPjqznQP1BmIamu6dRBqTnfCcQkQkukPQPyZdNToqzfZWaLKzuvwiGCpoLcrAnqS917G1/iKfL5iLMUkH3xWiK8hnWX4Vhy0uJi9ayqpYHRqzo+1stbgIePc9u4i83iE4O7128cvRp1mRZ2Hy+qRWQ25aW2d1RW0x3+04/zScTITcNJYmZxFxzcj+2lsM8vUjrrHlXrRR1Q107tLlYodnqaIo2iHDhlp8g+bzaSkcqbO0xiXn80boCdbtOkXuuUJuVRdjqbuI42YxNXmpLFkwh6FvTOCoDdeYP09nVazOpWtuRW20oWtu5Z0PlyMiwR2CIrJbG7WNyPD1DBrxCoEh61snhEYwcc1WXvnLelffgOX6gcE7VN1+3sM2cuwfEU9PRCRtftgWQnbupVf/AQSvXMta3TE0ZgeHbprx7tGz6oGvJxHx8vDyOr35sxWYrp4n8VAEsZGbiNsVTvy+7TzXr0+j+3sHRkx4G1GUnc90885bGhWDh4dHlqIo10Xk9oqDanQWF/M3bUVEPnjo+/CTEkJeXbgOX9+h/GPlIrR7t3I8difHYiLp3evZanf03iIyQkR6iKcXnl6dTymK0lVRFD8RmTpj7XqO2mDIq/6ISM+HgicbnPM+r4TVhS1M26IhYNlGxixcg4hiFpHnOrjd/fL+z8P8XyPmtoVOXl6Zj7xinLrpnLux3EXaDQff1ED4dxD8ZRwisvYxbuHquf8KR0Q2PRJcdcm5JL3BwR2blRablVZg1KhRLkVRej8GOFg6dUJEFj0S3F3NYpPVRrPNSovDweGEBERkx0+YNWYoivL8I8E7Tue8O04nFrsdBzDG3x8R8Xli01NISMiSrdu2kZGTzd7oaERk7xMd12ZFJC0b/8nX9Brsh4ikiUj3Jwpes/Ph3qzLeHb7RbGIeD7xgfRIQsIyH5/+RkVR+j+VCXjkyJHdFEXx/r+b8f8DZyW8Jd6/P38AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDItMjBUMTE6NTI6MjQrMDA6MDA4bfPmAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAyLTIwVDExOjUyOjI0KzAwOjAwSTBLWgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=);
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
        width: 3.125rem;
        height: 2.125rem;
        border: 0;
        background: var(--theme);
        border-radius: 0 1.0625rem 1.0625rem 0;

        &-search {
          -webkit-transform-origin: right bottom;
          transform-origin: right bottom;
          font-size: 1.25rem;
          color: #fff;
        }
      }

      .result {
        position: absolute;
        z-index: 2;
        top: 3.75rem;
        left: 0;
        right: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        visibility: hidden;
        opacity: 0;
        background: var(--sib-background);
        -webkit-box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
        border-radius: var(--radius-inner);
        -webkit-transition: visibility 0.35s, opacity 0.35s,
          -webkit-transform 0.35s;
        transition: visibility 0.35s, opacity 0.35s, transform 0.35s;
        transition: visibility 0.35s, opacity 0.35s, transform 0.35s,
          -webkit-transform 0.35s;
        -webkit-transform: translate3d(0, 1rem, 0);
        transform: translate3d(0, 1rem, 0);

        &.actived {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          opacity: 1;
          visibility: visible;
        }

        .item {
          height: 2.5rem;
          line-height: 2.5rem;
          @include display-flex-center;
          overflow: hidden;
          padding: 0 0.625rem;
          border-bottom: 1px solid var(--classD);
          -webkit-transition: background 0.35s;
          transition: background 0.35s;

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
            width: 1.125rem;
            height: 1.125rem;
            line-height: 1.125rem;
            border-radius: 2px;
            text-align: center;
            margin-right: 0.5rem;
            font-weight: 500;
          }

          .text {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            min-width: 0;
            @include truncate;
            color: var(--routine);
            font-size: 0.75rem;
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
          width: 10.625rem;
          height: 2.125rem;
          border: 1px solid transparent;
          padding: 0 0.875rem 0 1rem;
          color: var(--routine);
          -webkit-transition: width 0.35s, border-color 0.35s,
            padding-right 0.35s;
          transition: width 0.35s, border-color 0.35s, padding-right 0.35s;
          border-radius: 1.0625rem 0 0 1.0625rem;
          &:focus {
            background: var(--background);
            border-color: var(--theme);
            padding-right: 28px;
            width: 170px;
          }
        }
        .submit {
          position: relative;
          z-index: 1;
          width: 3.125rem;
          height: 2.125rem;
          color: #fff;
          border: 0;
          background: var(--theme);
          border-radius: 0 1.0625rem 1.0625rem 0;
        }
      }
    }

    &-searchicon {
      display: none;
      cursor: pointer;
      font-size: 1.25rem;
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
    max-width: 30rem;
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
      padding: 8.4375rem 0.9375rem 0.9375rem;
      height: 100%;

      .social-account {
        padding: 0;
        margin-bottom: 0.625rem;
        border: unset;
        @include display-flex-center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        text-align: center;
        font-size: 0.875rem;

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
      height: 9.375rem;
      -o-object-fit: cover;
      object-fit: cover;
      z-index: -1;
    }

    &-author {
      @include display-flex-center;
      margin-bottom: 0.9375rem;
      padding: 0.9375rem;
      background: var(--background);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);

      .avatar {
        width: 3.125rem;
        height: 3.125rem;
        margin-right: 0.625rem;
        border-radius: var(--radius-inner);
      }

      .info {
        overflow: hidden;
        line-height: 1.5625rem;

        .link {
          display: block;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--main);
          @include truncate;
          cursor: pointer;
        }

        .motto {
          max-width: 10.625rem;
          font-size: 0.75rem;
          color: var(--routine);
          @include truncate;
        }
      }
    }

    &-count {
      margin-bottom: 0.9375rem;
      padding: 0.625rem 0.9375rem;
      background: var(--background);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);

      .item {
        @include display-flex-center;
        color: var(--routine);
        padding: 0.3125rem 0;

        i {
          color: var(--routine);
          margin-right: 0.3125rem;
        }

        strong {
          font-weight: 500;
          color: var(--theme);
        }
      }
    }

    &-menu {
      overflow: hidden;
      padding: 0.625rem 0.9375rem;
      background: var(--background);
      border-radius: var(--radius-wrap);
      -webkit-box-shadow: var(--box-shadow);
      box-shadow: var(--box-shadow);

      .link {
        @include display-flex-center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0.625rem 0;
        color: var(--main);
        -webkit-transition: color 0.15s;
        transition: color 0.15s;
        cursor: pointer;

        &.in {
          .rotateDiv {
            -webkit-transform: translateY(10%) rotate(45deg);
            transform: translateY(10%) rotate(45deg);
            border-color: var(--theme);
          }
        }

        .rotateDiv {
          width: 0.4rem;
          height: 0.4rem;
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
          margin-left: 0.45rem;
          margin-right: 0.45rem;
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
        padding-left: 15px;
        transition: height 500ms cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;

        .link {
          color: var(--routine);

          &.current {
            color: var(--theme);
            font-weight: 500;
            font-size: 0.9375rem;
          }
        }
      }
    }
  }
  &__searchout {
    position: absolute;
    top: 3.75rem;
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
      top: 3.4375rem;
    }

    &.actived {
      visibility: visible;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    .kur_container {
      margin-bottom: 0.625rem !important;
    }

    &-inner {
      padding: 0.9375rem 0;
      width: 100%;
      .title {
        @include display-flex-center;
        color: var(--routine);
        padding: 0.875rem 0 10px;
        font-size: 0.875rem;
        .kur-font {
          margin-right: 0.3125rem;
          font-size: 1.25rem;
          color: var(--routine);
        }
      }
      .tags {
        @include display-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin: 0 -0.3125rem -0.3125rem;
        max-height: 15.625rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-scroll-chaining: none;
        overscroll-behavior: contain;
        .item {
          padding: 0.25rem;
          a {
            display: block;
            padding: 0 0.625rem;
            height: 1.5rem;
            line-height: 1.5rem;
            border-radius: 0.125rem;
            font-size: 0.75rem;
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
    -webkit-backdrop-filter: blur(0.3125rem);
    backdrop-filter: blur(0.3125rem);
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
}
</style>