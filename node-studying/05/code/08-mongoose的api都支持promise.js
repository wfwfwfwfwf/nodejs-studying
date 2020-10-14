//★★★★★
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test2');

var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

var User = mongoose.model('User', userSchema);


// 用户注册
/*1. 判断用户是否存在
   如果已存在，结束注册
   如果不存在，注册（保存一条用户信息）
   */
//查找所有
User.find()
  .then(function (data) {
    console.log(data)
  });

//查找某个用户,如果存在 输出已经注册，,不存在就可以注册
/*User.findOne({ username: 'aaa' }, function (user) {
  if (user) {
    console.log('已存在')
  } else {
    new User({
      username: 'aaa',
      password: '123',
      email: 'dsadas'
    }).save(function () {
      
    })
  }
})*/

/*
  对象.save().then()★★★★   .then会返回一个Promise对象★★
  User.findOne({
      username: 'aaa'
    })
    .then(function (user) {
      if (user) {
        // 用户已存在，不能注册
        console.log('用户已存在')
      } else {
        // 用户不存在，可以注册
        return new User({
          username: 'aaa',
          password: '123',
          email: 'dsadas'
        }).save()
      }
    })
    //如果还有什么异步就在这里接着.then
    .then(function (ret) {
    })
*/



// #region /删除数据
// User.remove({
//   username: 'zs'
// }, function (err, ret) {
//   if (err) {
//     console.log('删除失败')
//   } else {
//     console.log('删除成功')
//     console.log(ret)
//   }
// })
// **********************
// #endregion /删除数据
// **********************


// **********************
// #region /更新数据
// **********************
// User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
//   password: '123'
// }, function (err, ret) {
//   if (err) {
//     console.log('更新失败')
//   } else {
//     console.log('更新成功')
//   }
// })
// **********************
// #endregion /更新数据
// **********************
