> webpack是一个模块化打包工具。webpack主要是用来开发应用程序。而rollup主要是用来开发library库(因为rollup可以一套代码，构建成UMD,AMD,CJS,ESM,IIFE等模式，更适合做库)

webpack概念
1.input入口 
2.output出口  
3.loader   将不同的文件类型转换为webpack能识别的模块(个人认为是最重要的概念)
4.plugins  插件(扩展能力)

## 入口(entry)
```js
module.exports={
  entry:"./main.js"
}
```

## 出口(output)
默认就是bundle.js。当然也可以自己指定文件目录已经打包出来的文件名称
```js
  module.exports={
    output:{
      path:path.resolve(__dirname,'dist')
      filename:"bundle-nice.js"
    }
  }

```

## loader