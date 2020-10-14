var http = require('http');
var fs = require('fs');

var server = http.createServer();

var wwwDir = 'D:/Movie/www';

server.on('request', function (req, res) {
  var url = req.url;
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
  /*
    1. 如何得到 wwwDir 目录列表中的文件名和目录名
       fs.readdir

    2. 如何将得到的文件名和目录名替换到 template.html 中
       2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
       2.2 根据 files 生成需要的 HTML 内容
       只要你做了这两件事儿，那这个问题就解决了*/

    //读文件目录的
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.');
      }
      //读取成功后进入这里
      // 2.1 生成需要替换的内容
      var content = '';
      //item每个文件对象,遍历每个文件的文件名
      files.forEach(function (item) {
        // console.log(item)
        // 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量 ★★★★
        content += `
          <tr>
            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">2020/10/9 10：30</td>
          </tr>
        `
      })

      // 2.3 替换
      //将2进制字符串转换成我们能操作的String
      data = data.toString();
      data = data.replace('^_^', content);

      // 3. 发送解析替换过后的响应数据
      res.end(data)
    })
  })
});

server.listen(3000, function () {
  console.log('running...')
});
