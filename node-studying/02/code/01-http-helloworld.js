  var http = require('http');
  var fs = require('fs');

  // 1. 创建 Server
  var server = http.createServer();

  /*2.
    监听 Server 的 request 请求事件，设置请求处理函数
     请求
       处理
     响应(end之后是不能再发送任何请求的)

    咱们以前使用过 Apache 服务器软件，这个软件默认有一个 www 目录，所有存放在 www 目录中的资源都可以通过网址来浏览
    127.0.0.1:80/a.txt
    127.0.0.1:80/index.html
    127.0.0.1:80/apple/login.html
  */
  //需求:通过网址浏览本地文件
  var wwwDir = 'D:/Movie/www';

  server.on('request', function (req, res) {
    var url = req.url;
    // / index.html
    // /a.txt wwwDir + /a.txt
    // /apple/login.html wwwDir + /apple/login.html
    // /img/ab1.jpg wwwDir + /img/ab1.jpg
    if (url === '/') {
      fs.readFile(wwwDir + '/index.html', function (err, data) {
          //不用之前的if else语句了
        if (err) {
         /*
           return 有两个作用：
           1. 方法返回值
           2. 阻止代码继续往后执行*/
          return res.end('404 Not Found.');
        }
        res.end(data);
      })
    } else if (url === '/a.txt') {
      fs.readFile(wwwDir + '/a.txt', function (err, data) {
        if (err) {
          return res.end('404 Not Found.');
        }
        res.end(data)
      })
    } else if (url === '/index.html') {
      fs.readFile(wwwDir + '/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (url === '/apple.html') {
      fs.readFile(wwwDir + '/apple.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  });

  // 3. 绑定端口号，启动服务
  server.listen(3000, function () {
    console.log('running...')
  });
