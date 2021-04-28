> webpack 是一个模块化打包工具。webpack 主要是用来开发应用程序。而 rollup 主要是用来开发 library 库(因为 rollup 可以一套代码，构建成 UMD,AMD,CJS,ESM,IIFE 等模式，更适合做库)

webpack 概念
1.input 入口
2.output 出口  
3.loader 将不同的文件类型转换为 webpack 能识别的模块(个人认为是最重要的概念)
4.plugins 插件(扩展能力)

## 相关概念

### 入口(entry)

```js
module.exports = {
  entry: "./main.js",
};
```

### 出口(output)

默认就是 bundle.js。当然也可以自己指定文件目录已经打包出来的文件名称

```js
  module.exports={
    output:{
      path:path.resolve(__dirname,'dist')
      filename:"bundle-nice.js"
    }
  }

```

### loader

> 可以将任意的文件以模块的方式 import 导入，这是 webpack 特有的。webpack 遵循万物皆模块
> 1.test 属性，用于表示出需要匹配哪些文件。
> 2.use 属性,进行转换时，使用哪个 loader

```js
module.exports = {
  input: "./main.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" }, //以.txt结尾的文件，使用raw-loader解析
    ],
  },
};
```

### plugin

> 可对特定功能节点做增强。例如:打包压缩代码，打包打出 gzip 包，打包对图片资源做 base64 内联处理等

```js
module.exports = {
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

## 开始配置

关于 vue-cli 的配置。可以使用 vue inspect > output.js 打印所有的配置

> 开始从零增加一个配置。推荐查看 webpack 的指南，一步一步跟着配置

```js
npm i webpack -D
npm i webpack-cli -D  //在webpack4+需要webpack-cli,包括现在的5，都是需要的
```

> 执行 npx webpack 即可自动加载 webpack.config.js 中的配置(记得配置对应的配置文件)。或者添加到 script 标签中

### loader 相关

1. 想要引入 css 文件,但是 webpack 并不能识别。所以无法打入到 bundle 中。
   > 报错: Module parse failed: Unexpected token
   > 首先先引入 css-loader

```js
npm i css-loader -D
npm i style-loader -D
```

在 module.rules:Array<Object> 中进行 loader 配置 每个对象中都有 use 和 test 两个属性，匹配 css 文件，使用两个 loader，一个是解析 css 文件,一个是将解析后的 css 模块内容使用 style 标签自动插入.解析时自右向左，所以必须先使用 css-loader 解析

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',"css-loader"],
      },
    ],
  },
```

2. 想要引入图片文件。 引入图片文件将被复制到输出目录中，然后将地址转化为输出目录的图片文件的绝对地址
   注意：图片类型也算是文件类型的一种，实际上我们需要是将图片类型的路径转化为输出目录的图片文件的绝对地址即可。(不仅可以处理图片，还可以处理音频，视频，字体等文件)

```js
npm i file-loader -D

//  ----------配置-----------
module: {
  rules: [{ test: /\.png|jpg$/, use: "file-loader" }];
}

// ----------代码--------
import Image from "./assets/image.jpg";
console.log(Image); //输出目录图片的绝对地址 file:///C:/Users/tangjian1891/Desktop/webpack-demo/dist2/d7825376105e7be3e53763ed91d48d55.qwer
```

但是优化没有止境，你可能需要压缩一下你的图片.
可以使用url-loader做内联。vue-cli的默认值是4096也就是4K大小会被内联。可以将file-loader配置的地方替换为url-loader配置。当符合limit的图片会被做内联处理直接打入bundle中，不符合的图片会在url-loader调用file-loader做路径打包。

**如果只安装了url-loader没有安装file-loader,那么limit没命中的图片会出现打包报错Cannot find module 'file-loader'**

**所以:即使你安装了url-loader，也很推荐安装file-loader，但是配置loader只需配置url-loader一个即可**
```js
npm i url-loader -D
// -----------配置--------
module:{
  rules:[
    { test: /\.png|jpg$/, use: {
      loader:"file-loader" ,
       options: {
            limit: 4096, //为vue-cli的默认大小
       },
    }}
  ]
}

```

3. 字体资源，同2图片资源一致

4. 其余类型的资源。例如csv,xml文件. 注:json默认可解析

```js
npm i csv-loader xml-loader -D
// ------------配置------
module:{
  rules:[
    {
      test:/\.csv$/,
      use:"csv-loader"
    },
    {
      test:/\.xml$/,
      use:"xml-loader"
    },
  ]
}
```

### plugins 先关
1. 你会发现每次在html中手动引入打包的出来bundle麻烦。使用一个插件 html-webpack-plugin


```js
npm i html-webpack-plugin -D
// -----配置---
  plugins:[
    new HtmlWebpackPlugin()
  ]
  // 打包后，会自动生成一个html，并自动引入打包出来的相关bundle
```