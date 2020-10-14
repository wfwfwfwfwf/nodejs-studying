var fs = require('fs');

// 文件IO操作是异步的
//  ajax 请求也是异步的
// 文件操作中的相对路径可以省略 ./

/*
    fs.readFile('data/a.txt', function (err, data) {
      if (err) {
        return console.log('读取失败')
      }
       console.log(data.toString())
    })
*/

// 在模块加载中，相对路径中的 ./ 不能省略
// require('./data/__dirname问题.js')('hello')

/*
  在文件操作的相对路径中
     ./data/a.txt 相对于当前目录
     data/a.txt   相对于当前目录
     /data/a.txt  绝对路径，当前文件模块所处磁盘根目录
     c:/xx/xx...  绝对路径
  fs.readFile('./data/a.txt', function (err, data) {
    if (err) {
      console.log(err)
      return console.log('读取失败')
    }
    console.log(data.toString())
  })
*/


// 这里如果忽略了 . 则也是磁盘根目录
require('./data/foo.js')("message");
