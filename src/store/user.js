import { defineStore } from 'pinia'
import storage from '@/utils/storage'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {},
    }
  },
  getters: {},
})
