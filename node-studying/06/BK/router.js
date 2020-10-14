//配置路由
var express = require("express");
//加载数据库user模型
var User = require("./models/user");
var router = express.Router();
//给数据库显示的用户加密码★★★★   变成二进制..
var md5 = require('blueimp-md5');
//首页
router.get("/",function (req,res) {
    res.render("index.html",{
      cuser: req.session.user
    });
    // console.log( req.session.user)
});
//登录页面
router.get("/login",function (req,res) {
  res.render("login.html");
});

//处理登录页面
router.post("/login",function (req,res,next) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body;
  //数据库查询
  User.findOne({
    email: body.email,
    //加密比对
    password: md5(md5(body.password))
  }, function (err, user) {
    //S端错误
    if (err) {
     /* return res.status(500).json({
        err_code: 500,
        //err对象的属性
        message: err.message
      })*/
     //记得函数的next形参要加上  return防止代码往后执行
     return next(err);
    }
    //user为你要找的那个人 !user表示未找到
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 用户不存在
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is error '
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user;
    //异步请求 需要C端去重定向
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })

});

//注册页面
router.get("/register",function (req,res,next) {
  res.render("register.html");
});

//处理注册页面
router.post("/register",function (req,res,next) {
  /*
      1. 获取表单提交的数据
         req.body
      2. 操作数据库
         判断改用户是否存在
         如果已存在，不允许注册
         如果不存在，注册新建用户
      3. 发送响应
      req.body:
        email: '1667442148@qq.com',
        nickname: 'wf',
        password: '123456'
  */
  // console.log(req.body)
  var body = req.body;
  //找一个
  User.findOne({
    //查找email或nickname是否被占用  $or：mongoose的语法
    $or: [
      {
      email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    //err是请求错误
    if (err) {
      //服务端错误
      // console.log(err)
      return next(err);
     /* res.status(500).json({
        success: false,
        message: '服务端错误'
      })*/
    }
    //data查询到了邮箱或者昵称已存在
    if (data) {
      //给C端返回一个json对象
      // 1:res.send()手写一个json对象;2:使用JSON.stringify({对象}),或者3:res.status(200).json(Express的方法)
      return res.status(200).json({
        //定义一个json对象,是发给register界面,实现局部刷新★★★
        err_code: 1,
        message: 'Email already exists.'
      });
      return res.send(`邮箱或者密码已存在，请重试`)
    }


    // 既没有重复,也没有服务器错误则正式注册
    // 对密码进行 md5 重复2次加密
    body.password = md5(md5(body.password));
    //创建一个用户  body里面有email nickname password   user是存进去的对象
    new User(body).save(function (err, user) {
        if (err) {
        return next(err);
       /* res.status(500).json({
          success: false,
          message: '服务端错误'
        })*/
      }
      // console.log(user);

      // 注册成功，使用 Session 记录用户的登陆状态★★★(把user存到session里面)
      req.session.user = user;

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
        //之后需要C端拿着信息去自己重定向★★★★★★
      })

      // 服务端重定向只针对同步请求才有效，异步请求无效 ★★★  所以重定向需要在C端写★
      // res.redirect('/')

    })
  })
  //使用 async await
/*
router.post('/register', async function (req, res) {
  var body = req.body
  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }

    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: '昵称已存在'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    // 创建用户，执行注册
    await new User(body).save()

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch (err) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
  }
})
*/

  //退出   正规用delete
  router.get('/logout', function (req, res) {
    // 清除登陆状态
    req.session.user = null;

    // 重定向到登录页
    res.redirect('/login')
  });

});









module.exports = router;