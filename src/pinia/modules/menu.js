import {
  defineStore
} from 'pinia'

const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      visitedMenus: [],
    }
  },
  getters: {
    getVisitedMenus: (state) => state.visitedMenus,
  },
  actions: {
    updateVisitedMenus(data) {
      this.visitedMenus = data
    },
  },
})

export default useMenuStore