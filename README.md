# Node CLI Broadcast

一个可交互的命令行应用，主要用于群发邮件、消息等。

## 配置

1. 下载仓库代码并切换到 `node-cli-broadcast` 目录；

   ```bash
   git clone https://github.com/TingGe/node-cli-broadcast.git
   cd node-cli-broadcast
   ```

2. 以 163 邮箱为例，初始配置时，须确认发件的邮箱 smtp 服务是开启状态（[帮助](https://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac22dc0e9af8168582a)）；

3. 将 `mailConfig.json ` 中 `user`和`pass`替换成发件箱地址和客户端授权密码。

## 使用

1. 在 `recipients.csv` 文件中，按照 First name、Last name 和 Email 的顺序，填写收件人列表；
2. 执行 `npm run broadcast:mail ` ，根据交互提示可以设置邮件标题、内容和附件；
3. 提示 “Success” 后，可在收件箱中查看刚才发出的样例邮件 “Test Newsletter”。

## 路线图

1. 后续优化各配置项

## 许可

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FTingGe%2Fnode-cli-broadcast.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FTingGe%2Fnode-cli-broadcast?ref=badge_large)