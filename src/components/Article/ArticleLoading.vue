<template>
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
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .kur_list__loading {
    .item {
      width: 100%;
      padding: px2rem(15px) 0;
      border-bottom: 1px solid var(--classC);
      position: relative;
      @include display-flex;
      .thumbnail {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        position: relative;
        width: px2rem(210px);
        height: px2rem(140px);
        margin-right: px2rem(15px);
        background: var(--classD);
        -webkit-animation: list_thumbnail_loading 0.5s infinite alternate;
        animation: list_thumbnail_loading 0.5s infinite alternate;
        border-radius: var(--radius-inner);
      }
      .information {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        min-width: 0;
        .title {
          height: px2rem(24px);
          border-radius: var(--radius-inner);
          background: var(--classD);
          -webkit-animation: list_title_loading 0.75s infinite alternate;
          animation: list_title_loading 0.75s infinite alternate;
          margin-bottom: px2rem(15px);
        }
        .abstract p {
          border-radius: var(--radius-inner);
          background: var(--classD);
          height: px2rem(18px);
          margin-bottom: px2rem(5px);
          -webkit-animation: list_abstract_loading 0.8s infinite alternate;
          animation: list_abstract_loading 0.8s infinite alternate;
        }
      }
    }
  }
</style>