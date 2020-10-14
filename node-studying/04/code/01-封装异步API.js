   // function fn(callback) {
   // var callback = function (data) { console.log(data) }

    //  如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
  function fn(callback) {
    // var callback = function (data) { console.log(data) }

    setTimeout(function () {
      var data = 'hello';
      callback(data);
    }, 1000)
  }

  // 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取 ES6里面有promise then方法
  fn(function (data) {
    console.log(data)
  });
  // 三个函数,一个大的两个小的,其中第二个小的函数执行时,执行了第一个小的函数(这个函数又用到了第二个小函数的数据)



   //Promise(本质是构造函数 需要实例化)
   const p = new Promise(function(resolve, reject){
     setTimeout(function(){
       // resolve
       let data = 'hello promise';
       resolve(data);
         /*    let err = '数据读取失败';
               reject(err);
         */
     }, 1000);
   });

   //调用 promise 对象的 then 方法
   //value是成功的形参,reason是失败的形参
   p.then(function(value){
     console.log(value);
   }, function(reason){
     console.error(reason);
   })