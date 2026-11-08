const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const source = readFileSync(path.join(__dirname, "../破界异志/extension.js"), "utf8");
const start = source.indexOf('            "re_dczhifou": {');
const end = source.indexOf('            "reshen_tuoyu": {', start);
assert.ok(start >= 0 && end > start, "应从实际扩展源码中提取知否");
const skill = vm.runInNewContext(`({${source.slice(start, end)}})`, {
	get: { prompt: value => value, cnNumber: String, translation: String },
}).re_dczhifou;

function runSkill(options, { self = true, cancel = false, rejectAt } = {}) {
	const trace = [];
	const controls = [...options];
	const card = {};
	const choice = result => ({
		set() { return this; },
		async forResult() { return result; },
	});
	const player = {
		getHistory: () => Array.from({ length: Math.max(0, options.length - 1) }, () => ({ skill: "re_dczhifou" })),
		getExpansions: () => [card, card, card],
		countCards: () => 3,
		countDiscardableCards: () => 3,
		logSkill() {},
		line() {},
		chooseButton: () => choice(cancel ? { bool: false } : { bool: true, links: [card] }),
		chooseTarget() {
			assert.deepEqual(trace, ["移去翼"], "选择目标前必须完成移去翼的事件");
			return choice({ bool: true, targets: [target] });
		},
		chooseControl: () => choice({ control: controls.shift() || "结束" }),
		choosePlayerCard: () => choice({ bool: true, cards: [card] }),
		loseToDiscardpile: () => effect("移去翼"),
		addToExpansion: () => effect("放置翼"),
		discard: () => effect("弃牌"),
		loseHp: () => effect("失去体力"),
	};
	const target = self ? player : {
		countCards: () => 3,
		discard: player.discard,
		loseHp: player.loseHp,
	};
	// 模拟引擎的可等待事件：只有 await 后才结算，并检查整个结算期间的保护标志。
	function effect(name) {
		const gaintag = new Set();
		return {
			gaintag,
			then(resolve, reject) {
				return Promise.resolve().then(async () => {
					assert.equal(player._re_dczhifou_ing, true, `${name}开始时保护应有效`);
					if (name === "放置翼") assert.ok(gaintag.has("re_dclingxi"), "放置结算前必须添加翼标签");
					trace.push(name);
					await Promise.resolve();
					assert.equal(player._re_dczhifou_ing, true, `${name}结束时保护应有效`);
					assert.equal(skill.filter({ name: "lose", type: "discard" }, player), false, "失牌结算期间不得递归发动");
					if (rejectAt === name) throw new Error(`模拟异常：${name}`);
				}).then(resolve, reject);
			},
		};
	}
	return { player, trace, run: () => skill.content({}, {}, player) };
}

for (const [name, options, self, expected] of [
	["弃自己的牌", ["弃"], true, ["移去翼", "弃牌"]],
	["弃他人的牌", ["弃"], false, ["移去翼", "弃牌"]],
	["只放置翼", ["翼"], true, ["移去翼", "放置翼"]],
	["只失去体力", ["体力"], true, ["移去翼", "失去体力"]],
	["多选项串行", ["翼", "弃", "体力"], true, ["移去翼", "放置翼", "弃牌", "失去体力"]],
	["不执行选项", [], true, ["移去翼"]],
]) {
	test(name, async () => {
		const harness = runSkill(options, { self });
		await harness.run();
		assert.deepEqual(harness.trace, expected);
		assert.equal(harness.player._re_dczhifou_ing, false);
		assert.equal(skill.filter({ name: "lose", type: "discard" }, harness.player), true, "完成后允许后续失牌正常触发");
	});
}

test("取消发动也清除保护标志", async () => {
	const harness = runSkill([], { cancel: true });
	await harness.run();
	assert.deepEqual(harness.trace, []);
	assert.equal(harness.player._re_dczhifou_ing, false);
});

for (const [rejectAt, option] of [["移去翼", "弃"], ["放置翼", "翼"], ["弃牌", "弃"], ["失去体力", "体力"]]) {
	test(`${rejectAt}异常后清除保护标志`, async () => {
		const harness = runSkill([option], { rejectAt });
		await assert.rejects(harness.run(), /模拟异常/);
		assert.equal(harness.player._re_dczhifou_ing, false);
	});
}
