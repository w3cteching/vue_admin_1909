# ECMAScript6/7/8/..复习

1. javaScript组成：

```
包括：ECMAScript,DOM,BOM

1.ECMAScript:javascript核心语法，不依赖平台

 例如：定义变量，if,switch,for,数组Api,字符串API,正则Api.....

2.DOM:(Document Object Model)针对浏览器标签操作 例如：获取id，获取类名，获取标签名
   
   注：操作真实DOM，引起重绘和回流-->才引出虚拟DOM
   
      重绘：主要指页面颜色的改变，不影响DOM的空间变化 color,background
      回流：指页面元素的尺寸(width,padding,height,margin)，位置的变化:left,top,bottom,right等
      
        tranform:translateX(300px)
      
      重绘未必引起回流，但回流一定引起重绘
   
3.BOM:(Browser Object Model)主要针对浏览器相关API的操作

   history: history.go(),history.back() pusState,popState,replaceState
   
   navigator:跟浏览器系统信息相关  
   
       navigator.userAgent
       
     参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator
   location:主要获取浏览器地址栏相关的信息
   
   location.search
   location.href
   location.hash
   
    参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Location
   
     
```

2. ECMA6/7/8...新增特性

  ES6 ES2015  .....  ES11 ES2020

了解ES6/7/8/9/最新进展：https://github.com/tc39/proposals/blob/master/finished-proposals.md

- let和const: 重点

  ```
  let 定义变量
  const 定义常量
  ```

>  面试官：
> 1.你说一下let和var的区别

 ```
相同点：都是定义变量
 区别：
     1.是否有变量提升   var有变量提升，let没有
     2.是否能重复定义   var允许重复定义变量，let不允许重复定义
     3.是否有块级作用域  { }
         全局作用域：在函数外部定义的范围
         局部作用域：在函数内部定义的范围
         块级作用域：在{ }大括号中定义范围
 ```



>  2.你说一下let和const的区别

```
let 定义变量
const 定义常量,是不能修改的，如果要修改，将常量定义成对象的形式，这样，就可以给对象中的属性进行修改
```



- symbol：是ES6新增的基本数据类型

```
number,string,boolean,null,undefined,symbol(ES6新增)

symbol:定义的值是唯一性

两个symbol类型的值永远不等

例如：
var s1=Symbol()
var s2=Symbol()
s1=== s2
 false
```

- 扩展运算符(  ... )

```
扩展运算符（也称展开操作符）两层作用：

1.将数组转换成数据列表 [a,b,c,d]--->a,b,c,d
例如：
var arr1=[666,777,888]
var arr2=['hello','vuejs']
var result=[...arr1,...arr2]

2.将数据列表转换成数组 a,b,c,d--->[a,b,c,d]

3.展开对象
var result={...obj1,...obj2}
或
result=Object.assign({},obj1,obj2)

例如：
function sum1(str,...args) {
  var result=0;
  for(var i=0;i<args.length;i++) {
    

    result+=args[i]

  }

   return result;
}

sum1('请输入',20,30,40)
```



- class类

```
定义一个类：
class Person {

   constructor(a,b) {
     //构造器
     this.属性=a

   }

  方法1() {}
  方法2() {}
  方法3() {}

}

继承一个类：

class Child extends Person {

   constructor(a,b) {
     super()  //代表父类
     //构造器
     this.属性=a

   }

  方法1() {}
  方法2() {}
  方法3() {}

}
```



- set和map:

```
set:理解成是一个不重复的数组 

将set类型的数据转换成数组：
var s=new Set()
Array.from(s)
或[...s]

var s=new Set()
s.add()
s.has()
s.delete()
s.size

例如：数组去重：
var arr=[3,34,23,2,2,23,23,3,34,34,34,45]

[...new Set(arr)]

map:理解成是一个对象,增强了对象key的数据类型，以前只能是字符串，现在对象的属性可以是做任意的数据类型！
{
  "name":'jack',
  '10':'abc',
  'undefined':999
}

var m1=new Map()
m1.set(属性名,值) //设置
m1.get(属性名)  //获取
m1.delete(属性名)  //删除


//遍历Map类型获取所有值
for(var [key,value] of m1) {

  console.log(key)
  console.log(value)
}
```

-  Promise：重点

```
1.用于处理回调地狱的异步解决方案
具体实现：
function waiting() {

    return new Promise((resolve,reject)=>{
    
             setTimeout(function() {
      
                //console.log(2)
                reject('哈哈')
    
            },2000)      

    })

 }


waiting().then(res=>{
   console.log(1)
   console.log('res:',res)
    console.log(3)

}).catch(error=>{

   console.log('error:',error)

})

.then
.catch
.race
.finally
Promise.all([waiting(),waiting2(),waiting3()])
   .then(res=>{


   }).catch(res=>{

})
```



