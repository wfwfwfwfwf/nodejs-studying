  var mongoose = require('mongoose');
  // 1. 连接数据库
  // 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
  mongoose.connect('mongodb://localhost/test2',{useNewUrlParser: true, useUnifiedTopology: true});

  /*  2. 设计文档结构（表结构） 防止数据错乱
     字段名称就是表结构中的属性名称
     约束的目的是为了保证数据的完整性，不要有脏数据
    */
  var Schema = mongoose.Schema;
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

  /* 3. 将文档结构发布为模型
     mongoose.model 方法就是用来将一个架构发布为 model
     第一个参数：  传入一个大写名词  单数字符串用  来表示你的数据库名称
                  mongoose 会自动将大写名词的字符串生成  小写复数  的集合(collections)名称
                  例如这里的 User 最终会变为 users 集合名称
     第二个参数：架构 Schema

     返回值：模型构造函数 ★★★  */
  var User = mongoose.model('User', userSchema);

  // 4. 有了模型构造函数之后，就可以使用这个构造函数(User)对 users 集合中的数据  增删改查

  // ①  region /新增数据
    var admin = new User({
    username: 'zs',
    password: '123456',
    email: 'admin@admin.com'
  });
   // 存储
   // admin.save().then(() => console.log('success to store'));

/*老式存储
  admin.save(function (err, ret) {
    if (err) {
      console.log('保存失败')
    } else {
      console.log('保存成功')
      console.log(ret)
    }
  })*/


  // #region /查询数据
  //查询集合中所有数据
  /*User.find(function (err, ret) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(ret)
    }
  });*/

  //查找名字为张三的全部
 /* User.find({
    username: 'zs'
  }, function (err, ret) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(ret)
    }
  })*/

  //根据username查找第一个 符合条件的
/*
  User.findOne({
     username: 'zs',
     password:'123456'
       }, function (err, ret) {
     if (err) {
         console.log('查询失败')
     } else {
       console.log(ret)
     }
   })
  */


  // #region /删除数据 deleteOne, deleteMany  remove本身有多少删多少
/*
  User.remove({
    username: 'zs'
  }, function (err, ret) {
    if (err) {
      console.log('删除失败')
    } else {
      console.log('删除成功');
      console.log(ret);
    }
  });
*/

  // #region / 根据数据库的id更新数据
  //三个参数
  User.findByIdAndUpdate('5f827fd216ea33b660a713bf', {
    password: '654321123456'
  }, function (err, ret) {
    if (err) {
      console.log('更新失败')
    } else {
      console.log('更新成功')
    }
  })

