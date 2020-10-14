/* 最新的
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));*/
// 三步走
var mongoose = require('mongoose');
// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
// mongoose.Promise = global.Promise;

// 创建一个模型  就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
//集合名称Cat,类型String    schema是约束
var Cat = mongoose.model('Cat', { name: String });


for (var i = 0; i < 10; i++) {
  // 实例化一个 Cat
  var kitty = new Cat({ name: '喵喵' + i });

  // 持久化保存 kitty 实例
 /* kitty.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('meow');
    }
  });*/
  kitty.save().then(() => console.log('meow3'));
}

