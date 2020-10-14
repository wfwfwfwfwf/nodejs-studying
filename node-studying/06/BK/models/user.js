var mongoose = require("mongoose");
//连接数据库  三个参数查一下
// mongoose.connect('mongodb://localhost/test3', {useNewUrlParser: true, useUnifiedTopology: true,useMongoClient: true});
mongoose.connect('mongodb://localhost/blog', {useMongoClient: true});
//解决那个警告
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;
//设计数据模型
var UserSchema = new Schema({
  //邮箱 昵称 密码 是页面展示的,还有不少看不见的数据
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //创建时间
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用★★★
    // 这里直接给了一个方法：Date.now
    // 当你去 new Model 的时候，如果你没有传递 create_time,则 mongoose 就会调用 default 指定的Date.now 方法，
    // 使用其返回值作为默认值
    default: Date.now
  },
  //最后修改时间
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  //头像
  avatar: {
    type: String,
    //默认头像
    default: '/public/img/avatar-default.png'
  },
  //个人简介
  bio: {
    type: String,
    default: ''
  },
  //性别
  gender: {
    type: Number,
    //枚举类型
    enum: [-1, 0, 1],
    default: -1
  },
  //生日
  birthday: {
    type: Date
  },
  //登录状态
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }

});






module.exports = mongoose.model('User',UserSchema);