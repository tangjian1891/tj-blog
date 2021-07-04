## commonjs与ES Module
结论:ES Module才是未来
>  通常情况下现在node中commonjs不能加载ES Module  
1.1 commonjs为同步加载，ES Module必须要静态分析。   
1.2 node中不行    
1.3 webpack中可以   

> 通常情况下ES Module能够加载commonjs （在支持ES Module的node13.2+以上）module.exports作为default导出

## node中常用的内置模块