/*
  "art-template": "^4.12.2",
  "body-parser": "^1.18.2",
  "express": "^4.16.2",
  "express-art-template": "^1.0.0"
*/

  var express = require('express');
  //解析post表单三件套
  var bodyParser = require('body-parser');

  var app = express();
  // app.use('/static', express.static(path.join(__dirname + '/public')));  最佳方案
  app.use('/public/', express.static('./public/'));

 /* 配置使用 art-template 模板引擎
  express-art-template : 把 art-template 整合到 Express 中
  特点:不需要加载 art-template 但是也必须安装它
  原因: express-art-template 依赖了 art-template
  ★★★★ '这里是什么文件类型', art-template 模板引擎才能渲染*/
  app.engine('html', require('express-art-template'));

  /*express-art-template 为 Res 相应对象提供：render方法,必须配置模板引擎(express-art-template)才能使用 ★★★★
    res.render('html模板名', {模板数据})
    第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件★★★★
    用 Express 时候需要把视图文件都放到 views 目录中

    如果想要修改默认的 views 目录，则可以
    app.set('views', render函数的默认路径eg:public)    */

    /*
    配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
    parse application/x-www-form-urlencoded
    */
  //解析post表单三件套
  app.use(bodyParser.urlencoded({ extended: false }));
  // 解析post表单三件套  parse application/json
  app.use(bodyParser.json());

  var comments = [{
      name: '张三',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三2',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    }
  ];
  //省略了读文件的操作 因为默认访问的是views里面的,页面渲染的方法也变简单了
  app.get('/', function (req, res) {
    res.render('index.html', {
      comments: comments
    })
  });
  //通过get进入post页面
  app.get('/post', function (req, res) {
    res.render('post.html')
  });

  // 当以 POST 请求 /post 的时候，执行指定的处理函数
  // 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
  app.post('/post', function (req, res) {
    /*1. 获取表单 POST 请求体数据
      2. 处理
      3. 发送响应

      req.query 只能拿 get 请求参数
      console.log(req.query)
    */
    var comment = req.body;
    comment.dateTime = '2017-11-5 10:58:51';
    comments.unshift(comment);

    // res.send  Express 会自动结束响应
    // res.redirect  Express 会自动结束响应
    setTimeout(function () {
      res.redirect('/');
    },5000)

  });

 /* app.get('/pinglun', function (req, res) {
    var comment = req.query
    comment.dateTime = '2017-11-5 10:58:51'
    comments.unshift(comment)
    res.redirect('/')
    res.statusCode = 302
    res.setHeader('Location', '/') 等价/
  })*/

  app.listen(3000, function () {
    console.log('running...');
  });
