# 无名杀自制扩展合集

本仓库收录四个适用于[无名杀](https://github.com/libnoname/noname)的个人自制武将扩展。扩展使用现代无名杀的扩展接口编写，技能代码同时包含 legacy step 与 async/await 两种事件写法。

## 扩展内容

| 扩展 | 当前版本 | 主要内容 |
|------|----------|----------|
| 破界异志 | 1.7.0 | 魔笮融、界曹宪、界神邓艾 |
| 将灵 | 1.0.0 | 将灵曹纯、将灵张琪瑛、将灵赵襄、将灵年兽、将灵关索、将灵曹婴、将灵小乔、将灵神赵云 |
| 原神拓展 | 1.5.4 | 魈、胡桃、钟离、荧、丘丘人，以及璃月、旅者自定义势力 |
| 斗罗大陆 | 1.3.1 | 霍雨浩及「寒」标记相关机制 |

## 下载

请前往仓库的 [Releases](https://github.com/reeeeeeeeeeeeex/noname_extension-/releases/latest) 下载需要的游戏内导入包：

- `extension1-v1.6.1.zip`：旧版「扩展1」
- `genshin-extension-v1.5.4.zip`：原神拓展
- `douluo-extension-v1.3.1.zip`：斗罗大陆

上述 ZIP 为拆分前的版本。从源码安装时，请先停用或卸载旧版「扩展1」，再启用「破界异志」和「将灵」，避免旧版重复加载将灵武将与技能。

不要下载 GitHub 自动生成的 `Source code` 压缩包；它包含整个源码仓库，不是无名杀游戏内导入包。

## 游戏内安装

1. 下载所需扩展的 ZIP 文件，**不要解压**。
2. 启动无名杀，进入“选项/设置 → 扩展”。
3. 在扩展页面底部展开“导入扩展”。
4. 选择下载的 ZIP 文件并点击“确定”。
5. 游戏提示导入成功后会自动重启；若没有自动重启，请彻底关闭游戏后重新打开。

导入同名扩展时，游戏会先移除旧版本，再安装并启用新版本。四个扩展互相独立，可以只安装其中一个，也可以同时安装。

## ZIP 包结构

无名杀会直接在 ZIP 根目录查找 `info.json` 或 `extension.js`。正确的导入包结构如下：

```text
extension.js
info.json
README.md
角色立绘及其他资源文件
```

请勿在 ZIP 内再套一层扩展文件夹，例如 `破界异志/extension.js` 不是本仓库 Release 采用的结构。

## 兼容性与反馈

- 本扩展以当前现代无名杀源码及官方武将包为实现参考。
- 较旧的无名杀版本或第三方分支可能缺少所需事件/API，不能保证兼容。
- 遇到问题时，请附上无名杀版本、扩展版本、复现步骤及报错截图。

## 开发文档

- [扩展设计约定](docs/extension-conventions.md)：技能设计、命名、资源和交付约定。
- [技能 API 与机制](docs/skill-api.md)：按主题查阅触发、结算、牌的移动及其他技能接口。

## 开发检查

修改扩展后至少执行：

```bash
node --check 破界异志/extension.js
node --check 将灵/extension.js
node --check 原神拓展/extension.js
node --check 斗罗大陆/extension.js
node --test tests/zhifou.test.cjs
```

扩展目录中的 `extension.js` 与 `info.json` 版本号应始终保持一致。
