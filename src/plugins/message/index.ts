import { App } from 'vue';
import Message from "./message";

export const install = (app: App<Element>) => {
  app.config.globalProperties.$message = Message;
};

export default Message;