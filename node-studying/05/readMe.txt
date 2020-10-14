# Node.js 第5天课堂笔记

## 知识点

  + 模块作用域
  + 在 Node 这个环境中对 JavaScript 进行了特殊的模块化支持 CommonJS
  + JavaScript 天生不支持模块化
    * require
    * exports
    * Node.js 才有的
  + 在浏览器中也可以像在 Node 中的模块一样来进行编程
    * `<script>` 标签来引用加载，而且你还必须考虑加载的顺序问题
    * require.js 第三方库 AMD
    * sea.js     第三方库 CMD
  + 无论是 CommonJS、AMD、CMD、UMD、EcmaScript 6 Modules 官方规范
    * 都是为了解决 JavaScript 的模块化问题
    * CommonJS、AMD、CMD 都是民间搞出来的
    * EcmaScript 是官方规范定义
    * 所以 EcmaScript 在 2015 年发布了 EcmaScript 2016 官方标准
    * 其中就包含了官方对 JavaScript 模块化的支持
    * 也就是说语言天生就支持了
    * 但是虽然标准已经发布了，但是很多 JavaScript 运行换将还不支持
    * Node 也是只在 8.5 版本之后才对 EcmaScript 6 module 进行了支持

    * less 编译器 > css
    * EcmaScript 6 -> 编译器 -> EcmaScript 5


  ★★★★这个问题还不错
- var router = require('./router') 这一步不是加载router.js并执行该文件吗 为什么还要执行app.use(router) app.use 不是开放静态资源吗
  app.use(router)在这里是什么意思，挂载到 app 服务中的意思是？ module.exports = app 也不懂
  + 这里涉及到一个中间件的概念
  + app.use 不仅仅是用来处理静态资源的
  + 还可以做很多工作
  + 配置 body-parse 也是通过 app.use 来配置的
  + 这叫中间件，其中有一套规则

  package.json 与  package-lock.json
  package.json是通过npm init创建时生成的，package.json文件中会记录项目中所需要的模块。
  记录的只是每个模块的基本信息。模块名称和大版本信息。
  在使用npm install的时候会自动生成一个package-lock.json的文件，package-lock.json文件则会记录每个模块的详细信息，
  如模块的具体版本号和各个模块所依赖的子模块的信息。

  npm install的过程大致就是从package.json中读取所有的依赖信息，然后再与node_modules中已经安装的依赖进行对比，
  如果没有则通过package-lock.json获取相应版本号下载安装.如果已经存在则会通过package-lock.json检查更新。
  进行更新的原则就是其范围是在package.json中对应安装包版本所容纳的版本。^就是指兼容该版本以后的小版本而不更新大版本


- 为什么模板引擎在app.js中引入之后在router.js中不引入可以直接使用，而express还需要在router.js中再引入一次 app.js中路由器挂载不是很懂
 router.js中为什么要创建一个路由器容器，不知道作用是干什么的 es6中的find方法不是很懂
  + 中间件
  + EcmaScript 6 的 find 方法


## 复习

- 文件路径中的 `/` 和模块标识中的 `/`
- Express 中配置使用 art-template 模板引擎
- Express 中配置使用 body-parser
- Express 中配置处理静态资源
- CRUD 案例中单独提取路由模块

## 上午总结

- 回调函数
  + 异步编程
  + 如果需要得到一个函数内部异步操作的结果，这是时候必须通过回调函数来获取
  + 在调用的位置传递一个函数进来
  + 在封装的函数内部调用传递进来的函数
- find、findIndex、

- package-lock.json 文件的作用
  + 下载速度快了
  + 锁定版本

- JavaScript 模块化
  + Node 中的 CommonJS
  + 浏览器中的
    * AMD require.js
    * CMD sea.js
  + EcmaScript 官方在 EcmaScript 6 中增加了官方支持
  + EcmaScript 6
  + 后面我们会学，编译工具


- MongoDB 数据库(需要配置环境变量) mongod --version
  + MongoDB 的数据存储结构
    * 数据库
    * 集合（表）
    * 文档（表记录）
- MongoDB 官方有一个 mongodb 的包可以用来操作 MongoDB 数据库
  + 这个确实和强大，但是比较原始，麻烦，所以咱们不使用它
- mongoose
  + 真正在公司进行开发，使用的是 mongoose 这个第三方包
  + 它是基于 MongoDB 官方的 mongodb 包进一步做了封装
  + 可以提高开发效率 让你操作 MongoDB 数据库更方便
- 掌握使用 mongoose 对数据集合进行基本的 CRUD
- 把之前的 crud 案例改为了 MongoDB 数据库版本
- 使用 Node 操作 mysql 数据库

## 下午总结
## 目标