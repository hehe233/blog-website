<template>
  <footer class="kur_footer">
    <div class="kur_container">
      <p>
        <span>Copyright © 2024</span>
        <router-link
          to="/"
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          v-cloak
        >
          {{ PersonInfo.name }}
        </router-link>
      </p>
      <p>Powered by Vue</p>
      <p>
        <a
          class="link"
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          粤ICP备2021020902号
        </a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { PersonInfo } from '@/config/info';
</script>

<style lang="scss" scoped>
  .kur_footer {
    color: var(--minor);
    background: var(--background);
    border-top: 1px solid var(--classD);
    .kur_container {
      min-height: px2rem(120px);
      position: relative;
      align-items: center;
      justify-content: center;
      flex-flow: column nowrap;
      gap: px2rem(6px);
      margin: 0 auto;
      .link {
        color: var(--minor);
        -webkit-transition: all .35s;
        transition: all .35s;
        margin: 0 px2rem(5px);
        &:hover {
          color: var(--theme);
        }
      }
    }
  }
</style>