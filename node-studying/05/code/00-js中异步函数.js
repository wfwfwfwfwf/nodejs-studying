
function add(x, y, callback) {
  /*var callback = function(ret){
    console.log(ret)
  }*/
  console.log(1);
  setTimeout(function () {
    var ret = x + y;
    callback(ret);
  }, 2000)
}
// add(10,20)
add(10, 20, function (ret) {
  console.log(ret);
});

/*
  注意：凡是需要得到一个函数 内部异步操作  的结果
   setTimeout
   readFile   writeFile
   ajax
  这种情况必须通过：回调函数
*/
