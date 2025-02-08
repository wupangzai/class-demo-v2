import { useDialog } from "@/components/common/dialog";

import Login from "@/components/login/index.vue";

export async function useLoginDialog() {
  return await useDialog({
    content: Login,
    dialogProps: {
      footer: false,
    },
  });
}
