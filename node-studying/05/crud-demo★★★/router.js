
var fs = require('fs');
var Student = require('./student');

var express = require('express');

// 1. 创建一个路由容器
var router = express.Router();

//渲染学生列表首页
router.get('/students', function (req, res) {
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
})

//渲染add学生页面
router.get('/students/new', function (req, res) {
  res.render('new.html');
})

// 处理逻辑:添加学生
router.post('/students/new', function (req, res) {
  // 1. 获取表单数据
  //需要new一下再使用链式方法req.body:json字符串
  new Student(req.body).save(function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

//  (点击编辑按钮)渲染编辑学生页面
router.get('/students/edit', function (req, res) {

 /* replace
     字符串模式
       简单，但是不支持全局和忽略大小写问题
     正则表达式模式
       强大，支持全局和忽略大小写
 */
  Student.findById(req.query.id.replace(/"/g, ''), function (err, student) {
    if (err) {
      // console.log(err)
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

//处理逻辑:编辑学生
router.post('/students/edit', function (req, res) {
  // 1. 获取表单数据
  //    req.body
  //需要处理id的""   这个id是数据库中的String  id 不是自己的数字id
  // console.log( req.body.id)
  var id = req.body.id.replace(/"/g, '');
  //修改谁,改什么
  // console.log(id)
  Student.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
});

//处理删除学生
router.get('/students/delete', function (req, res) {
  // 1. 获取要删除的 id

  // var id = req.query.id.replace(/"/g, '');
  //现在的删除方法
  Student.deleteOne({id:req.body.id},function (err) {

    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  });

/*  Student.findByIdAndRemove(id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })*/

});

// 3. 把 router 导出
module.exports = router;

