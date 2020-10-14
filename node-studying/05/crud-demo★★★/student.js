//三步走
var mongoose = require('mongoose');
//默认断口27017   crudDemo数据库名字    第三个true必要的  useNewUrlParser: true, useUnifiedTopology: true,
mongoose.connect('mongodb://localhost/crudDemo',
  {useMongoClient:true});

var Schema = mongoose.Schema;
var studentSchema = new Schema({
  name: {
    type: String,
    //d
    required: true
  },
  gender: {
    type: Number,
    //0与1 枚举
    enum: [0, 1],
    default: 0
  },
  age: {
    type: Number
  },
  hobbies: {
    type: String
  }
});

// 直接导出模型构造函数!!!!  不用封装什么乱七八糟的方法  集合名Student
module.exports = mongoose.model('Student', studentSchema);
