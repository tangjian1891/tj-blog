## 使用旗鱼安装 mongo 并使用 MongoDBCompass 可视化连接

> 提前注意:

1.  在旗鱼的安全防护的/端口白名单中开启端口号 27017
2.  默认的配置文件中 bind_ip = 127.0.0.1 需要改成 bind_ip = 0.0.0.0 才行
3.  账号:root,密码:在旗鱼 mongo 的配置中 7dVRb7Kb
4.  如果想进入 mongo shell,在配置中查看 logpath。进入/marlinos/mongodb/4.0.0 目录执行 bin/mongo
5.  连接可视化出现错误:An error occurred while loading navigation: command hostInfo requires authentication
    > 解决方案:连接时需要制定用户密码

### 先使用 mongo 的 root 登录进入，创建其它账号密码并赋值权限

1. 认证(认真前请切换到对应的数据库)
   > db.auth('root','L3YJLKFi')

### shell mongo 中常用命令

1. 查询默认的集合库(默认有 admin,config,local 三个)
   > show dbs
2. 查询用户创建的集合库(第一次可能查不到)
   > show collections
3. 查看当前所在的数据库
   > db
4. 权限用户的相关操作(如果是要添加 root 角色，需要提前切换到 admin 库，另外云数据库建议都在admin库上面操作)

   > use admin (切换到 admin 库)

   4.1 查看当前创建的所有用户

   > db.system.users.find()

   4.2 查看当前库下的用户

   > show users

   4.2 添加用户并给予角色 root 角色(注意:此时需要切换到 admin 库)。

   > db.createUser({user:'tangjian',pwd:'123456',roles:['root']})

   4.3 添加用户，给予角色，指定数据库（好用）

   > db.createUser({user:'nice-admin',pwd:'123456',roles:[{role:'readWrite',db:'nice-admin'}]})

5. 删除用户 （当前在哪个库，就可以删除哪个库下的角色）

   > db.dropUser('tangjian')

6. 使用 mongourl 连接 (身份认证所用库，云数据库MongoDB固定为admin,所以建议只在admin下创建用户即可)
   > mongodb://nice-admin:123456@49.234.13.241:27017/admin

      1. 增加/创建文档 create

```js
db.collection.insertOne(<document>)  插入一条文档
   --插入的就是单个对象

db.collection.insertMany([<document>,<document>],{ordered:<boolean>})
   --插入多条文档，ordered是否严格执行插入顺序。默认true，设置false可以优化性能
   --顺序多条插入时，一旦遇到错误，操作便会退出，剩余的文档正确与否，都不会插入。

db.collection.insert()
   --可以是一个或多个。并且支持db.collection.explain()命令。索引

db.collection.save()
   --save是单一文档，和insertOne一样。但是底层会调用insert。所以和insert返回值基本一致。 如果有_id字段，同样有更新的功能，没有的话，就会插入
```

      2. 查询/读取文档 read

```js
db.collection.find(<query>,<projection>)
   --<query>文档定义了读取操作时筛选文档的条件
   --使用query参数筛选文档db.collection.find({name:'beijing'})
   --<projection>文档定义了队读取结果进行的投射。(只读取部分字段)

db.collection.find().pretty()  美化结果

比较操作符(比如要查询一个时间节点，字段范围等等)
$eq 匹配字段值相等的文档
db.collection.find({name:{$eq:'alice}})
$ne 匹配字段值不等的文档
$gt 匹配字段值大于查询值的文档
$gte 匹配字段值大于或等于查询值的文档
$lt 匹配字段值小于查询值的文档
$lte 匹配字段值小于或等于查询值的文档
$in 匹配字段值与任一查询值相等的文档

db.collection.find({name:{$in:['alice','alice2']}})
db.collection.find({name:{$in:['beijing','wuhan]}}) -->只要符合的都会查出来
$nin 匹配字段值与任何查询值都不等的文档(not in)
5.4 逻辑操作符 推荐使用上面的
$not 匹配筛选条件不成立的文档
$and 匹配多个筛选条件全部成立的文档
$or 匹配至少一个筛选条件成立的文档
db.collection.find({$or:[{name:{$eq:'alice'},{name:{$ep:'foo'}}}]})
$nor 匹配多个筛选条件全部不成立的文档
5.5 字段操作符
$exists <Boolean> true 要求字段存在
db.collection.find({name:{$ne:'beijing',$exists:true}}) name值不是beijing但是name值存在的字段
5.6 数组操作符
$all  匹配数组字段中包含所有素有查询值得文档
db.collection.find({contact:{$all:['beijing','shanghai']}})
$elemMatch 匹配数组字段中至少存在一个值满足筛选条件的文件
db.collection.find({contact:{$elemMatch:{$gt:'1000',$lt:'200000'}}})既大于，又小于
5.7 文档游标
db.collection.find()返回一个文档集合的前20个
var myCursor=db.collection.find()  会返回一个游标
myCursor[1] 返回的是第二个文档
遍历后关闭，或者游标在10分钟之后，便会自动关闭，可以使用noCursorTimeout()函数来保持游标一直有效
var myCursor=db.collection.find().noCursorTimeout() 。在不遍历游标的情况下，你需要主动关闭
5.8 游标函数遍历游标
db.collection.forEach
5.9 游标函数个数
db.collection.count(<applySkipLimit>) false ,默认只会返回find的所有
db.collection.find().limit(1).count({true}) -->会考虑limit，skip等
5.10 排序
db.collection.find().sort({balace:-1,name:1})
db.collection.find().sort({balace:-1}).limit(1)

5.11 文档投影
db.collection.find({},{name:1,_id:0}) 1就是要，0就不要。不能混用，除了文档主键_id
```

      3. 更新文档

