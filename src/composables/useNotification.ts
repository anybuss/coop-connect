import { nextTick, ref } from "vue";

export function useNotification() {
  const message = ref<string>("");
  const colorType = ref<string>("");
  const showNotification = ref<boolean>(false);

  async function showMessage(msg: string, color: string) {
    message.value = msg;
    colorType.value = color;
    showNotification.value = true;

    await nextTick();
    setTimeout(() => {
      showNotification.value = false;
    }, 1500);
  }

  return { message, colorType, showNotification, showMessage };
}
