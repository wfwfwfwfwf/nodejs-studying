/*
    require: node 支持的引入
    export / import : 只有es6 支持的导出引入
    module.exports / exports: 只有 node 支持的导出

    在 Node 中，每个模块内部都有一个自己的 module 对象
    该 module 对象中，有一个成员叫：exports 也是一个对象
    也就是说如果你需要对外导出成员，只需要把导出的成员挂载到 module.exports 中
*/

// 我们发现，每次导出接口成员的时候都通过 module.exports.xxx = xxx 的方式很麻烦
// 所以，Node 为了简化你的操作，专门提供了一个变量：exports 等于 module.exports

/*    == module.exports={}
    var module = {
      exports: {
        __dirname问题: 'bar',
        add: function
      }
    }
    var exports = module.exports 也就是说在模块中还有这么一句代码
*/

/*
    module.exports.__dirname问题 = 'bar'
    module.exports.add = function (x, y) {
      return x + y
    }
    两者一致，那就说明，我可以使用任意一方来导出内部成员
    console.log(exports === module.exports) true
*/

/*
    exports.__dirname问题 = 'bar' (允许)
    module.exports.add = function (x, y) {  (允许)
    return x + y
}*/

/*
    当一个模块需要导出单个成员的时候
    绝对不能 exports = {...} (改变了exports的指向)
    exports.a = 123
    exports = {}(改变指向,断开与module.exports连接)
    exports.__dirname问题 = 'bar'(断开之后无论怎么修改属性值都是无法传给module.exports的)
    module.exports.b = 456

    同理，给 module.exports 重新赋值也会断开

    这里导致 exports !== module.exports
    module.exports = {
      __dirname问题: 'bar'
    }
*/

    //但是可以建立两者的引用关系
    // exports = module.exports
    // exports.__dirname问题 = 'hello'
    // {__dirname问题: bar}
    exports.foo = 'bar';
    // {__dirname问题: bar, a: 123}
    module.exports.a = 123;
   /*
   一旦exports={...}
    exports !== module.exports
    最终 return 的是 module.exports
    所以无论你 exports 中的成员是什么都没用
    */
    exports = {
      a: 456
    };

    // {__dirname问题: 'haha', a: 123}
    module.exports.foo = 'haha';
    // 无用代码
    exports.c = 456;

    // 重新建立了和 module.exports 之间的引用关系了
    exports = module.exports;
    // 由于在上面建立了引用关系，所以这里是生效的
    // {__dirname问题: 'haha', a: 789}
    exports.a = 789;

   /* 一旦给module.exports ={...}
    前面再牛逼，在这里都全部推翻了，重新赋值
    最终得到的是 Function
    */
    module.exports = function () {
      console.log('hello')
    };

      /*
       真正去使用的时候：
       导出单个成员(可以多次)：exports.xxx = xxx
       导出多个成员也可以(对象形式):module.exports = {

                           }
       导出单个成员：module.exports
      */


      /*
      谁来 require 我，谁就得到 module.exports
      默认在代码的最后有一句：
      一定要记住，最后 return 的是 module.exports
      不是 exports
      所以你给 exports 重新赋值不管用，
      return module.exports
      */
