
  var express = require('express');
  // 1. 创建 app
  var app = express();

  /*
     当以 /public/ 开头的时候，去 ./public/ 目录中找找对应的资源
     这种方式更容易辨识，推荐这种方式
     app.use('/public/', express.static('./public/'))
  */

  // 前面是url 路径 后面是文件路径
  // app.use('/abc/d/', express.static('./public/'))

  // app.use('/static', express.static(path.join(__dirname + '/public')));  最佳方案

  // 当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问
  app.use(express.static('./public/'));

  app.get('/', function (req, res) {
    res.send('hello world')
  });

  app.listen(3000, function () {
    console.log('express app is running ...')
  });
