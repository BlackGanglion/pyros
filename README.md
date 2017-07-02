# Pyros
Pyros 取名来源于炉石传说史诗卡牌派洛斯，意味凤凰涅槃。

![pyros](https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/thumb/d/d2/Pyros_full.jpg/444px-Pyros_full.jpg?version=ecc75154dafe355c0b80909feb01c399)

本工具为了解决在项目开发中想要做一些实验，却需要搭建一些繁琐的环境，或是阅读源码时，由于源码需要一大堆构建环境，无法通过调试来阅读的痛点。

## 功能

* 能快速构建开发模板
* 对于项目而言，只有源代码与构建配置（npm、babel、webpack、ts...），第三方依赖库由 pyros 本身来安装，babel 编译与 webpack 打包也由 pyros 来完成
  - 可配置，但所有配置对用户透明，在项目中可修改
  - 自动 lint，检查是否全局安装 eslint，`eslint src --quiet --cache`，只 eslint 有修改的，只显示 error 信息。
  - 自动 npm / tnpm / cnpm / yarn / ayarn
* 能够快速测试流行库/组件，帮助阅读源码

## 模板

* 基于 React/Angular/AngularJS/Vue 应用
* 基于 ES6 的 JS 应用
* 基于 TS 的 JS 应用

## 命令列表

pyros -h
pyros -v
pyros creat 创建项目
pyros 本地构建与运行

## 参考资料

### TS 开发 Node
[TypeScript with NodeJS](https://basarat.gitbooks.io/typescript/docs/quick/nodejs.html)
[使用 Typescript 开发 node.js 项目——简单的环境配置](https://segmentfault.com/a/1190000007574276)
[Node API](https://nodejs.org/api/)
[TypeScript配置文件tsconfig简析](https://github.com/hstarorg/HstarDoc/blob/master/%E5%89%8D%E7%AB%AF%E7%9B%B8%E5%85%B3/TypeScript%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6tsconfig%E7%AE%80%E6%9E%90.md)

### eslint 配置
[eslint 中文](http://eslint.cn/docs/user-guide/configuring)
[eslint 在项目中的使用](http://soledad.com.cn/2016/04/13/eslint%E5%9C%A8%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8/)

### 命令行实现
[tj/commander.js](https://github.com/tj/commander.js)
[SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js)