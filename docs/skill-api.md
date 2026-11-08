# 技能 API 与机制

这是技能语义和引擎行为的按需参考。先定位相关小节，再核对当前本地源码；不要把某个官方技能的业务条件当成通用 API 规则。作者的设计选择见 [扩展设计约定](extension-conventions.md)。

「本地参考」的路径从无名杀安装目录下的 `resources/app/` 算起。引擎源码、官方武将包和官方指南不包含在扩展仓库中。

| 当前问题 | 阅读位置 |
| --- | --- |
| 技能注册、async、旧 step、防递归 | [注册与结算](#content) |
| 是否发动、子技能提示、主动与触发双入口 | [发动与提示](#activation) |
| 触发时机、每回合与每轮、获得牌事件 | [事件与次数](#events) |
| 弃置、使用或打出、真正进入弃牌堆 | [弃牌堆语义](#discard) |
| 摸牌、获得、牌堆查询、放回、武将牌上的牌 | [牌的移动](#cards) |
| 选择结果、暗选与明选、拖拽排序 | [交互](#choices) |
| 伤害、回复、濒死、改目标与禁止响应 | [伤害与用牌](#damage) |
| 标记、限定技、临时技能、状态清理与封技 | [技能与状态](#state) |
| 距离、次数、目标数与手牌上限 | [mod](#mods) |
| 手牌与身份可见性、持续查看牌堆顶 | [信息可见性](#visibility) |
| 势力、名前缀、换将、立绘 | [角色展示](#presentation) |

<a id="content"></a>
## 注册与结算

- 扩展的 `package.skill.skill` 中，每个技能键直接对应技能对象，不再套一层中文技能名。角色的 `skills` 数组引用同一个键。
- 新技能用 `async content(event, trigger, player)`。`event` 是当前技能事件，`trigger` 是触发来源，`player` 是技能拥有者；原 step 中注入的 `target`、`card` 等改为相应的 `event` 属性。
- 选择事件用 `await ...forResult()` 读取结果；产生事件的效果调用按结算依赖逐个 `await`。`addSkill`、`addMark` 等同步操作不需要套用这一规则。
- 多目标效果通常按座次串行结算。需要并发时先核对官方机制，不能用 `Promise.all` 代替事件顺序。

```javascript
async content(event, trigger, player) {
	const result = await player.chooseTarget("选择一名角色", true).forResult();
	if (!result.bool) return;
	for (const target of result.targets.sortBySeat()) {
		await target.damage({ num: 1, source: player });
	}
}
```

后续读取状态、移除临时技能或解除防递归标志之前，必须等前面的 `damage`、`useCard`、`gain`、`discard`、`recover`、`gainMaxHp`、`addToExpansion` 等相关事件完成。例如先 `await player.gainMaxHp(n)`，再按新的 `maxHp` 计算回复量；循环连用牌时逐次 `await player.useCard(...)`，最后再移除监听伤害的技能。

防递归标志应覆盖整个结算链，并在异常或提前返回时清理：

```javascript
filter(event, player) {
	return !player._ext_resolving && event.player?.isIn() && event.num > 0;
},
async content(event, trigger, player) {
	player._ext_resolving = true;
	try {
		await trigger.player.damage({ num: 1, source: player });
	} finally {
		delete player._ext_resolving;
	}
},
```

`charlotte` 不负责防递归，也不意味着不能监听 `phaseBegin`。当前官方 `spyingjia_draw` 就同时使用 `charlotte: true` 与 `player: "phaseBegin"`。触发失败应检查技能注册、过滤条件和事件链。

维护旧 step 时，跨步骤变量放在 `event` 上；选择结果在下一步读取 `result`，不要把多次选择的结果混用。依赖前一事件完成的操作放到后续步骤。新 async 代码用等待事件本身保证顺序，不用 `game.delayx()` 猜测结算是否结束。

本地参考：`docs/async-guide.md`（官方 async 指南）、`docs/step-to-async-guide.md`（step 迁移指南）、`character/bingshi/skill.js`（spyingjia）。

<a id="activation"></a>
## 发动与提示

| 技能形式 | 谁决定是否发动 |
| --- | --- |
| 普通可选触发技，无 `forced`、`direct`、自定义 `cost` | 引擎根据 `prompt` 和 `check` 询问；`content` 从实际效果开始 |
| `forced: true` | 自动发动 |
| `direct: true` | 引擎直接进入内容；由内容里的可取消交互或确认处理可选性 |
| 自定义 `cost` | 引擎先运行 `cost`；通过 `event.result.bool` 等结果决定是否进入内容 |
| `enable: "phaseUse"` | 玩家主动点击技能，并通过其使用条件与选择流程 |

普通可选触发技不要在 `content` 开头再写一次「是否发动」的 `chooseBool`。`direct` 技能则不能只删掉原有确认，否则会改变其可选性。`frequent` 是自动发动偏好，不等于锁定技。

主技能通过 `group` 聚合子技能时，发动提示查的是实际触发的子技能。给可选子技能提供中文 `prompt` 或对应翻译，并设置适合设计的 `check`：

```javascript
ext_skill: { group: ["ext_skill_damage"] },
ext_skill_damage: {
	trigger: { source: "damageBegin1" },
	prompt: "是否发动「技能名」，令此伤害+1？",
	check(event, player) { return get.attitude(player, event.player) < 0; },
	async content(event, trigger, player) { trigger.num++; },
},
```

同一个技能可以同时有 `enable` 和 `trigger`；仅因双入口而增加一轮确认没有必要。只有两种入口的效果不同，才区分 `event.triggername` 或明确的父事件。

`popup: false` 抑制技能弹出显示；需要战斗记录时用 `player.logSkill(key, targets)`，避免与引擎的自动记录重复。

本地参考：`noname/library/element/content.js`（content.js 的 createTrigger）、`docs/lib-skill-format.md`（技能格式说明）。

<a id="events"></a>
## 事件与次数

`trigger` 的 `player`、`source`、`target` 角色分别匹配事件上的对应字段；`global` 监听任意角色的事件。同一个事件名称的覆盖范围由角色字段决定。

| 时机 | 常用触发名与语义 |
| --- | --- |
| 回合开始前、开始、结束后 | `phaseBefore`、`phaseBegin`、`phaseAfter`；`player` 仅自己的回合，`global` 每名角色的回合 |
| 准备、摸牌、出牌、弃牌、结束阶段 | `phaseZhunbeiBegin`、`phaseDrawBegin2`、`phaseUseBegin/After`、`phaseDiscardBegin`、`phaseJieshuBegin` |
| 游戏或新一轮开始 | `gameStart`、`roundStart`；轮不能用回合代替 |
| 使用牌 | `useCard1`、`useCard2`、`useCard`、`useCardAfter`；按改目标、改牌效果或结算后需求选点 |
| 已指定某个目标 | `useCardToPlayered`，单目标在 `trigger.target` |
| 打出牌后 | `respondAfter` |
| 伤害修改或防止 | `damageBegin1` 修改伤害，`damageBegin4` 是最后的防伤时点 |
| 伤害结算后 | `damageEnd`、`damageSource`，按受伤者或来源选择角色字段 |
| 濒死过程 | `dyingBegin`、`dying`、`dyingAfter`；进入与完整结算后不同 |
| 获得或失去牌后 | `gainAfter`、`loseAfter`、`loseAsyncAfter`；异步事件按角色读取实际得失 |
| 牌进入弃牌堆 | `cardsDiscardAfter`；还需结合 lose 路径，见下一节 |
| 死亡后 | `dieAfter`；需要归因时可用 `global` 并检查 `event.source` |

多触发技能在 `filter(event, player, name)` 用第三个参数 `name` 区分时点，在 `content` 用 `event.triggername`。`event.name` 是事件本身的名字，不等于触发名；`damageBegin` 不自动覆盖 `damageBegin1/2/3/4`。

- 触发技的 `usable: N` 按每个回合计数，每名角色的新回合开始都会更新各玩家统计；不等于每轮。普通可选触发被拒绝时不计入已发动次数。
- 「每回合每名目标一次」需要额外保存目标集合，在 `global: "phaseBegin"` 清空；只有真正发动后才记录目标。需优先重置时使用 `firstDo: true`。
- 「每轮」计数在 `roundStart` 重置。「每局」计数按设计使用标记或持久计数，不能套用 `usable`。
- 「回合结束」与「结束阶段开始」有区别。需要完整回合结束后的清理用 `phaseAfter`，不能直接用 `phaseJieshuBegin` 替代。
- 检查别人新获得的牌时，按实际得牌事件读取：单人 `gainAfter` 的 `event.player`/`event.cards`，异步路径的 `event.getg(current)`；「获得手牌」还要验证牌的区域。`getIndex` 的结果通过 `event.indexedData` 传入内容，不应假定自动变成 `event.targets[0]`。

本地参考：`docs/game-event/trigger.md`（触发机制文档）、`noname/library/element/gameEvent.js`（gameEvent.js 的 trigger）、`noname/library/element/content.js`（content.js 的 phase/createTrigger）。

<a id="discard"></a>
## 弃牌堆语义

先区分四种要求：使用或打出、失去牌、弃置牌、牌实际进入弃牌堆。它们不能共用一个模糊过滤条件。

### 因使用或打出而进入弃牌堆

监听 `cardsDiscardAfter`，沿 `orderingDiscard` 的 `relatedEvent` 或父事件回到 `useCard`/`respond`，再检查使用者、逻辑牌和本次实际入堆的牌：

```javascript
getCards(event, player) {
	const ordering = event.getParent();
	if (ordering?.name !== "orderingDiscard") return [];
	const origin = ordering.relatedEvent || ordering.getParent();
	if (!origin || !["useCard", "respond"].includes(origin.name)) return [];
	if (origin.player !== player || !origin.card) return [];
	return event.getd?.() || [];
},
```

如果设计限定【杀】或【闪】，再按 `get.name(origin.card, player)` 判断逻辑牌，并按描述筛选实体牌。不能用实体牌本来的名字代替转化后的用牌身份。

`useCard`/`respond` 触发时牌仍在结算，可能被别的技能截走，不能证明已经入堆。实体牌使用时先去处理区，因此 `loseAfter` 的目标位置也不能直接按弃牌堆过滤。

### 任意牌进入弃牌堆

通常需要联合 `loseAfter`、`loseAsyncAfter`、`cardsDiscardAfter`。lose 路径核对 `event.getlx !== false` 与 `event.position === ui.discardPile`；cardsDiscard 路径读取实际入堆牌。按事件聚合方式核对得失，避免重复统计。

当前官方 `tianren` 的 cardsDiscard 分支会排除 `relatedEvent.name === "useCard"`。这是该技能的统计范围；如果需求确实包含使用牌入堆，就不能照抄这个排除条件。要求牌结算后仍在弃牌堆时，再用 `get.position(card, true) === "d"` 检查实时位置。

### 「当你弃置你的牌时」

`loseAfter` 中用 `event.type === "discard"` 与 `event.getlx !== false` 区分弃置与使用、装备、放到武将牌等失牌。按此表述，通常检查 `event.hs`（手牌）与 `event.es`（装备），判定区 `event.js` 不自动包含在内；特殊设计先确认含义。

```javascript
filter(event, player) {
	if (event.type !== "discard" || event.getlx === false) return false;
	const cards = [...(event.hs || []), ...(event.es || [])];
	return cards.some(card => get.position(card, true) === "d");
},
```

只有要求实际入堆时才加位置检查；「弃置」本身与「弃置后仍在弃牌堆」也有区别。牌名、花色、类型受转化影响时，按拥有者读取 `get.name(card, owner)`、`get.type(card, null, owner)`，不要无条件传 `false`。

本地参考：`character/xianding/skill.js`（dcsbchuanyu_give/tianren）、`character/huicui/skill.js`（dczhubi/dcliuzhuan）、`noname/library/element/content.js`（content.js 的 orderingDiscard/lose）。

<a id="cards"></a>
## 牌的移动

| API | 语义与边界 |
| --- | --- |
| `player.draw(n)` | 摸牌，会走获得牌事件 |
| `player.gain(cards, source, animation)` | 获得指定牌；动画可用 `draw`、`gain2`、`give`、`giveAuto`，不改变其事件本质 |
| `player.directgain(cards)` | 直接给牌，不产生普通的 `gainAfter`；仅用于设计要求静默得牌的效果 |
| `player.discard(cards)` | 弃置角色的牌，走角色失牌与弃牌流程 |
| `player.modedDiscard(cards)` | 先考虑 `canBeDiscarded`/`cardDiscardable` 等保护，再执行弃牌；仍会产生失牌和弃牌事件 |
| `game.cardsDiscard(cards)` | 将指定牌移入弃牌堆；不能替代角色的弃牌流程 |
| `player.getCards("h"/"e"/"he"/"hej")`、`countCards(...)` | 手牌、装备、手装、手装判的牌或数量 |
| `get.cards(n)` | 取出牌堆顶的牌；不是持续查看接口 |
| `get.cardPile(pattern, position, start)` | 查找并返回匹配牌，不会自动从牌堆移除；后续 `gain` 等事件才移动它 |
| `game.cardsGotoPile(cards, [key, value], insertFn)` | 将牌放回牌堆；函数返回 `insertBefore` 的参考节点，`null` 表示放到底部 |

`get.cardPile` 的 `pattern` 可为牌名或过滤函数；`position` 指定 `"cardPile"`、`"discardPile"` 或 `"field"`，`start` 为 `"top"`、`"bottom"`、`"random"`。严格要求从牌堆获得时明确传 `"cardPile"`；未指定区域时搜索范围不同。无匹配时返回 `null`。

批量查找但尚未移动牌时，过滤已选择的牌，避免反复选到同一张：

```javascript
const cards = [];
for (const suit of ["spade", "heart", "club", "diamond"]) {
	const card = get.cardPile(card => get.suit(card, false) === suit && !cards.includes(card), "cardPile", "random");
	if (card) cards.push(card);
}
if (cards.length) await player.gain(cards, "draw");
```

`ui.cardPile`、`ui.discardPile` 是 DOM 容器；读取其 `childNodes`，不能调用数组的 `push`、`unshift`、`splice`。按选择顺序放到牌堆顶时，需要反向插入：

```javascript
const result = await player.chooseToMove(true).set("list", [["牌堆顶", cards]]).forResult();
const top = (result.moved?.[0] || cards).slice();
await game.cardsGotoPile(top.reverse(), () => ui.cardPile.firstChild);
```

武将牌上的牌用 expansion API，先为返回的事件加标签，再等待移动完成：

```javascript
const next = target.addToExpansion(cards, target, "give");
next.gaintag.add("ext_skill");
await next;
const stored = target.getExpansions("ext_skill");
```

显示可用 `intro: { markcount: "expansion", content: "expansion" }`。相关 lose 事件是 `type: "loseToExpansion"`、`getlx: false`；排除放置事件时检查类型。单靠 `getlx: false` 无法区分放置、装备和判定，也不要从放置前的手牌标签推断 expansion 来源。

本地参考：`noname/library/element/player.js`（player.js 的 gain/directgain/discard/modedDiscard/addToExpansion）、`noname/get/index.js`（get/index.js 的 cards/cardPile）、`noname/game/index.js`（game/index.js 的 cardsGotoPile）、`noname/library/element/content.js`（content.js 的 addToExpansion）。

<a id="choices"></a>
## 交互

每次选择分别 `await ...forResult()`；结果字段由选择类型决定，不是所有结果都有 `bool`。

| API | 常用结果与注意点 |
| --- | --- |
| `chooseBool(prompt)` | `bool`；普通可选触发的发动确认通常已由引擎处理 |
| `chooseControl("a", "b")` | `control`、`index`；不要用缺失的 `bool` 判断选项是否有效 |
| `chooseTarget([min, max], prompt, filterOrBool)` | `bool`、`targets`；`true` 可表示必须选择 |
| `chooseUseTarget({ name: "sha" }, false, "nodistance")` | 引导使用虚拟牌并忽略距离；不自动取消其他使用条件 |
| `choosePlayerCard(target, "he", true, [min, max])` | `bool`、`cards`；默认暗选他人手牌，装备明选；可见性还受 `visible`、看手牌技能等影响 |
| `chooseButton([prompt, target.getCards("h")], [min, max])` | `bool`、`links`；直接列实体牌是明牌选择，先确认设计允许查看 |
| `gainPlayerCard(target, "he", [1, n], true)` | 选择后直接获得牌，结果读 `cards`；手牌通常暗选，`true` 是强制选择，不是明牌参数 |
| `chooseToMove(true).set("list", [["区域1", cards], ["区域2"]])` | `bool`、`moved`；`moved[i]` 对应第 i 个区域的有序牌数组 |
| `ui.create.characterDialog("heightset", filterFn)` | 创建含分组、搜索的选将对话框；`filterFn` 返回 `true` 表示排除该角色 |

`.set("prompt", ...)`、`.set("choiceList", ...)`、`.set("ai", fn)` 设置提示、选项说明和 AI；`chooseToMove` 的排序 AI 使用 `processAI`。强制、可取消与 AI 决策是不同设置。

取他人的牌前检查 `target.countGainableCards(player, "he")` 等合法性，不能仅凭总牌数假定全部可获取。明选手牌的 `chooseButton` 只做选择，后续仍需按设计 `gain`、`discard` 等。

本地参考：`noname/library/element/player.js`（player.js 的 choose*/gainPlayerCard）、`noname/library/element/content.js`（content.js 的选择流程）、`noname/ui/create/index.js`（ui/create 的 characterDialog）。

<a id="damage"></a>
## 伤害与用牌

| API/字段 | 语义 |
| --- | --- |
| `target.damage({ num, nature, source })` | 明确指定伤害量、属性、来源；位置参数也按实参类型解析，玩家对象表示来源 |
| `target.damage({ num: 1, nosource: true })` | 当前引擎支持明确无来源；省略来源参数仍可能继承当前事件的来源 |
| `target.loseHp(n)` | 失去体力，不产生 damage 事件，体力可降到零或负数并进入濒死 |
| `target.recover(n)`、`gainMaxHp(n)`、`loseMaxHp(n)` | 分别回复体力、增加或减少体力上限；按状态依赖等待事件 |
| `player.changeHujia(n, type, limit)` | 改变护甲；`limit: true` 表示上限 5，不能直接改 `player.hujia` 代替事件 |
| `target.die()` | 直接进入死亡流程，不是普通扣血或请求救援 |
| `trigger.num += n` | 在对应伤害时点修改伤害；需求排除自伤时检查 `event.player !== player` |
| `trigger.cancel()` | 取消触发事件；彻底防伤通常在 `damageBegin4` 调用，不能用设置 `num = 0` 混同取消 |
| `trigger.baseDamage += n` | 在 `useCard` 修改牌的基础效果值；使用【杀】或【桃】时可分别增加伤害或回复 |

伤害/回复事件未显式指定数量时会读取当前事件的 `baseDamage`、`extraDamage`。用牌事件会把 `baseDamage` 传给各目标的牌效果，所以【桃】也受到它影响；显式传数量的特殊牌效果需另行检查。

「对指定目标的下一次伤害+N」可在来源技能的存储中按 `target.playerid` 记录加成，在 `source: "damageBegin1"` 对上目标后增加 `trigger.num`，按设计消耗记录。不能在用牌时假定一定造成伤害，也不能把所有后续伤害都无条件加成。

禁止响应使用用牌事件的 `directHit` 集合：在 `useCard` 给 `trigger.directHit` 添加角色；在 `useCardToPlayered` 给 `trigger.getParent().directHit` 添加当前 `trigger.target`。分别确认需求是仅目标不能响应，还是其他角色也不能无懈。

改目标通常在 `useCard2`：通过 `lib.filter.targetEnabled2(card, player, target)` 和设计要求选出合法候选，原地更新 `trigger.targets`。距离、目标数量等额外限制按需求核对，不能只因通过一个过滤器就认为全部合法。

需要当前牌/技能完整结算后结束出牌阶段时，在适当的 `useCardAfter`/`useSkillAfter` 找到父 `phaseUse` 事件并设置 `skipped = true`；这不会中断当前牌的结算。

进入 `dying` 后，引擎在救援流程中检查 `hp > 0`。等待回复后体力大于零才自动脱离；原本为负体力时 `recover(1)` 不保证脱离。要求「回复至 1」时，按实际体力计算或核对 `recoverTo(1)`，不能把它解释成「回复 1 点」。`dyingAfter` 是流程结束，角色可能已死亡，后续效果需检查 `isIn()`。

本地参考：`noname/library/element/player.js`（player.js 的 damage/recover/loseHp/changeHujia）、`noname/library/element/content.js`（content.js 的 useCard/damage/dying）、`character/extra/skill.js`（relonghun_num）、`character/shenhua/skill.js`（retianxiang）。

<a id="state"></a>
## 技能与状态

### 标记与技能次数

- `addMark(key, n)`、`removeMark(key, n)`、`countMark(key)`、`clearMark(key)` 操作计数。要显示标记，注册同键的技能与 `intro`；纯显示技能不必给目标附加触发效果。
- 常见显示为 `mark: true`、`marktext: "标"`、`intro: { content: "mark" }`。显示键与实际计数键一致。
- `addSkill`、`removeSkill`、`hasSkill` 管理技能。纯标记上的效果可以由来源角色的全局子技能处理，也可以作为目标自身的状态技能；按来源死亡后是否继续有效等设计选择，不能一概强制用其中一种。
- 官方限定技用 `limited: true` 配合发动后的 `awakenSkill(key)`；`restoreSkill(key)` 恢复。`refreshSkill` 还会重置部分次数、临时禁用和附属状态，使用前核对影响范围。
- 可补充次数的自制大招按 [作者约定](extension-conventions.md#设计语义) 使用标记/数值，不能因「每局一次」就自动改为限定技。

### 临时技能到期

`addTempSkill(key, expire)` 的字符串/数组到期参数会转成 `global`。对象参数的非 global 角色必须满足技能拥有者等于该到期事件的对应角色。

| expire | 实际到期边界 |
| --- | --- |
| `{ player: "phaseUseAfter" }` | 拥有者的出牌阶段结束 |
| `{ player: "phaseBegin" }` | 下次匹配到拥有者回合开始 |
| `{ player: "phaseAfter" }` | 下次匹配到拥有者回合结束 |
| `{ global: "phaseAfter" }` 或 `"phaseAfter"` | 任意角色的下次回合结束 |
| 省略 | `{ global: ["phaseAfter", "phaseBeforeStart"] }` |

在自己的当前回合内获得 `{ player: "phaseAfter" }` 技能，会在这个回合结束时到期。设计若明确要求完整持续到下一个自己的回合结束，需要额外跨过下一次自己的回合开始，不能仅换一段描述。

目标身上的状态若要在施加者下回合开始清理，可以给施加者添加到期技能，在其 `onremove` 中清理记录的目标。多来源状态必须按来源记录并只清理属于该来源的部分，不能扫掉其他来源同名效果；同时处理目标或来源死亡等设计边界。

### 封技与叠加状态

`addSkillBlocker(key)`/`removeSkillBlocker(key)` 配对，并通过 `init`、`onremove` 注册与清理。`skillBlocker` 的返回值决定哪个技能失效。

- 只封非锁定技：按官方形式排除 `info.charlotte`、`info.persevereSkill`，再判断 `!get.is.locked(skill, player)`。
- 连锁定技也封：按设计放宽锁定条件，仍保留状态自身、清理技能及必要的保护技能，避免状态永远无法解除。
- 叠加状态的总标记数、每回合已触发标志和临时封技是不同状态。按各自生命周期重置；每次消耗一层，在零层时清理技能及存储，避免上一回合的封技残留。

本地参考：`noname/library/element/player.js`（player.js 的 addMark/addTempSkill/awakenSkill/refreshSkill）、`noname/library/element/gameEvent.js`（gameEvent.js 的到期检查）、`character/tw/skill.js`（tw 技能包的 fengyin 子技能）。

<a id="mods"></a>
## mod

| mod | 意图与返回值 |
| --- | --- |
| `selectTarget(card, player, range)` | 原地修改目标数量区间；`range[1] = Infinity` 增加上限，需保留不适用牌的特殊目标语义 |
| `targetInRange(card, player, target)` | 返回 `true` 放宽距离限制；不自动绕过所有目标合法性 |
| `globalFrom(player, target, distance)` | 返回新的距离，例如 `distance - x` |
| `cardUsable(card, player, num)` | 返回新的使用次数上限，例如【杀】的 `num + x` |
| `cardnature(card, player)` | 修改牌属性，例如【杀】返回 `"fire"` |
| `maxHandcard(player, num)` | 返回新的手牌上限，适合固定增加 N |
| `ignoredHandcard(card, player)` | 对满足条件的具体手牌返回 `true`，该牌不计入弃牌阶段的手牌数量 |
| `cardDiscardable(card, player, name)` | 返回 `false` 禁止弃置；仅针对弃牌阶段时判断 `name === "phaseDiscard"` |

「这张牌不计入上限」和「上限加一」的实现语义不同。`ignoredHandcard` 仍依赖该牌在检查时满足条件；没有标签的牌不会凭空获得豁免。禁止弃置也不同于不计入数量。

阶段 buff 把数值存在所属技能的 storage，并给承载 mod 的技能明确到期时间、清理存储。伤害加成不是上述 mod，用相应伤害触发点处理。

`group` 子技能的 mod 会通过 `getModableSkills` 与 `expandSkills` 收集；内联 `subSkill` 注册后也保留 mod。不必仅为让 mod 生效而移到主技能，但技能必须确实注册并属于当前展开的技能集合。

本地参考：`noname/library/element/player.js`（player.js 的 getModableSkills/needsToDiscard/getHandcardLimit）、`noname/game/index.js`（game/index.js 的 checkMod/expandSkills/finishSkill）。

<a id="visibility"></a>
## 信息可见性

持续查看他人手牌可参考官方 `dcjinjing` 的 `ai.viewHandcard` 技能标签与 `skillTagFilter(player, tag, arg)`；`arg` 是被查看的角色。这是引擎认可的可见性机制，不等于主动把牌展示给所有人。

私下查看身份或暗将时，按设计读取 `identity`、`name1/name2`、`isUnseen`，只给有权限的查看者展示内容；`setIdentity`、`showCharacter` 属于公开操作。联机时还需核对信息存储在哪端及对话框发送范围。

持续查看牌堆顶参考 `smyyingshi` 的可点击标记：本地只读 `Array.from(ui.cardPile.childNodes).slice(0, n)`，联机走其 `game.requestSkillData` 模式。`get.cards` 是取牌接口，不能用它替代持续查看。

查询牌时，`get.name/suit/color/number(card, owner)`、`get.type(card, null, owner)` 的拥有者参数影响技能修正后的结果；明确读取牌本身属性时才用 `false`。`get.is.damageCard(card)` 用于检查伤害类牌。

`game.filterPlayer`、`hasPlayer`、`countPlayer` 处理当前角色集合；`get.translation` 转显示名，`get.attitude`、`get.effect` 用于 AI 判断。技能设计依赖具体身份、存活或在场状态时仍需相应检查。

本地参考：`character/collab/skill.js`（dcjinjing）、`character/yingbian/skill.js`（smyyingshi）、`noname/get/index.js`（get/index.js）。

<a id="presentation"></a>
## 角色展示

- 新势力用 `game.addGroup(id, short, longName, { color })`，是位置参数；角色 `group` 引用其 ID。复用内置势力前查当前注册，避免同义重复。
- 彩色名前缀由角色翻译的 `${id}_prefix` 与 `lib.namePrefix` 决定，独立于势力颜色。完整显示名必须按前缀顺序开头，多段前缀用 `"界|神"` 这类字符串。
- 自定义前缀通过 `lib.namePrefix.set(prefix, { color, nature })` 注册，可在 `precontent` 处理；已有前缀不重复定义。
- `player.reinit(from, to)` 更换武将并处理技能，但不能假定同时改变势力。若设计要求变更势力，核对 `changeGroup` 或官方换将流程，兼顾双将与联机同步。
- 调座位用 `game.swapSeat(p1, p2, prompt, behind)`，不能直接重排 `game.players`。`behind: true` 的具体插入方向按官方实现核对。
- 普通 GIF 可直接用 `character.img` 引用真实多帧文件，并加入 `files.character`；无需注册 Spine 动态皮肤。已选的 `lib.config.skin[角色ID]` 可能覆盖默认立绘，检查换肤设置与重启后的显示。

本地参考：`noname/game/index.js`（game/index.js 的 addGroup/swapSeat）、`noname/get/index.js`（get/index.js 的 slimNameHorizontal/prefixSpan）、`noname/library/element/player.js`（player.js 的 reinit/changeGroup）。
