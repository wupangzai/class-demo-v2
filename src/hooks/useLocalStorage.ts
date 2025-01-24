import { ref, watch } from "vue";

export function useLocalStorage<T = any>(key: string, passValue: any = "") {
  const value = ref<any>("");

  const keyValue = JSON.parse(window.localStorage.getItem(key)!);

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
      if (oldValueStringfy !== newValueStringfy) {
        window.localStorage.setItem(key, newValueStringfy);
      }
    },
    {
      immediate: true,
    }
  );

  return value;
}
