
    //express 初次体验
    var express = require('express');

    //    创建你服务器应用程序, 也就是原来的 http.createServer
    var app = express();
    // var fs =require("fs");

  /*  在 Express 中开放资源就是一个 API 的事儿
      公开指定目录
      只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
      ajax用的就是这种 url+/public/+文件名.后缀名
      */
    app.use('/public/', express.static('./public/'));
    app.use('/static/', express.static('./static/'));
    // app.use('/node_modules/', express.static('./node_modules/'));

    // 模板引擎，在 Express 也是一个 API 的事儿
    // 得到路径   一个一个的判断   以前的代码很丑
    // 平行式写法
    app.get('/about', function (req, res) {
      // 在 Express 中可以直接 req.query(这里是空对象) 来获取查询字符串参数
      console.log(req.query);
      res.send('你好，我是 Express!')
    });

    app.get('/pinglun', function (req, res) {
      // req.query
      // 在 Express 中使用模板引擎有更好的方式：res.render('文件名,{模板对象})★★★★需要 express-art-template
      // (以前是用template.render)
    });

    // 当服务器收到 get 请求 / 的时候，执行回调处理函数
    app.get('/', function (req, res) {
      //...要想展示一个html页面,也需要结合 fs 模块
      res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Document</title>
      </head>
    <body>
      <h1>hello Express！你好</h1>
    </body>
    </html>
    `)
    });

    // 相当于 server.listen
    app.listen(3000, function () {
      console.log('app is running at port 3000.')
    });
