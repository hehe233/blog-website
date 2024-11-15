<template>
  <section class="kur_aside__item tags-cloud">
    <div class="kur_aside__item-title">
      <i class="kur-font iconfont fa-regular fa-tag"></i>
      <span class="text">标签云</span>
      <router-link to="/archives/tags" class="tags_more">更多 »</router-link>
    </div>
    <div class="kur_aside__item-contain">
      <div class="tagcloud-wrapper" v-show="props.tags.length || loading">
        <div class="tagcloud-controls" :style="`--num-elements: ${shortTags.length}`">
          <div
            v-for="(tag, index) in shortTags"
            :key="tag.id"
            class="tagcloud-control-button"
            :style="`--index: ${index + 1}`"
          >
            <input type="radio" name="tagcloud-control-input">
          </div>
          <div class="tagcloud-rotation">
            <ul class="tagcloud-tags" :style="`--num-elements: ${props.tags.length}`">
              <li
                v-for="(tag, index) in props.tags"
                :key="tag.id"
                class="tagcloud-tag"
                :style="`--index: ${index + 1}`"
              >
                <div>
                  <router-link
                    :to="{path: '/search', query:{type: 'tag', id: tag.attributes.drupal_internal__tid}}"
                    :style="{color: tag.attributes.field_color, cursor: 'pointer'}"
                  >{{ tag.attributes.name }}</router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <p class="kur_loading" v-if="loading"><i class="fa-regular fa-spinner fa-spin"></i></p>
      </div>
      <ArticleEmpty v-if="!props.tags.length && !loading"  />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import ArticleEmpty from '@/components/Article/ArticleEmpty.vue';

