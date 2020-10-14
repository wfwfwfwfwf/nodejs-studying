// 三步走
const mongoose = require('mongoose');
// test3是表名
mongoose.connect('mongodb://localhost/test3', {useNewUrlParser: true, useUnifiedTopology: true});
// cat是集合名字   schema是约束
const Cat = mongoose.model('Cat', { name: String });

for (var i = 0; i < 10; i++) {
  // 实例化一个 Cat
  var kitty = new Cat({ name: '喵喵' + i });

  // 持久化保存 kitty 实例
  kitty.save().then(() => console.log('meow3'));
}



