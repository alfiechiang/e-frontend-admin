import { ref } from 'vue'


export const fullscreenLoading = ref(false);

export async function openFullScreen1() {
    fullscreenLoading.value = true;
     await new Promise<void>(resolve => {
      setTimeout(() => {
        fullscreenLoading.value = false;
        resolve(); 
      }, 2000);
    });
};