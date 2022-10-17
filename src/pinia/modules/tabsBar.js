import {
  defineStore
} from 'pinia'

const useTabsBarStore = defineStore('tabsBar', {
  state: () => {
    return {
      visitedRoutes: [],
    }
  },
  getters: {
    getVisitedRoutes: (state) => state.visitedRoutes,
  },
  actions: {
    addVisitedRoute(route) {
      let target = this.visitedRoutes.find((item) => item.path === route.path)
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route)
        return
      }
      this.visitedRoutes.push(Object.assign({}, route))
    },
    delVisitedRoute(route) {
      this.visitedRoutes.forEach((item, index) => {
        if (item.path === route.path) this.visitedRoutes.splice(index, 1)
      })
      return [...this.visitedRoutes]
    },
    updateVisitedRoute(route) {
      this.visitedRoutes.forEach((item) => {
        if (item.path === route.path) item = Object.assign(item, route)
      })
    },

    async delRoute(route) {
      await this.delVisitedRoute(route)
      return {
        visitedRoutes: [...this.visitedRoutes],
      }
    },
    delOthersVisitedRoute(route) {
      this.delOthersVisitedRoute(route)
      return [...this.visitedRoutes]
    },
    async delAllRoutes( route) {
      await this.delAllVisitedRoutes(route)
      return {
        visitedRoutes: [...this.visitedRoutes],
      }
    },
    delAllVisitedRoutes() {
      this.visitedRoutes = this.visitedRoutes.filter((item) => item.meta.affix)
      return [...this.visitedRoutes]
    },
    updateVisitedRoute( route) {
      this.updateVisitedRoute(route)
    },
  },
})

export default useTabsBarStore