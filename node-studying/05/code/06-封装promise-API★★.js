//这个就能直接用了★★★★★
var fs = require('fs');

function pReadFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
//会直接return一个对象   在调用then方法
pReadFile('./data/a.txt')
  .then(function (data) {
    console.log(data);
    return pReadFile('./data/b.txt')
  })
  .then(function (data) {
    console.log(data);
    return pReadFile('./data/c.txt');
  })
  .then(function (data) {
    console.log(data);
  });
