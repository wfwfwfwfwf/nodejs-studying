  /*
    router.js 路由模块
    职责：
      处理路由
      根据不同的请求方法+请求路径设置具体的请求处理函数
    模块职责要单一，不要乱写
    我们划分模块的目的就是为了增强项目代码的可维护性
    提升开发效率
   */
  //保存路由的js文件

  // var fs = require('fs');
  //获取stu.js里面的所有导出方法    对象
  var Student = require('./student');

  // Express 提供了一种更好的方式：专门用来包装路由的
  var express = require('express');
  // 1. 创建一个路由容器★★★★★ 最后把这个容器导出去
  var router = express.Router();

  // 2. 把路由都挂载到 router 路由容器中(最后导出,在app.js里面app.use)

  //渲染学生列表页面  (下层封装,上层调用)调用时候会先执行异步操作,把结果返回来★★★

  router.get('/students', function (req, res) {
    //把callback往student.js里面代
    Student.find(function (err, students) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.render('index.html', {
        fruits: [
          '苹果',
          '香蕉',
          '橘子'
        ],
        students: students
      })
    })
  });

  /*渲染首页等价写法★★★ 这种写法可以直接去除 student.js
  router.get("/students",function (req,res) {
      function find() {
        //回调函数 students 是异步操作的结果,如何拿到异步操作的结果,需要用回调函数★★★
        var callback = function (err,students) {
          if (err) {
            return res.status(500).send('Server error.')
          }
          res.render('index.html', {
            fruits: [
              '苹果',
              '香蕉',
              '橘子'
            ],
            students: students
          })
        };
          //fs读写属于异步操作
        fs.readFile('./db.json', 'utf8', function (err, data) {
          if (err) {
            return callback(err)
          }
          //JSON.parse(data)是整个文件对象
          callback(null, JSON.parse(data).students)
        })
      }
      find();
  })*/

 /* 渲染首页等价写法有问题
  router.get("/students",function (req,res) {
    const p = new Promise(function (resolve, reject) {
      fs.readFile("./db.json", "utf8",(err, data) => {
        //判断如果失败
        if (err) {
          reject(err);
        }
        //如果成功
        resolve(data);
      });
    });


    p.then(function(value){
      let students=[];
          students = JSON.parse(value).students;
      res.render('index.html', {
        fruits: [
          '苹果',
          '香蕉',
          '橘子'
        ],
        students: students
      });
    }, function(reason){
      res.status(500).send('Server error.')
    });

  })
*/

  //渲染add学生页面  首页点击添加按钮时
  router.get('/students/new', function (req, res) {
    res.render('new.html')
  })

  //处理逻辑:add学生 (new页面点击提交按钮时)
  router.post('/students/new', function (req, res) {
    // 1. 获取表单数据req.body=={提交的表单对象}
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 发送响应
    Student.save(req.body, function (err) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      //返回学生首页
      res.redirect('/students')
    })
  });

  //渲染edit学生页面(点击edit时)
  router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    //
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面

    Student.findById(parseInt(req.query.id), function (err, student) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      //把下层找到的那个学生页面给渲染出来
      res.render('edit.html', {
        student: student
      })
    })
  })

 // 处理逻辑:edit学生(更新修改后的学生数据) edit页面提交时
  router.post('/students/edit', function (req, res) {
    // 1. 获取表单数据
    //    req.body
    // 2. 更新
    //    Student.updateById()
    // 3. 发送响应
    Student.updateById(req.body, function (err) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.redirect('/students')
    })
  });

  //处理逻辑:delete学生(没有删除页面只有逻辑)点击delete时
  router.get('/students/delete', function (req, res) {
    // 1. 获取要删除的 id
    // 2. 根据 id 执行删除操作
    // 3. 根据操作结果发送响应数据

    Student.deleteById(req.query.id, function (err) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.redirect('/students')
    })
  });

  // 3. 把 router 导出
  module.exports = router;

  // 这样也不方便
  // module.exports = function (app) {
  //   app.get('/students', function (req, res) {
  //     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
  //     // 除了这样来转换之外，也可以通过 data.toString() 的方式
  //     fs.readFile('./db.json', 'utf8', function (err, data) {
  //       if (err) {
  //         return res.status(500).send('Server error.')
  //       }

  //       // 从文件中读取到的数据一定是字符串
  //       // 所以这里一定要手动转成对象
  //       var students = JSON.parse(data).students

  //       res.render('index.html', {
  //         fruits: [
  //           '苹果',
  //           '香蕉',
  //           '橘子'
  //         ],
  //         students: students
  //       })
  //     })
  //   })
