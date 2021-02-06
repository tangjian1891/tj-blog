## 在 centos 上安装 docker

1. yum 包更新到最新版本
   > yum update
2. 安装相关依赖包
   > yum install -y yum-utils device-mapper-persistent-data lvm2
3. 设定稳定仓库
   > yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
4. 安装 docker
   > yum install -y docker-ce
5. 查看 docker 版本
   > docker -v

Docker version 19.03.14, build 5eb3275d40

6.镜像仓库:阿里云 搜索 "容器镜像服务".复制代码执行。 cat 一下文件中有没有镜像加速地址 #使用 docker 容器运行 MongoDB

## docker 服务状态相关

1. 查看 docker 状态
   > systemctl status docker
2. 启动/开启自启 docker
   > systemctl start docker  
   > systemctl enable docker (建议用这个开机自启)
3. 重启 docker
   > systemctl restart docker
4. 停止 docker
   > systemctl stop docker

# 安装nginx