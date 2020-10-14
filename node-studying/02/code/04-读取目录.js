var fs = require('fs')

//这里是files不是data
fs.readdir('D:/Movie/www', function (err, files) {
  if (err) {
    return console.log('目录不存在')
  }
  //打印文件的名字
  console.log(files);
})