- async/await(ES2017) 重点

    ```
    串行执行：必须先执行第一个异步，将第一个异步的结果返回传递给第二个异步函数，再执行第二个异步的操作过程
    
    //第一个函数
    function waiting() {
        return new Promise((resolve,reject)=>{
              //我这里只是用setTimeout来模拟axios,
                 setTimeout(function() {
                    resolve('第二个接口返回')
    
                },2000)
    
            
        })
    
     }
    
    
    //第二个函数
    function waiting2() {
        return new Promise((resolve,reject)=>{
              //我这里只是用setTimeout来模拟axios,
                 setTimeout(function() {
                    reject('第二接口返回')
    
                },2000)
    
            
        })
    
     }
    
    
    async function handleFn() {
       console.log(1)
       
       //串行执行，先等待第一个函数返回
        let res=await waiting()
        console.log('res:',res)
        
        //再等待第二个函数返回
        let res2=await waiting2(res)
        console.log(res2)
     }
    
    并行：两个接口同时执行
    
    function waiting() {
        return new Promise((resolve,reject)=>{
              //我这里只是用setTimeout来模拟axios,
                 setTimeout(function() {
                    resolve('第二个接口返回')
    
                },2000)
         
        })
    
     }
    
    
    function waiting2() {
        return new Promise((resolve,reject)=>{
              //我这里只是用setTimeout来模拟axios,
                 setTimeout(function() {
                    reject('第二接口返回')
    
                },2000)
         
        })
    
     }
    
    async function handleFn() {
       console.log(1)
        //并发执行，waiting(),waiting2()两个接口都成功返回才返回结果
        let res=await Promise.all([waiting(),waiting2()])
         console.log('res:',res)
         console.log('end')
     }
    
     handleFn().catch(res=>{
    
         console.log('error:',res)
     })
    ```

    

- 解构赋值

```
解构赋值的前提条件：解构赋值的=号左侧和右侧类型相同
```

- 解构对象

```
var obj={
   name:'hjl',
   info:{
     xuelie:'本科',
     zhiye:'IT'

   }
 
}

var {info:{xuelie,zhiye}}=obj
解构同时也能重命名
var {info:{xuelie:xueli,zhiye:zhuanye}}=obj
```



- 解构数组

```
var arr=[
    {id:1001,name:'alice',age:20},
    {id:1002,name:'alice2',age:25},
    {id:1003,name:'alice3',age:22},
]
var [first,second]=arr;
```

- 箭头函数 
    - 格式：(参数1,参数2,...参数n)=>{ //代码段}
    - 面试官：普通函数和箭头函数的区别？

          ```
普通函数：
	function 函数名(参数1,参数2,...参数n) {
	
	   //代码段
	}
	
箭头函数:
	(参数1,参数2,...参数n) => {
	
	   //代码段
	}
  
  
 箭头函数：
    1.没有自己的this指向，它的this是其父级普通函数所在的this指向（一般在书籍中把“父级函数所在的this指向”称为上下文）
    2.箭头函数没有arguments
    3.箭头函数不能实例化
          ```



- module(export,import)

```
ES6 模块化

模块化：是前端走向开发复杂项目的起点！
ES模块化关键字：

抛出：export {a,b},export default 对象或方法
引入:import { a,b }或名称  from 'xxx'

模块化开发规范：AMD,CommonJS,CMD,UMD,ES6 module

AMD:主要用于浏览器端，异步规范 例如：require.js
CommonJS:主要用于服务端规范 同步规范 例如：node.js   

    抛出：module.exports
    引入：require('xxx.js')
CMD:主要用于浏览器 异步规范，结合了一些commonjs的思想 例如：sea.js 网名：玉伯
UMD:服务端和浏览器通吃  用服务器端写代码，然后通过某个打包机制跑在浏览器端
ES6 module：ES6推出的模块化规范 服务器端和浏览器端都可以使用

```



- generator
    - Generator 函数是 ES6 提供的一种异步编程解决方案
    - async/await是Generator的语法糖
    - 语法：

```
function* 函数名() {
   yield 值或异步函数1
   yield 值或异步函数2
   yield 值或异步函数3

}

调用时必须通过next执行下一个next
```



- 模板字符串

```
通过``反引号来定义变量，其中模板字符串中可以解析普通变量
模板字符串取值：${变量}
在模板字符串中也能作运算

例如：
var str=`我的名子叫${obj.name}，
        我的基本信息是${obj.info.xuelie},
        专业：${obj.info.zhiye},
        年龄:${obj.age+10}`
```

- for of

    - for of在[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/iterable)（包括 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)，[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map)，[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)，[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
    - 通常对数组，对象，map,set，string遍历
    - 对象不能用for of遍历(但可以通过Objecjt.entries来转换成可迭代对象进行遍历 )

- ......

  

>  ES2015+如果正常跑在浏览器上，都要通过babel去编译转换成ES5才能正常在浏览器运行