const props = defineProps({
  tags: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const shortTags = computed(() => {
  return props.tags.slice(0, 20);
})
</script>

<style lang="scss" scoped>
  .kur_aside__item {
    &.tags-cloud {
      margin-bottom: px2rem(15px);
      background: var(--background);
      .text {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
      .tags_more {
        position: relative;
        top: 2px;
        font-size: px2rem(14px);
        font-weight: 400;
        color: var(--minor);
        i {
          margin: 0;
          font-size: px2rem(14px);
          font-weight: 400;
          color: var(--minor);
        }
      }
      .kur_aside__item-contain {
        padding: 0;
      }
    }
  }

  .tagcloud-wrapper {
    --_control-diamater: var(--tagcloud-controls-diameter);
    --_control-radius: calc(var(--_control-diamater) / 2);
    --_diameter: var(--tagcloud-diameter);
    --_radius: calc(calc(var(--_diameter) / 2) - calc(var(--tag-diameter) / 2));
    width: var(--control-diameter);
    aspect-ratio: 1 / 1;
    font-family: var(--tag-font-family);
    font-size: var(--tag-font-size);
    .kur_loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: px2rem(24px);
      text-align: center;
      color: var(--routine);
    }
  }

  .tagcloud-wrapper:has(.tagcloud-rotation:hover)  {
    --tagcloud-animation-play-state: paused;
  }

  .tagcloud-wrapper .tagcloud-tags {
    position: absolute;
    width: var(--_diameter);
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    list-style-type: none;
    position: relative;
    transform-style: inherit;
    animation: tagcloud-rotation var(--tagcloud-animation-duration) var(--tagcloud-animation-direction) linear infinite var(--tagcloud-animation-play-state);
  }

  @keyframes tagcloud-rotation {
    from {transform: translate(-50%, -50%) rotateX(0deg);}
    to {transform: translate(-50%, -50%) rotateX(360deg);}
  }

  .tagcloud-wrapper .tagcloud-tags:has(.tagcloud-tag div a:hover) .tagcloud-tag:not(:has(div a:hover)) {
    opacity: 0.25;
  }

  .tagcloud-wrapper .tagcloud-tag {
    --_phi: acos(calc(-1 + (2 * var(--index)) / var(--num-elements)));
    --_theta: calc(sqrt(calc(var(--num-elements) * 3.141592653589793)) * var(--_phi));
    --_x: calc(cos(var(--_theta)) * sin(var(--_phi)));
    --_y: calc(sin(var(--_theta)) * sin(var(--_phi)));
    --_z: calc(cos(var(--_phi)));
    --_vector-length: sqrt(var(--_x) * var(--_x) + var(--_y) * var(--_y) + var(--_z) * var(--_z));
    --_normalized-x: calc(var(--_x) / var(--_vector-length));
    --_normalized-y: calc(var(--_y) / var(--_vector-length));
    --_normalized-z: calc(var(--_z) / var(--_vector-length));
    --_scaled-x: calc(var(--_normalized-x) * var(--_radius));
    --_scaled-y: calc(var(--_normalized-y) * var(--_radius));
    --_scaled-z: calc(var(--_normalized-z) * var(--_radius));
    --_final-x: calc(var(--_scaled-x) + var(--_radius));
    --_final-y: calc(var(--_scaled-y) + var(--_radius));
    --_final-z: var(--_scaled-z);
    pointer-events: none;
    width: var(--tag-diameter);
    height: var(--tag-diameter); 
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: opacity var(--tagcloud-transition-duration) var(--tagcloud-transition-ease);
    transform: translate3d(var(--_final-x), var(--_final-y), var(--_final-z));
    animation: tagcloud-tag-rotation var(--tagcloud-animation-duration) var(--tagcloud-animation-direction) linear infinite var(--tagcloud-animation-play-state);
  }

  @keyframes tagcloud-tag-rotation {
    from {transform: translate3d(var(--_final-x), var(--_final-y), var(--_final-z)) rotateX(360deg);}
    to {transform: translate3d(var(--_final-x), var(--_final-y), var(--_final-z)) rotateX(0deg);}
  }

  .tagcloud-wrapper .tagcloud-tag div {
    transform: rotateZ(calc(var(--_current-rotation) * -1deg));
    transition: transform var(--tagcloud-transition-user-duration) var(--tagcloud-transition-user-ease);
  }

  .tagcloud-wrapper .tagcloud-tag div a {
    pointer-events: initial;
    color: rgb(var(--tag-font-color-rgb));
    text-decoration: none;
    text-shadow: 1px  1px 1px rgb(var(--tagcloud-bg-color-rgb)),
                    1px -1px 1px rgb(var(--tagcloud-bg-color-rgb)),
                    -1px  1px 1px rgb(var(--tagcloud-bg-color-rgb)),
                    -1px -1px 1px rgb(var(--tagcloud-bg-color-rgb)), 
                    0 0 1rem rgb(var(--tagcloud-bg-color-rgb));
  }

  .tagcloud-wrapper .tagcloud-controls {
    width: var(--_control-diamater);
    aspect-ratio: 1 / 1;
    position: relative;
    --_current-rotation: var(--tagcloud-start-rotation);
    transform-style: inherit;
  }

  .tagcloud-wrapper .tagcloud-controls .tagcloud-control-button {
    --_width: var(--_control-radius);
    --_height: calc(var(--_control-diamater) * 3.141592653589793 / var(--num-elements) + 1px);
    --_theta-start: 0;
    --_theta-length: calc(2 * 3.141592653589793);
    --_segment: calc(var(--_theta-start) + var(--index) / var(--num-elements) * var(--_theta-length));
    --_x: calc(var(--_control-radius) * cos(var(--_segment)));
    --_y: calc(var(--_control-radius) * sin(var(--_segment)) + var(--_control-radius) - var(--_height) / 2);
    --_rotation: calc(var(--index) / var(--num-elements) * 360deg);
    position: absolute;
    left: var(--_x);
    top: var(--_y);
    width: var(--_width);
    height: var(--_height);
    clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
    transform-origin: right center;
    transform: rotate(var(--_rotation));
    transition: background-color var(--tagcloud-transition-duration) var(--tagcloud-transition-ease);
    background-color: var(--tagcloud-control-bg-color);
  }

  .tagcloud-wrapper .tagcloud-controls .tagcloud-control-button input {
    -webkit-appearance: none;
    appearance: none;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

.tagcloud-wrapper .tagcloud-controls .tagcloud-control-button:has(input:checked) {
    background-color: var(--tagcloud-control-bg-checked-color);
}
.tagcloud-wrapper .tagcloud-controls .tagcloud-control-button:has(input:hover) {
    background-color: var(--tagcloud-control-bg-hover-color);
}

.tagcloud-wrapper .tagcloud-controls:has(.tagcloud-control-button:nth-child(n) input:checked) {
    --_current-rotation: calc(108 + (n - 1)*18);
}

  .tagcloud-wrapper .tagcloud-controls .tagcloud-control-button:has(input:checked) ~ .tagcloud-rotation {
    transform: translate(-50%, -50%) rotate(calc(var(--_current-rotation) * 1deg));
  }

  .tagcloud-wrapper .tagcloud-controls .tagcloud-control-button:has(input:checked) ~ .tagcloud-rotation .tagcloud-tags .tagcloud-tag div {
    transform: rotateZ(calc(var(--_current-rotation) * -1deg));
  }

  .tagcloud-wrapper .tagcloud-controls .tagcloud-rotation {
    position: absolute;
    width: var(--_diameter);
    aspect-ratio: 1 / 1;
    perspective: calc(var(--_diameter) * 2);
    transform-style: preserve-3d;
    left: 50%;
    top: 50%;
    background: radial-gradient(rgba(var(--tagcloud-bg-color-rgb), 0.75) 15% , rgba(var(--tagcloud-bg-color-rgb), 0) calc(75% - var(--tag-diameter)));
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(calc(var(--_current-rotation) * 1deg));
    transition: transform var(--tagcloud-transition-user-duration) var(--tagcloud-transition-user-ease);
  }
</style>