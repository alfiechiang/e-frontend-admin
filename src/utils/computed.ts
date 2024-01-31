import { computed } from 'vue';
import  type {  Ref } from 'vue';

export function useComputedPrice(formItem: Ref<{ price: number }>) {
    return computed({
        get: () => formItem.value.price === 0 ? '' : formItem.value.price.toString(),
        set: (newValue) => {
            formItem.value.price = newValue === '' ? 0 : parseFloat(newValue);
        }
    });
}




































































