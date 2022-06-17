# 账务小组日志管理平台
安装依赖 `npm install or yarn install`

本地运行 `npm run dev`

项目构建 `npm run build`

## 主要功能
- 数据可视化展示
- 发布日志
- 编辑日志
- 删除日志
- 日志筛选

## 主要技术栈
- 框架：`React18、react-router-dom`
- 状态管理：`Mobx`
- 组件UI： `Ant Design`
- 打包工具：`Vite`
- 可视化：`ECharts`
  
## 使用教程
该项目为`demo`版，适用以下测试功能：
1. 输入任意手机号，输入测试密码`246810`后点击登录
2. 点击侧边栏发布文章，填写完毕后点击发布
3. 在文章管理栏下查看到该文章
4. 在文章管理下操作文章删除、编辑、筛选
5. 点击编辑文章，生成新二级侧边菜单，可点击叉号关闭
6. 在编辑文章中编辑，编辑结束后点击更新文章，编辑完成
7. 点击退出，退出当前账号，返回登录页（token为两小时内有效）