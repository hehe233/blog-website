<template>
  <transition name="message-fade" @before-leave="onClose"  @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :style="customStyle"
      :class="[
        'message',
        type ? `${type}` : '',
        customClass,
        center ? 'is-center' : '',
        showClose ? 'is-closetab': ''
      ]"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i v-if="type" :class="[typeClass, 'message__icon', 'fa-regular', iconClass]"></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="message__content">{{ message }}</p>
        <p v-else class="message__content" v-html="message"></p>
      </slot>
      <div v-if="showClose" class="message__closeBtn icon-close fa-regular fa-xmark" @click.stop="close"></div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, PropType, ref } from 'vue';

const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

const props = defineProps({
  customClass: {
    type: String,
    default: ""
  },
  center: {
    type: Boolean,
    default: false
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3000
  },
  id: {
    type: String,
    default: ""
  },
  message: {
    type: [String, Object],
    default: ""
  },
  onClose: {
    type: Function as PropType<() => {}>,
    require: true
  },
  showClose: {
    tyep: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'error'>,
    default: "info"
  },
  offset: {
    type: Number,
    default: 20
  },
  zIndex: {
    type: Number,
    default: 0
  },
});

defineEmits(["destroy"]);

const typeClass = computed(() => {
  const type = props.type;
  return type && typeMap[type] ? `icon-${typeMap[type]}` : "";
});

const iconClass = computed(() => {
  const type = props.type;
  switch (typeMap[type]) {
    case "success":
      return 'fa-circle-check';
    case "info":
      return 'fa-circle-info';
    case "warning":
      return 'fa-circle-exclamation';
    case "error":
      return 'fa-circle-xmark';
  }
});

const customStyle = computed(() => {
  return {
    top: `${props.offset}px`,
    zIndex: props.zIndex,
  };
});

const visible = ref(false);
let timer: number = 0;

const startTimer = () => {
  if (props.duration > 0) {
    timer = window.setTimeout(() => {
      if (visible.value) {
        close();
      }
    }, props.duration);
  }
}
const clearTimer = () => {
  clearTimeout(timer);
  timer = 0;
}
const close = () => {
  visible.value = false;
}
const keydown = ({ code }: KeyboardEvent) => {
  if (code === "Escape") {
    if (visible.value) {
      close();
    }
  } else {
    startTimer();
  }
}

const on = function (element: Document, event: string, handler: (...args: any) => void, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
}

const off = function (element: Document, event: string, handler: (...args: any) => void, useCapture = false) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

onMounted(() => {
  startTimer();
  visible.value = true;
  on(document, "keydown", keydown);
});

onBeforeUnmount(() => {
  off(document, "keydown", keydown);
});

</script>

<style lang="scss" scoped>
  .message {
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    background-color: #edf2fc;
    transition: opacity 0.3s, transform 0.4s, top 0.4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }
    &.is-center {
      justify-content: center;
    }
    &.closetab &__content {
      padding-right: 16px;
    }
    &.info &__content {
      color: #909399;
    }
    &.success {
      background-color: #f0f9eb;
      border-color: #e1f3d8;
    }
    &.success &__content {
      color: #67c23a;
    }
    &.warning {
      background-color: #fdf6ec;
      border-color: #faecd8;
    }
    &.warning &__content {
      color: #e6a23c;
    }
    &.error {
      background-color: #fef0f0;
      border-color: #fde2e2;
    }
    &.error &__content {
      color: #f56c6c;
    }
    &__content {
      padding: 0;
      font-size: 14px;
      line-height: 1;
      &:focus {
        outline-width: 0;
      }
    }
    &__closeBtn {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      cursor: pointer;
      color: #c0c4cc;
      font-size: 16px;
      &:focus {
        outline-width: 0;
      }
      &:hover {
        color: #909399;
      }
    }
    &__icon {
      margin-right: 10px;
      &.icon-info {
        color: #909399;
      }
      &.icon-success {
        color: #67c23a;
      }
      &.icon-warning {
        color: #e6a23c;
      }
      &.icon-error {
        color: #f56c6c;
      }
    }
  }

  .message-fade-enter-active,
  .message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
</style>