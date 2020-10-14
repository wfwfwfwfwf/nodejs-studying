  /*
    require: node 支持的引入
    export / import : 只有es6 支持的导出引入
    module.exports / exports: 只有 node 支持的导出
  */

    // 如果一个模块需要直接导出某个成员，而非挂载的方式
    // 那这个时候必须使用下面这种方式(多次module.exports是会覆盖的)★★★
    module.exports = 'hello';
    module.exports = function (x, y) {
      return x + y
    };
    module.exports = {
      add: function () {
        return x + y
      },
      str: 'hello'
    };

    // 你可以认为在每个模块的最后 return 了这个 exports
    // exports 是一个对象
    // 我们可以通过多次为这个对象添加成员实现对外导出多个内部成员



