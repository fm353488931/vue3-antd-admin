import { defineStore } from 'pinia'
// import storage from '@/utils/storage'
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      APP_CONFIG: {
        baseURL: '',
        token: '',
        needSign: '',
      },
    }
  },
  getters: {},
})