```js
3.1更新
db.collection.update(<query>,<update>,<options>)
--<query>文档定义了更新操作时筛选文档的条件
--<update>文档提供了更新的内容
--<options>文档，一些参数
   --upsert:true 如果没有就新增

3.2 更新整篇文档(不推荐在<update>中包含_id字段，如果有_id字段，需要完全一致)(更新整篇文档时，只能单个更新)
db.collection.update({name:"beijing"},{name:'shanghai',balance:123})

3.3 文档更新操作符
$set 更新或新增字段(有就更新，没有就新增)
db.collection.update({name:"beijing"},{$set:{balace:3000,date:123456678}}) //更改一个，新增一个

$unset 删除字段
db.collection.update({name:"beijing"},{$unset:{balance:''}}) //unset设置什么都会删
$rename 重命名字段
$inc 加减字段值
$mul 相乘字段值
$min 比较减小字段值
$max 比较增大字段值

3.4 更新插入upsert
在默认情况下， 如果update命令中的筛选条件没有匹配任何文档，则不会进行任何操作
将。。。3-18
```

4.删除文档

```js
db.collection.remove({ balance: 50 });
```

5.聚合操作
db.collection.aggregate()
{<operator>:[<argument1>,<argument2>]}

```js
   1.计数操作
   5.1 字段路径表达式
   $<field> -使用$来指示字段路径
   $<field>.<sub-field> -使用$和.来指示内嵌文档字段路径

   5.2 系统变量表达式
   $$<variable> -使用$$来指示系统变量

   聚合管道阶段
   $project -对输入文档进行再次投影
   $match - 对输入文档进行筛选
   $limit - 筛选出管道内前N篇文档
   $skip - 跳过管道内前N篇文档
   $unwind - 展开输入文档中的数组字段
   $sort - 对输入文档进行排序
   $lookup - 对输入文档进行查询操作
   $group -对输入文档进行分组
   $out - 将管道中的文档输出

   对文档进行重新投影
   db.collection.aggregate([
      {$project:{
         _id:0,
         balance:1,
         clientName:"$name.firstName"
      }}
   ])

   对文档进行筛选$match
   db.collection.aggregate([
      {
         $match:{
            "name.firstName":'alice'
         }
      },
      {
         $project:{
            _id:0
         }
      }
   ])

    $limit
   db.collection.aggregate([
      {
         $limit:1
      }
   ])

   排序 $sort  1正向  -1 逆向
   db.collection.aggregate({})
   $sort:{balance:1,name:-1}

   使用单一字段值进行查询 $lookup
   $lookup:{
      from:<collection to join>, //同一个数据库中的另一个查询集合
      localField:<field from the input documents>,//当前希望查询的字段
      foreignField:<field from the documents of the "from" collection>,//从from中希望查到的字段
      as:<output array field> //增加的就是(from字段)
   }

   使用复杂条件进行查询
   $lookup:{
      from :<collection to join>,
      let :,
      pipeline:
      as:<output array field>
   }
   对查询集合中的文档使用聚合阶段进行处理

   $group:{
      _id:<expression>,
      <field>:{<accumulator1>:<accumulator1>}
   }

   db.collection.aggregate([
      {
         $group:{
            _id:"$currency"
         }
      }
   ])

```

collection 集合-->table 表 6.13




# nvm切换node版本
1.  https://github.com/coreybutler/nvm-windows/releases  
2. 下载 mvm-setup.zip 
3. 安装时分别选择nvm和node的目录(后面需要设置配置)
4. 去nvm目录下settings.txt文件增加几个属性
```js
root: C:\development\nvm
path: C:\development\node
arch: 64 
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

```
> root、path自带属性,arch标识安装多少位node,proxy是否设置代理,node_mirror镜像,npm_mirror镜像


> nvm list available  查看所有支持的node版本
> nvm install 14.15.3   安装指定版本
 >nvm list  查看已安装的版本
>nvm use 14.15.3    切换到指定版本

可以解决的问题:nvm 切换npm版本，解决12.X无法启动node-sass问题。  11.9.0可以启动node-sass