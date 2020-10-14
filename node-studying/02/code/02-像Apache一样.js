  var http = require('http');
  var fs = require('fs');
  var server = http.createServer();

  var wwwDir = 'D:/Movie/www';

  server.on('request', function (req, res) {
    var url = req.url;
    //当 url不是/的时候 filepath为用户输入的值
    var filePath = '/index.html';
    if (url !== '/') {
      filePath = url
    }

    fs.readFile(wwwDir + filePath, function (err, data) {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  });

  // 3. 绑定端口号，启动服务
  server.listen(3000, function () {
    console.log('running...')
  });
