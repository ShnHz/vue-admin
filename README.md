# vue-admin
</br>
</br>

[在线预览](https://shnhz.github.io/vue-admin)

## 上手指南
以下指南将帮助你在本地机器上安装和运行该项目，进行开发和测试。
### Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### 创建业务模板相关文件
```
npm run create:template
```


## 目录结构
```
├── README.md                   // 说明文件
├── vite.config.js              // vite配置文件                
├── src
│   ├── api                     // api管理
│   ├── assets                  // 静态文件       
│   ├── components              // vue组件           
│   ├── plugins                 // vue插件          
│   ├── router                  // 路由文件        
│   ├── pinia                   // pinia      
│   ├── utils                   // 工具类/mixins     
│   ├── views                   // 页面
│   ├── App.vue                 // vue入口
│   ├── main.js   
├── public                      // 静态文件（图片、ico等）
├── index.html                  // vue3 html 主页入口
```

## git 提交模板
init:初次提交/初始化项目  
feat:新功能  
style:更新ui样式  
fix:修复bug  
refactor:某个已有功能重构  
perf:性能优化  
test:增加测试  
build:改变了build工具 如 grunt换成了 npm  
revert:撤销上一次的commit  
docs:文档改变  
format:格式化代码  
patch:添加重要补丁  
config:修改配置文件  
publish:发布新版本  
git:添加或修改.gitignore 文件  
file:添加新文件