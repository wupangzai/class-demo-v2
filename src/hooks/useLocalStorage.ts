import { ref, watch } from "vue";
import { UTILS } from "@/common";

export function useLocalStorage<T = any>(key: string, passValue: any = "") {
  const value = ref<any>("");

  const rawKeyValue = window.localStorage.getItem(key)!;

  const keyValue = UTILS.isValidJSON(rawKeyValue)
    ? JSON.parse(rawKeyValue)
    : rawKeyValue;

  const updateValue = (newValue: any) => {
    value.value = newValue;
  };

  const initValue = keyValue && !passValue ? keyValue : passValue;

  updateValue(initValue);

  watch(
    value,
    (newValue, oldValue) => {
      const newValueStringfy = JSON.stringify(newValue);
      const oldValueStringfy = JSON.stringify(oldValue);
      // if (oldValueStringfy !== newValueStringfy) {
      window.localStorage.setItem(key, newValueStringfy);
      // }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  return value;
}
