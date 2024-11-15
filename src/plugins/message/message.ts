import { createVNode, render, isVNode, VNode } from "vue";
import MessageConstrutor from "./Message.vue";

interface MessageIns {
  vm: VNode;
}
interface MessageOption {
  message?: string;
  offset?: number;
  onClose?: (vm: VNode) => void;
  type?: string;
}
let instances: MessageIns[] = [];
let seed = 1;

export function close(id: string, userOnClose?: (vm: VNode) => void) {
  const idx = instances.findIndex(({ vm }) => {
    const { id: _id } = (vm.component?.props as any);
    return id === _id;
  });
  if (idx === -1) {
    return;
  }

  const { vm } = instances[idx];
  if (!vm) return;
  userOnClose === null || userOnClose === void 0 ? void 0 : userOnClose(vm);

  const removedHeight = vm.el?.offsetHeight;
  instances.splice(idx, 1);

  const len = instances.length;
  if (len < 1) return;
  for (let i = idx; i < len; i++) {
    const pos =
      parseInt(instances[i].vm.el?.style["top"], 10) - removedHeight - 16;
    instances[i].vm.component!.props.offset = pos;
  }
}

export function closeAll() {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component;
    (instance as any)?.ctx?.close();
  }
}

class Message {
  static message = (opts: MessageOption | string = {}) => {
    if (typeof opts === "string") {
      opts = {
        message: opts,
      };
    }
  
    let verticalOffset = opts.offset || 20;
    instances.forEach(({ vm }) => {
      verticalOffset += (vm.el?.offsetHeight || 0) + 16;
    });
    verticalOffset += 16;
  
    const id = "message_" + seed++;
    const userOnClose = opts.onClose;
  
    let options = {
      ...opts,
      onClose: () => {
        close(id, userOnClose);
      },
      onDestroy: () => {
        render(null, container);
      },
      offset: verticalOffset,
      id,
      zIndex: 1,
    };
  
    const container = document.createElement("div");
    container.className = `container_${id}`;
  
    const message = options.message;
    const vm = createVNode(
      MessageConstrutor,
      options,
      isVNode(options.message) ? { default: () => message } : null
    );
  
    render(vm, container);
  
    instances.push({ vm });
  
    if (container.firstElementChild)
      document.body.appendChild(container.firstElementChild);
  
    return {
      close: () => ((vm.component!.proxy as any).visible = false),
    };
  };

  static success = (options: MessageOption | string = {}) => {
    if (typeof options === "string") {
      options = {
        message: options,
        type: "success",
      }
    } else {
      options.type = "success";
    }
    return Message.message(options);
  }
  static info = (options: MessageOption | string = {}) => {
    if (typeof options === "string") {
      options = {
        message: options,
        type: "info",
      }
    } else {
      options.type = "info";
    }
    return Message.message(options);
  }
  static warning = (options: MessageOption | string = {}) => {
    if (typeof options === "string") {
      options = {
        message: options,
        type: "warning",
      }
    } else {
      options.type = "warning";
    }
    return Message.message(options);
  }
  static error = (options: MessageOption | string = {}) => {
    if (typeof options === "string") {
      options = {
        message: options,
        type: "error",
      }
    } else {
      options.type = "error";
    }
    return Message.message(options);
  }
  static closeAll = closeAll
}

export default Message;