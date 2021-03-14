## linux指令

### 启动service

```bash
service ssh start
```

默认22端口

### 电脑像服务器传送文件

```bash

scp -P 8888 -r ./* xyf@127.0.0.1:/home/xyf/server

```

设置虚拟器转发端口8888，拷贝当前代码到服务器指定的目录


