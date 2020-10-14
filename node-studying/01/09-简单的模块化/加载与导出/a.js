/*
      require 方法有两个作用：
   1. 加载文件模块并执行里面的代码
   2. 拿到被加载文件模块导出的接口对象  ★★★

   在每个文件模块中都提供了一个对象：exports
   exports 默认是一个空对象
   你要做的就是把所有需要被外部访问的成员挂载到这个 exports 对象中
   有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要是为了使用里面的某个成员
   */

  //拿到被加载文件模块导出的接口对象(虽然b里面是导出单个成员,但a拿到的是整个接口对象)
  var bExports = require('./b');
  var fs = require('fs');
  console.log(bExports.foo);
  console.log(bExports.add(10, 30));
  console.log(bExports.age);
  bExports.readFile('./a3.js');

  /*读自己
  fs.readFile('./a3.js', function (err, data) {
    if (err) {
      console.log('读取文件失败')
    } else {
      console.log(data.toString())
    }
  });
*/