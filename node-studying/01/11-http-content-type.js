
  // require
  var http = require('http');
  var server = http.createServer();
  //监听request请求事件事件 设置请求处理函数
  server.on('request', function (req, res) {
    /*
    解决乱码问题:
    在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 世界')
    */
    var url = req.url;

    if (url === '/plain') {
      // text/plain 就是普通文本
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('hello 世界')
    } else if (url === '/html') {
      // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容★★★
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<p>hello html <a href="">点我</a></p>');
    }
  });

   server.listen(3000, function () {
       console.log('Server is running...');
  });
