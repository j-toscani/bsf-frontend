// @ts-ignore
import Toast from "@/components/Toast.vue";
import Vue from "vue";

type ToastProps = {
  message: string;
  id: number;
  timeout?: number;
};

const toast = {
  ids: [] as number[],
  add: (message: string, timeout: number = 3000) => {
    const nextId = toast.ids.length + 1;
    toast.ids.push(nextId);

    const element = toast.createToast({ message, id: nextId, timeout });
    toast.activateToast(element);
  },
  remove: (id: number) => {
    const toastMessage = document.querySelector(`[data-toast-id="${id}"]`);
    toastMessage?.classList.remove("active");
  },

  createToast: (props: ToastProps) => {
    const ComponentClass = Vue.extend(Toast);
    const instance = new ComponentClass({
      propsData: props
    });
    instance.$mount();
    return instance.$el;
  },
  activateToast: (element: Element) => {
    document.querySelector("body")?.appendChild(element);
    window.requestAnimationFrame(() => element.classList.add("active"));
  },
  removeId: (index: number) => {
    toast.ids.splice(index, 1);
  }
};

export default toast;
