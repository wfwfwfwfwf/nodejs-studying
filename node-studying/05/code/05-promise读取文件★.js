var fs = require('fs');
//先搞出三个 Promise  (右边相当于构造函数  是直接执行的)
var p1 = new Promise(function (resolve, reject) {
  fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
});

var p2 = new Promise(function (resolve, reject) {
  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
});

var p3 = new Promise(function (resolve, reject) {
  fs.readFile('./data/c.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
});
//利用第一个p.then  return第二个p  接着链式.then  return第三个p 再链式.then
//也可以直接把 p换成new Promise...
p1
  .then(function (data) {
    console.log(data);
    /*
    当 p1 读取成功的时候
    当前函数中 return 的结果就可以在后面的 then 中 function 接收到
    return xxx   后面后面就接收到xxx
    没有 return 后面收到的就是 undefined
    所以我们可以 return 一个 Promise 对象
    当 return 一个 Promise 对象的时候，后续的 then 中的 方法的第一个参数会作为 p2 的 resolve
    */
    return  p2
  }, function (err) {
    console.log('读取文件失败了', err)
  })
  //p2.then
  .then(function (data) {
    console.log(data);
    return p3
  }, function (err) {
    console.log('读取文件失败了', err)}
  )
  //p3.then
  .then(function (data) {
    console.log(data);
    console.log('end')
  }, function (err) {
    console.log('读取文件失败了', err)
  ;});
