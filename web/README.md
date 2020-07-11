## 前端

### 安装依赖

    $ npm install

### 开发模式 && 联调模式

    $ npm run dev

    配置host： 
    127.0.0.1 local.yx.mail.netease.com
    127.0.0.1 remote.yx.mail.netease.com

    - 本地mock开发 访问local.yx.mail.netease.com
    - 联调模式 访问remote.yx.mail.netease.com

### 本地打包

    $ npm run build

### 测试本地打的包能否运行

    $ npm run dev build

### 打包机-测试包

    $ npm run build:test ${BRANCH}

### 打包机-线上包

    $ npm run build:online ${BRANCH}