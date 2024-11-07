<template>
  <div class="kur_index__article">
    <div class="kur_index__title">
      <ul class="kur_index__title-title passage-list-tabs">
        <li class="item" data-type="1">最新文章</li>
        <li class="item actived" data-type="2">热门文章</li>
        <li class="item" data-type="3">最近更新</li>
        <li class="item" data-type="4">最多点赞</li>
        <li class="line" style="width: 56px; left: 72px"></li>
      </ul>
    </div>
    <div class="kur_index__list">
      <div class="kur_list">
        <li
          class="kur_list__item default animated wow"
          data-wow-delay="0.0s"
          style="
            visibility: visible;
            animation-delay: 0s;
            animation-name: fadeInUp;
          "
        >
          <a
            href="/archives/algorithm-templates-and-tricks"
            class="thumbnail"
            title="【算法模板】工具 &amp; 模板 &amp; 技巧"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              width="100%"
              height="100%"
              class="ls-is-cached"
              src="https://img.gabrielxd.top/blog/algorithm-tools-and-templates.jpg"
              alt="【算法模板】工具 &amp; 模板 &amp; 技巧"
              loading="lazy"
            />
            <time datetime="2022-05-24">2022-05-24</time>
            <i class="kur-font iconfont"></i>
          </a>
          <div class="information">
            <a
              href="/archives/algorithm-templates-and-tricks"
              class="title"
              title="【算法模板】工具 &amp; 模板 &amp; 技巧"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="badge" style="display: inline-block">置顶</span
              >【算法模板】工具 &amp; 模板 &amp; 技巧</a
            >
            <a
              class="abstract"
              href="/archives/algorithm-templates-and-tricks"
              title="文章摘要"
              target="_blank"
              rel="noopener noreferrer"
              >枚举、数据结构、栈、队列、堆、二分查找、双指针、差分、前缀和、单调栈、单调队列、哈希、离散化、字符串哈希、KMP算法、Trie树、数论、组合数、动态规划、树状数组、线段树……</a
            >
            <div class="meta">
              <ul class="items">
                <li>2022-05-24</li>
              </ul>
              <ul class="categories">
                <li class="pcate">
                  <svg
                    class="icon"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M512.2 564.743a76.818 76.818 0 0 1-30.973-6.508L108.224 393.877c-26.105-11.508-42.56-35.755-42.927-63.272-.384-27.44 15.356-52.053 41.042-64.232l373.004-176.74c20.591-9.737 45.16-9.755 65.75.017L917.68 266.39c25.668 12.188 41.39 36.792 41.024 64.231-.384 27.5-16.821 51.73-42.908 63.237l-372.57 164.377a77.18 77.18 0 0 1-31.025 6.508zM139.843 329.592l370.213 163.241c1.291.56 3.018.567 4.345-.009l369.758-163.128-369.706-175.464v-.01c-1.326-.628-3.158-.636-4.502 0l-370.108 175.37zm748.015 1.858h.175-.175zM512.376 941.674c-10.348 0-20.8-2.32-30.537-6.997L121.05 778.624c-18.113-7.834-26.454-28.87-18.62-46.983 7.835-18.112 28.862-26.488 46.993-18.61l362.08 156.629 345.26-156.366c17.939-8.166 39.14-.253 47.324 17.746 8.166 17.964.227 39.157-17.729 47.324l-344.51 156.61c-9.196 4.449-19.281 6.7-29.471 6.7z"
                      fill="var(#909399)"
                    ></path>
                    <path
                      d="M871.563 515.449L511.81 671.775 152.358 515.787v73.578a34.248 34.248 0 0 0 20.76 31.48l301.518 129.19c11.806 5.703 24.499 8.546 37.175 8.546s25.367-2.843 37.174-8.546L850.82 620.534a34.248 34.248 0 0 0 20.744-31.474V515.45z"
                      fill="#ff6a18"
                    ></path>
                  </svg>
                  <a
                    class="link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/categories/algorithm"
                    >算法</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </li>
      </div>
      <ul class="kur_list__loading" style="display: none">
        <li class="item">
          <div class="thumbnail"></div>
          <div class="information">
            <div class="title"></div>
            <div class="abstract">
              <p></p>
              <p></p>
            </div>
          </div>
        </li>
        <li class="item">
          <div class="thumbnail"></div>
          <div class="information">
            <div class="title"></div>
            <div class="abstract">
              <p></p>
              <p></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="kur_empty hide">
        <svg
          class="joe_empty-icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
        >
          <path
            d="M483.322 136.98l-2.08-116.502A19.278 19.278 0 0 1 499.266 0h2.512c12.439.104 22.574 10.063 22.574 22.43l4.048 114.446a22.702 22.702 0 0 1-22.606 22.43c-10.136-1.952-22.479-10.079-22.479-22.326h.016zm165.034 16.943c-8.751 8.695-23.27 5.847-32.045 0a22.638 22.638 0 0 1 0-31.702L700.8 44.156a23.006 23.006 0 0 1 31.933 0c8.76 8.703 8.76 23.118 0 28.958l-84.377 80.793zm-287.215 0l-84.369-80.921c-8.767-5.824-8.767-20.135 0-28.95a23.006 23.006 0 0 1 31.917 0l84.497 78.058a22.606 22.606 0 0 1 0 31.7c-8.775 5.944-23.278 8.8-32.045.113zm488.686 679.445v9.84l-8.871 3.663-306.238 125.43-5.76 2.64V645l9.904 17.15 60.283 105.063a15.206 15.206 0 0 0 13.03 7.327 14.879 14.879 0 0 0 7.952-2.055L850.17 658.047V833.36h-.328l-.016.008zm-671.486 13.503l-9.44-3.655V654.824l.448.456 236.396 117.086a23.86 23.86 0 0 0 7.96 2.047 17.15 17.15 0 0 0 14.158-7.759l59.715-104.615 9.92-17.158V977.46l-13.152-5.28-306.005-125.317zm-21.998-415.308l4.72-8.8 323.411 162.85 4.84 2.616-2.76 4.696-77.57 138.932-2.655 4.24-4.72-2.056L77.15 572.663l5.888-10.4 73.298-130.708h.008zM484.93 304.646l12.56-4.12V552.41h-6.336l-1.608-1.024-295.063-147.868 9.92-3.663 280.527-95.208zm328.716 95.784l14.175 4.695-291.487 146.708-7.375 3.663V303.054l5.303 1.6 279.392 95.792v-.016zM935.82 562.256l7.367 13.503-320.293 159.306-4.847 2.056-2.52-4.12-77.113-139.508-2.528-4.688 4.704-2.64L858.722 426.98l2.192 3.664 74.922 131.62h-.016zm49.1 12.463L884.863 397.334v-1.016a16.047 16.047 0 0 0-6.775-7.327l-359.05-133.797-1.04-.56-1.031-.464a14.967 14.967 0 0 0-7.968-2.176 13.71 13.71 0 0 0-7.84 2.176l-1.023.464-1.144.56-357.881 134.253a25.649 25.649 0 0 0-9.455 8.815l-100.04 178.52a19.414 19.414 0 0 0 8.88 24.958l81.249 40.053 8.43 4.231v207.15a18.91 18.91 0 0 0 10.48 17.151l358.45 151.42c2.99 1.487 6.223 2.159 9.438 2.159 3.248 0 6.48-.672 9.455-2.16l356.498-151.987h1.04a18.022 18.022 0 0 0 11.99-17.158V644.417l7.84-4.128 78.593-40.157 3.232-1.503 3.008-2.048a15.807 15.807 0 0 0 4.72-21.87v.008z"
          ></path>
        </svg>
        <span>还没有文章数据欸……</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
  .kur_index {
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
</style>