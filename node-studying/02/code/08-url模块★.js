
var url = require('url');
var obj = url.parse('/pinglun?name=sssss&message=xxxxx', true)

console.log(obj);
console.log(obj.query);
