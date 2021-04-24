> webpack是一个模块化打包工具。webpack主要是用来开发应用程序。而rollup主要是用来开发library库(因为rollup可以一套代码，构建成UMD,AMD,CJS,ESM,IIFE等模式，更适合做库)

webpack概念
1.input入口 
2.output出口  
3.loader   将不同的文件类型转换为webpack能识别的模块(个人认为是最重要的概念)
4.plugins  插件(扩展能力)

## 相关概念
### 入口(entry)
```js
module.exports={
  entry:"./main.js"
}
```

### 出口(output)
默认就是bundle.js。当然也可以自己指定文件目录已经打包出来的文件名称
```js
  module.exports={
    output:{
      path:path.resolve(__dirname,'dist')
      filename:"bundle-nice.js"
    }
  }

```

### loader
> 可以将任意的文件以模块的方式import导入，这是webpack特有的。webpack遵循万物皆模块
1.test 属性，用于表示出需要匹配哪些文件。
2.use 属性,进行转换时，使用哪个loader
```js

module.exports={
  input:"./main.js",
  output:{
    filename:"bundle.js"
  },
  module:{
    rules:[
      {test:/\.txt$/,use:'raw-loader'} //以.txt结尾的文件，使用raw-loader解析
    ]
  }
}
```

### plugin
> 可对特定功能节点做增强。例如:打包压缩代码，打包打出gzip包，打包对图片资源做base64内联处理等
```js
module.exports={
  plugins:[
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```


关于vue-cli的配置。可以使用 vue inspect > output.js 打印所有的配置