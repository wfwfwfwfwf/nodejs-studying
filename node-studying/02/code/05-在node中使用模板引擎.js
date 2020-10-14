/*
art-template
art-template 不仅可以在浏览器使用，也可以在 node 中使用

安装：
   npm install art-template
   该命令在哪执行就会把包下载到哪里。会下载到 node_modules 目录中 node_modules
   不要乱改文件名


       在 Node 中使用 art-template 模板引擎
    1. 安装 npm install art-template
    2. 在需要使用的文件模块中加载 art-template
       只需要使用 require 方法加载就可以了：require('art-template')
       参数中的 art-template 就是你下载的包的名字
       也就是说你 isntall 的名字是什么，则你 require 中的就是什么
    3. 查文档，使用模板引擎的 API

*/

var template = require('art-template');
var fs = require('fs');

fs.readFile('./tpl★.html', function (err, data) {
  if (err) {
    return console.log('读取文件失败了')
  }
   /*
    node只能读取html的内容,但是无法在浏览器展示
    默认读取到的 data 是二进制数据
    而模板引擎的 render 方法需要接收的是字符串
    所以我们在这里需要把 data => data.toString 字符串 才可以给模板引擎使用
   */
  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ],
    title: '个人信息'
  })

  console.log(ret)
})
