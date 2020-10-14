var fs = require('fs');
//读取文件嵌套可以解决异步问题(原本三个读取是平行的)
fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err
  }
  console.log(data);

  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {

      throw err
    }
    console.log(data);

    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
      if (err) {

        throw err
      }
      console.log(data);
    })
  })

});
