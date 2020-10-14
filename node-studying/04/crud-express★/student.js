/*
  student.js
  数据操作文件模块
  职责：操作文件中的数据，只处理数据，不关心业务
  封装异步 API
 */
//增删改查学生本质都是修改 db.json文件的内容,所以要用到fs操作
var fs = require('fs');
var dbPath = './db.json';
/*
  获取学生列表
  @param  {Function} callback 回调函数
 */

exports.find = function (callback) {
  // 异步函数条件★★★★
  // 三个函数,一个大的两个小的,其中第二个小的函数执行时,执行了第一个小的函数(这个函数又用到了第二个小函数的数据)
  //'utf8' 这里指定utf8之后就无需data.toString了★★★★
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    //JSON.parse(data)是整个文件对象,json字符串=>对象
    callback(null, JSON.parse(data).students)
  })
};

/*
  添加保存学生
  @param  {Object}   student  学生对象
  @param  {Function} callback 回调函数
 */
exports.save = function (student, callback) {
  //读文件的时候callback一次(执行顺序是这里异步操作先执行)★★★
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students;

    /* // 添加 id ,唯一不重复
     student.id = students[students.length - 1].id + 1;*/
    //(处理一开始没有学生的情况)
    if ( students.length ==0){
      student.id = 1
    }else {
      student.id = students.length + 1;
    }

    // 把用户传递的对象保存到数组中
    students.push(student);

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    });

    // 把字符串保存到文件中;写文件的时候callback一次
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
};


/*
  根据 id 获取学生信息对象
  @param  {Number}   id       学生 id
  @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students;
    //根据ID找出符合条件的学生(最终返回的是学生)
    var ret = students.find(function (item) {
      //防止id是其他类型的
      return item.id === parseInt(id)
    });
    callback(null, ret)
  })
};


// 更新学生
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students;

    // 注意：这里记得把 id 统一转换为数字类型
    student.id = parseInt(student.id);

    // 你要修改谁，就需要把谁找出来
    // 用ES6的：find方法
    // 需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
    var stu = students.find(function (item) {
      return item.id === student.id;
    });

    // 这种方式你就写死了，有 100 个难道就写 100 次吗？
    // stu.name = student.name
    // stu.age = student.age

    // 遍历拷贝对象  新数据覆盖旧数据
    for (var key in student) {
      stu[key] = student[key]
    }

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
};

//删除学生
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students;

    // findIndex 方法专门用来根据条件查找元素的下标
    var deleteId = students.findIndex(function (item) {
      return item.id === parseInt(id)
    });

    // 根据下标从数组中删除对应的学生对象
    students.splice(deleteId, 1);

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    });

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
};
