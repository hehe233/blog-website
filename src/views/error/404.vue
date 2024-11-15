<template>
  <section class="kur_page_404">
    <div class="error">
      <img class="error-image" src="@/assets/images/notFound.png" alt="404" />
      <h3 class="title">“未找到您要的页面”</h3>
      <router-link
        to="/"
        class="error_link"
        v-cloak
      >回到主页</router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .kur_page_404 {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    color: #666;
    text-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    @include display-flex-center;
    .error {
      margin-top: -10vh;
      .error-image {
        width: 60%;
        max-width: px2rem(700px);
      }
      .title {
        font-size: px2rem(30px);
        margin-top: px2rem(20px);
        margin-bottom: px2rem(40px);
        -webkit-user-select: none;
        user-select: none;
        font-weight: 300;
        color: #888;
      }
      .error_link {
        padding: px2rem(12px) px2rem(36px);
        font-size: px2rem(14px);
        text-decoration: none;
        -webkit-user-select: none;
        user-select: none;
        color: #999;
        border: 1px solid #999;
        border-radius: px2rem(100px);
        -webkit-transition: color .3s;
        transition: color .3s;
        &:hover {
          color: #6c63ff;
          border-color: #6c63ff;
        }
      }
    }
  }
</style>