// 加载插件
const requirePlugin =
  import.meta.globEager("./plugins/*.js")

let plugins = {
  ...requirePlugin
}
// 测试环境启动的插件
if (
  import.meta.env.DEV) {
  const requirePluginDev =
    import.meta.globEager("./plugins-dev/*.js")
  plugins = {
    ...requirePlugin,
    ...requirePluginDev
  }
}
let modules = {}
for (const key in plugins) {
  modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = plugins[key].default
}

export default {
  install(Vue) {
    Object.keys(modules).forEach((item) => {
      modules[item](Vue)
    })
  },
};