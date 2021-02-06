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
4. 权限用户的相关操作(如果是要添加 root 角色，需要提前切换到 admin 库，另外云数据库建议都在 admin 库上面操作)

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

6. 使用 mongourl 连接 (身份认证所用库，云数据库 MongoDB 固定为 admin,所以建议只在 admin 下创建用户即可)

   > mongodb://nice-admin:123456@49.234.13.241:27017/admin

 

# nvm 切换 node 版本

1.  https://github.com/coreybutler/nvm-windows/releases
2.  下载 mvm-setup.zip
3.  安装时分别选择 nvm 和 node 的目录(后面需要设置配置)
4.  去 nvm 目录下 settings.txt 文件增加几个属性

```js
root: C:\development\nvm
path: C:\development\node
arch: 64
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

````

> root、path 自带属性,arch 标识安装多少位 node,proxy 是否设置代理,node_mirror 镜像,npm_mirror 镜像

> nvm list available 查看所有支持的 node 版本
> nvm install 14.15.3 安装指定版本
> nvm list 查看已安装的版本
> nvm use 14.15.3 切换到指定版本

可以解决的问题:nvm 切换 npm 版本，解决 12.X 无法启动 node-sass 问题。 11.9.0 可以启动 node-sass
