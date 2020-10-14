const express = require("express");
var app = express();
// path：路径操作模块   path.parse路径分解方法    path.join 路径拼接
var path = require("path");
var router = require('./router');
//post表单
var bodyParser = require('body-parser');
/*
    app.use("/public/",express.static("./public/"));
    app.use("/node_modules/",express.static("./node_modules/"));
*/

/*__dirname:可以获取当前文件模块  所处目录  的绝对路径  (用于解决文件相关操作(读写)的路径设置问题)
__filename:可以获取当前  文件  的绝对路径   */
app.use("/public/",express.static(path.join(__dirname,"./public/")));
app.use("/node_modules/",express.static(path.join(__dirname,"./node_modules/")));
// 在 Node 中，有很多第三方模板引擎都可以使用，不是只有 art-template
// ejs、jade（pug）、handlebars、nunjucks
//    <%%>    {{}}
//要在app.use(router)之前
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//node中使用express-session解决 cookie 与session问题

//render方法必备engine
app.engine("html",require("express-art-template"));
//设置默认读取的视图路径
app.set("views",path.join(__dirname,"./views/"));

/*
    在 Express 这个框架中，默认不支持 Session 和 Cookie
    可以使用第三方中间件：express-session 来解决
    1. npm install express-session
    2. 配置 (一定要在 app.use(router) 之前)
    3. 使用
       当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
       添加 Session 数据：req.session.foo = 'bar'
       访问 Session 数据：req.session._foo
       访问 Session 数据：req.session.__dirname问题
*/
//session一般重启服务器就没了,所以实际中会用 持久化存
var session = require('express-session');
//配置完,其他所有req都会有一个东西叫req.session对象
app.use(session({
    // 配置加密字符串secret，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止C端恶意伪造
    secret: 'xxxxx',
    //
    resave: false,
    //无论你是否使用 Session ，我都默认直接给你分配一把钥匙(false  存数据才会发钥匙)
    saveUninitialized: false
}));


//加载路由
app.use(router);
//url全部不符合最后进入这里
app.use(function (req,res) {
    res.render("404.html");
});

// 配置一个全局错误处理中间件 状态码为500的   必须是四个参数
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })

});

app.listen(5000,function () {
    console.log("服务器已经启动：http://127.0.0.1:5000")
});


//win+tab可以建立多个桌面


/*
"art-template": "^4.12.2",
  "bluebird": "^3.7.2",
  "blueimp-md5": "^2.10.0",
  "body-parser": "^1.18.2",
  "bootstrap": "^3.3.7",
  "express": "^4.16.2",
  "express-art-template": "^1.0.0",
  "express-session": "^1.15.6",
  "jquery": "^3.2.1",
  "mongoose": "^4.13.0"*/

//以app.use开头所有请求都会把这个走一遍★★★

//app.get||post 是针对特定url请求才能进去执行
