import { lib, game, ui, get, ai, _status } from "noname";
export const type = "extension";
export default function(){
	return {name:"扩展1",editable:true,connect:false,arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
},precontent:function(){
},help:{},config:{},package:{
    character: {
        character: {
            "mozarong": {
                sex: "male",
                group: "devil",
                hp: 4,
                maxHp: 4,
                hujia: 0,
                skills: ["ext1_mocansi","ext1_mofozong"],
                img: "extension/扩展1/mozarong.gif",
                dieAudios: ["ext:扩展1/audio/die/mozarong.mp3"],
            },
            "re_caoxian": {
                sex: "female",
                group: "wei",
                hp: 4,
                maxHp: 4,
                skills: ["re_dclingxi","re_dczhifou"],
                img: "extension/扩展1/re_caoxian.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/re_caoxian.mp3"],
            },
            "reshen_dengai": {
                sex: "male",
                group: "shen",
                hp: 4,
                maxHp: 4,
                hujia: 0,
                skills: ["reshen_tuoyu","reshen_xianjin","reshen_qijing"],
                img: "extension/扩展1/reshen_dengai.jpg",
                dieAudios: ["ext:扩展1/audio/die/reshen_dengai.mp3"],
            },
        },
        translate: {
            "mozarong": "魔笮融",
            "mozarong_prefix": "魔",
            "re_caoxian": "界曹宪",
            "re_caoxian_prefix": "界",
            "reshen_dengai": "界神邓艾",
            "reshen_dengai_prefix": "界|神",
            "扩展1": "扩展1",
        },
    },
    card: {
        card: {
        },
        translate: {
        },
        list: [],
    },
    skill: {
        skill: {
            "ext1_mocansi": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                check: function(event, player){ 
                    return game.hasPlayer(target => target != player); 
                },
                prompt: "魔残肆：你可以回复1点体力",
                async content(event, trigger, player) {
                    await player.recover();
                    if (!game.hasPlayer(current => current != player)) return;
                    var result = await player.chooseBool("是否继续发动【魔残肆】，令一名其他角色回复1点体力并视为对其使用三张虚拟牌？").set("ai", function() {
                        return game.hasPlayer(function(target) {
                            return target != player && get.attitude(player, target) < 0;
                        });
                    }).forResult();
                    if (!result.bool) return;
                    var result2 = await player.chooseTarget("魔残肆：选择一名其他角色", true, lib.filter.notMe).set("ai", target => {
                        var player = _status.event.player;
                        var list = ["recover", "sha", "juedou", "huogong"];
                        return list.reduce((p, c) => p + get.effect(target, { name: c }, player, player), 0);
                    }).forResult();
                    if (!result2.bool) return;
                    var target = result2.targets[0];
                    event.target = target;
                    var count = 0;
                    player.line(target, "fire");
                    await target.recover();
                    player.addTempSkill("ext1_mocansi_draw");
                    try {
                        while (count < 3 && target.isIn()) {
                            var result3 = await player.chooseControl("杀", "决斗", "火攻").set("prompt", "魔残肆：选择第" + (count + 1) + "张虚拟牌").set("choiceList", [
                                "视为对其使用一张【杀】",
                                "视为对其使用一张【决斗】",
                                "视为对其使用一张【火攻】"
                            ]).set("ai", function() {
                                var player = _status.event.player;
                                var target = _status.event.getParent().target;
                                var map = { "杀": "sha", "决斗": "juedou", "火攻": "huogong" };
                                var controls = _status.event.controls;
                                var choice = controls[0];
                                var max = -Infinity;
                                for (var i = 0; i < controls.length; i++) {
                                    var name = map[controls[i]];
                                    var eff = get.effect(target, { name: name, isCard: true }, player, player);
                                    if (eff > max) {
                                        max = eff;
                                        choice = controls[i];
                                    }
                                }
                                return choice;
                            }).forResult();
                            var map = { "杀": "sha", "决斗": "juedou", "火攻": "huogong" };
                            var card = { name: map[result3.control], isCard: true };
                            if (target.isIn() && player.canUse(card, target, false)) {
                                await player.useCard(card, target, false);
                            }
                            count++;
                        }
                    } finally {
                        player.removeSkill("ext1_mocansi_draw");
                    }
                },
                subSkill: {
                    draw: {
                        audio: "dccansi",
                        trigger: {
                            global: "damageEnd",
                        },
                        forced: true,
                        charlotte: true,
                        onremove: true,
                        filter(event, player) {
                            return event.source == player && event.num > 0;
                        },
                        async content(event, trigger, player) {
                            await player.draw(trigger.num * 2);
                        },
                        sub: true,
                        sourceSkill: "ext1_mocansi",
                        "_priority": 0,
                        "skill_id": "ext1_mocansi_draw",
                    },
                },
                ai: {
                    threaten: 5,
                    expose: 0.3,
                    result: {
                        player: function(player){ 
                            if (!game.hasPlayer(target => target != player)) {return 0;} 
                            var eff = 0; 
                            for (var target of game.players) { 
                                if (target == player) {continue;} 
                                var base = target.hp < 3 ? 1 : 0.5; 
                                eff = Math.max(eff, base * 3); // 粗略估计 
                            } 
                            return eff > 1 ? 1 : 0; 
                        },
                    },
                },
                "skill_id": "ext1_mocansi",
                "_priority": 0,
            },
            "ext1_mofozong": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: ["gainAfter","loseAsyncAfter"],
                },
                forced: true,
                direct: true,
                getIndex: function(event, player) {
                    return game.filterPlayer(function(current) {
                        var cards;
                        if (current == player || !current.isIn()) return false;
                        if (event.name == "gain") {
                            if (event.player != current) return false;
                            cards = event.cards;
                        } else {
                            cards = event.getg && event.getg(current);
                        }
                        return cards && cards.length && current.countCards("h") > 7;
                    }).sortBySeat();
                },
                filter: function(event, player, name, target) {
                    return target && target.isIn() && target != player && target.countCards("h") > 7;
                },
                intro: {
                    markcount: "expansion",
                    content: "expansion",
                },
                async content(event, trigger, player) {
                    var target = event.targets && event.targets.length ? event.targets[0] : trigger.player;
                    if (!target || !target.isIn() || target == player || target.countCards("h") <= 7) return;
                    var num = target.countCards("h") - 7;
                    var cardResult = await target.chooseCard("魔佛宗：将" + get.cnNumber(num) + "张手牌置于武将牌上", true, num).set("ai", function(card) {
                        return -get.value(card);
                    }).forResult();
                    if (!cardResult.bool || !cardResult.cards || !cardResult.cards.length) return;
                    player.logSkill("ext1_mofozong", target);
                    player.line(target);
                    var expansionEvent = target.addToExpansion(cardResult.cards, target, "give");
                    expansionEvent.gaintag.add("ext1_mofozong");
                    await expansionEvent;
                    if (!target.isIn() || target.getExpansions("ext1_mofozong").length < 7) return;
                    var choiceResult = await player.chooseControl("获得所有牌并令其回复1点体力", "令其失去1点体力").set("prompt", "魔佛宗：选择一项").set("choiceList", [
                        "获得" + get.translation(target) + "武将牌上的所有“魔佛宗”牌并令其回复1点体力",
                        "令" + get.translation(target) + "失去1点体力"
                    ]).set("target", target).set("ai", function() {
                        var player = _status.event.player;
                        var target = _status.event.target;
                        if (get.attitude(player, target) > 0) return "获得所有牌并令其回复1点体力";
                        return "令其失去1点体力";
                    }).forResult();
                    var cards = target.getExpansions("ext1_mofozong");
                    if (choiceResult.control == "获得所有牌并令其回复1点体力") {
                        if (cards.length) {
                            await player.gain(cards, target, "give");
                        }
                        if (target.isIn()) {
                            await target.recover(player);
                        }
                    } else if (target.isIn()) {
                        await target.loseHp();
                    }
                },
                ai: {
                    threaten: 3,
                },
                "skill_id": "ext1_mofozong",
                "_priority": 0,
            },
            "re_dclingxi": {
                trigger: {
                    player: ["phaseUseBegin","phaseUseEnd"],
                    global: "roundStart",
                },
                direct: true,
                filter: function(event, player) {
                    return player.countCards("he") && player.maxHp > 0;
                },
                async content(event, trigger, player) {
                    var num = player.maxHp;
                    var result = await player
                        .chooseCard("he", [1, num], get.prompt("re_dclingxi"), "将至多" + get.cnNumber(num) + "张牌称为「翼」置于武将牌上")
                        .set("complexCard", true)
                        .set("ai", card => 8 - get.useful(card))
                        .forResult();
                    if (result.bool) {
                        player.logSkill("re_dclingxi");
                        player.addToExpansion(result.cards, player, "give").gaintag.add("re_dclingxi");
                    }
                },
                group: "re_dclingxi_effect",
                marktext: "翼",
                intro: {
                    content: "expansion",
                    markcount: "expansion",
                },
                onremove: function(player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                "skill_id": "re_dclingxi",
                "_priority": 0,
            },
            "re_dclingxi_effect": {
                trigger: {
                    player: "loseAfter",
                    global: ["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter"],
                },
                forced: true,
                filter: function(event, player) {
                    var num = 2 * player.getExpansions("re_dclingxi").reduce(function(list, card) {
                        return list.add(get.suit(card, false));
                    }, []).length;
                    num -= player.countCards("h");
                    if (!num) return false;
                    if (event.name == "lose" && event.getlx !== false) {
                        for (var i in event.gaintag_map) {
                            if (event.gaintag_map[i].includes("re_dclingxi")) return true;
                        }
                        return false;
                    }
                    return game.getGlobalHistory("cardMove", function(evt) {
                        if (evt.name != "lose" || event != evt.getParent()) return false;
                        for (var i in evt.gaintag_map) {
                            if (evt.gaintag_map[i].includes("re_dclingxi") && evt.player == player) return true;
                        }
                        return false;
                    }).length;
                },
                async content(event, trigger, player) {
                    var num = 2 * player.getExpansions("re_dclingxi").reduce(function(list, card) {
                        return list.add(get.suit(card, false));
                    }, []).length;
                    num -= player.countCards("h");
                    if (num > 0) {
                        await player.draw(num);
                    } else {
                        await player.chooseToDiscard("h", -num, true, "allowChooseAll");
                    }
                },
                "skill_id": "re_dclingxi_effect",
                "_priority": 0,
            },
            "re_dczhifou": {
                trigger: {
                    player: "loseAfter",
                },
                direct: true,
                filter: function(event, player) {
                    if (player._re_dczhifou_ing) return false;
                    // 排除「灵犀」主动放翼（以及知否选项①把牌置为翼）造成的失去牌：
                    // addToExpansion 产生的 lose 事件 type 恒为 "loseToExpansion"、getlx===false
                    // （content.js:10770 源码实证）。放翼失去的是手牌，gaintag_map 不含
                    // re_dclingxi，故不能用 gaintag 判断，改用 type 精确匹配。
                    // 装备(type:equip)/判定(type:addJudge) 不会误伤。
                    if (event.name == "lose" && event.type == "loseToExpansion") return false;
                    var num = player.getHistory("useSkill", function(evt) {
                        return evt.skill == "re_dczhifou";
                    }).length + 1;
                    return player.getExpansions("re_dclingxi").length >= num;
                },
                async content(event, trigger, player) {
                    player._re_dczhifou_ing = true;
                    try {
                        var num = player.getHistory("useSkill", function(evt) {
                            return evt.skill == "re_dczhifou";
                        }).length + 1;
                        var expansions = player.getExpansions("re_dclingxi");
                        var result = await player
                            .chooseButton(
                                ["###" + get.prompt("re_dczhifou") + "###移去至少" + get.cnNumber(num) + "张武将牌上的「翼」", expansions],
                                [num, expansions.length],
                                "allowChooseAll"
                            )
                            .set("ai", button => 1)
                            .forResult();
                        if (!result.bool) return;
                        player.logSkill("re_dczhifou");
                        await player.loseToDiscardpile(result.links);

                        var result2 = await player
                            .chooseTarget("知否：选择一名角色", true)
                            .set("ai", target => (get.attitude(player, target) < 0 ? 1 : 0))
                            .forResult();
                        if (!result2.bool) return;
                        var target = result2.targets[0];
                        player.line(target, "thunder");

                        var available = [];
                        if (target.countCards("he")) available.push("翼");
                        if (target == player ? target.countDiscardableCards(target, "he") : target.countCards("he")) available.push("弃");
                        available.push("体力");
                        var maxChoice = Math.min(num, available.length);
                        if (maxChoice <= 0) return;

                        var optDesc = {
                            "翼": "将其一张牌称为「翼」置于你的武将牌上",
                            "弃": "弃置其至多两张牌",
                            "体力": "令其失去1点体力",
                        };
                        var chosen = [];
                        while (chosen.length < maxChoice) {
                            var remaining = available.filter(o => !chosen.includes(o));
                            if (!remaining.length) break;
                            var ctrls = remaining.concat(["结束"]);
                            var r = await player
                                .chooseControl(ctrls)
                                .set("prompt", "知否：已选" + chosen.length + "/" + get.cnNumber(num) + "项，选择下一项或结束")
                                .set("choiceList", ctrls.map(c => c == "结束" ? "结束选择，立即结算" : optDesc[c]))
                                .set("ai", () => "结束")
                                .forResult();
                            if (r.control == "结束" || !r.control) break;
                            chosen.push(r.control);
                        }
                        if (!chosen.length) return;

                        for (var i = 0; i < chosen.length; i++) {
                            var opt = chosen[i];
                            if (opt == "翼" && target.countCards("he")) {
                                player.line(target, "green");
                                var r3 = await player
                                    .choosePlayerCard(target, "he", true, [1, 1], "将" + get.translation(target) + "的一张牌称为「翼」置于你的武将牌上")
                                    .forResult();
                                if (r3.bool && r3.cards && r3.cards.length) {
                                    var expansionEvent = player.addToExpansion(r3.cards, target, "give");
                                    expansionEvent.gaintag.add("re_dclingxi");
                                    await expansionEvent;
                                }
                            } else if (opt == "弃" && (target == player ? target.countDiscardableCards(target, "he") : target.countCards("he"))) {
                                player.line(target, "fire");
                                var max2 = Math.min(2, target.countCards("he"));
                                if (max2 > 0) {
                                    var r4 = await player
                                        .choosePlayerCard(target, "he", true, [1, max2], "弃置" + get.translation(target) + "的至多两张牌")
                                        .forResult();
                                    if (r4.bool && r4.cards && r4.cards.length) {
                                        await target.discard(r4.cards);
                                    }
                                }
                            } else if (opt == "体力") {
                                player.line(target, "thunder");
                                await target.loseHp();
                            }
                        }
                    } finally {
                        // 所有失牌及其触发结算完成后，才能解除防递归保护。
                        player._re_dczhifou_ing = false;
                    }
                },
                "skill_id": "re_dczhifou",
                "_priority": 0,
            },
            "reshen_tuoyu": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: ["phaseBegin","phaseEnd"],
                },
                filter(event, player) {
                    return player.countCards("h") > 0 && player.getStorage("reshen_tuoyu").length > 0;
                },
                forced: true,
                async content(event, trigger, player) {
                    var hs = player.getCards("h"),
                        tags = ["reshen_tuoyu_fengtian", "reshen_tuoyu_qingqu", "reshen_tuoyu_junshan"];
                    var storage = player.getStorage("reshen_tuoyu");
                    var list = [
                        ["未分配手牌", []],
                        [get.translation(tags[0] + "_tag") + '<div class="text center">伤害/回复值+1</div>', []],
                        [get.translation(tags[1] + "_tag") + '<div class="text center">无次数和距离限制</div>', []],
                        [get.translation(tags[2] + "_tag") + '<div class="text center">不可被响应</div>', []],
                    ];
                    for (var card of hs) {
                        var added = false;
                        for (var i = 0; i < tags.length; i++) {
                            if (card.hasGaintag(tags[i] + "_tag")) {
                                added = true;
                                list[i + 1][1].push(card);
                                break;
                            }
                        }
                        if (!added) {
                            list[0][1].push(card);
                        }
                    }
                    for (var i = 0; i < tags.length; i++) {
                        if (!storage.includes(tags[i])) {
                            list[i + 1][0] = get.translation(tags[i] + "_tag") + '<div class="text center">尚未激活</div>';
                        }
                    }
                    list = [list[0], list.slice(1)];
                    var next = player.chooseToMove_new("拓域：请分配你的手牌", true);
                    next.set("list", list);
                    next.set("filterMove", function (from, to, moved) {
                        var player = _status.event.player;
                        var storage = player.getStorage("reshen_tuoyu"),
                            tags = ["reshen_tuoyu_fengtian", "reshen_tuoyu_qingqu", "reshen_tuoyu_junshan"];
                        if (typeof to == "number") {
                            if (to == 0) {
                                return true;
                            }
                            return storage.includes(tags[to - 1]) && moved[to].length < 5;
                        }
                        return true;
                    });
                    next.set("processAI", function () {
                        var player = _status.event.player;
                        var storage = player.getStorage("reshen_tuoyu"),
                            tags = ["reshen_tuoyu_fengtian", "reshen_tuoyu_qingqu", "reshen_tuoyu_junshan"];
                        var moved = [[], [], [], []];
                        var isEmpty = function (to) {
                            return storage.includes(tags[to - 1]) && moved[to].length < 5;
                        };
                        var hs = player.getCards("h");
                        var hs2 = hs.slice(0);
                        var usable = player.getCardUsable("sha");
                        var addTo = function (card, to) {
                            if (isEmpty(to)) {
                                hs2.remove(card);
                                moved[to].push(card);
                                if (get.name(card) == "sha" && to != 2) {
                                    usable--;
                                }
                            }
                        };
                        var hasRuanshizi = game.hasPlayer(function (target) {
                            return target != player && player.canUse("sha", target, null, true) && !target.mayHaveShan(player, "use") && get.attitude(player, target) < 0 && get.effect(target, { name: "sha" }, player, player) > 0;
                        });
                        for (var card of hs) {
                            var name = get.name(card);
                            if (name == "tao" || name == "jiu") {
                                addTo(card, 1);
                            } else if (name == "sha") {
                                if (hasRuanshizi && isEmpty(1) && usable > 0) {
                                    addTo(card, 1);
                                } else if (isEmpty(3) && usable > 0) {
                                    addTo(card, 3);
                                } else {
                                    addTo(card, 2);
                                }
                            } else if (get.type(name) == "trick") {
                                if (isEmpty(1) && get.tag(card, "damage") > 0 && player.hasUseTarget(card)) {
                                    addTo(card, 1);
                                } else {
                                    addTo(card, 3);
                                }
                            }
                        }
                        moved[0].addArray(hs2);
                        return moved;
                    });
                    var result = await next.forResult();
                    if (result.bool) {
                        game.broadcastAll(
                            function (moved, player) {
                                if (player == game.me) {
                                    const cards = moved.flat(1).reverse();
                                    game.addVideo("lose", game.me, [get.cardsInfo(cards), [], [], []]);
                                    for (var i = 0; i < cards.length; i++) {
                                        cards[i].goto(ui.special);
                                    }
                                    game.me.directgain(cards, false);
                                }
                                var tags = ["reshen_tuoyu_fengtian", "reshen_tuoyu_qingqu", "reshen_tuoyu_junshan"];
                                var map = {};
                                for (var i = 0; i < moved.length; i++) {
                                    for (var card of moved[i]) {
                                        for (var j = 0; j < tags.length; j++) {
                                            const tag = `${tags[j]}_tag`;
                                            if (!map[tag]) {
                                                map[tag] = [[], []];
                                            }
                                            if (i == j + 1) {
                                                map[tag][0].add(card);
                                                if (!card.hasGaintag(tag)) {
                                                    card.addGaintag(tag);
                                                }
                                            } else {
                                                if (card.hasGaintag(tag)) {
                                                    map[tag][1].add(card);
                                                    card.removeGaintag(tag);
                                                }
                                            }
                                        }
                                    }
                                }
                                for (const tag in map) {
                                    if (map[tag][0].length) {
                                        game.addVideo("addGaintag", player, [tag, get.cardsInfo(map[tag][0])]);
                                    }
                                    if (map[tag][1].length) {
                                        game.addVideo("removeGaintag", player, [tag, get.cardsInfo(map[tag][1])]);
                                    }
                                }
                                game.addVideo("delay", null, 1);
                            },
                            result.moved,
                            player
                        );
                    }
                },
                intro: {
                    content: "已激活的副区域：$",
                },
                group: "reshen_tuoyu_effect",
                subSkill: {
                    effect: {
                        mod: {
                            targetInRange(card, player, target) {
                                if (get.suit(card) == "unsure") {
                                    return true;
                                }
                                if (!card.cards) {
                                    return;
                                }
                                for (var i of card.cards) {
                                    if (i.hasGaintag("reshen_tuoyu_qingqu_tag")) {
                                        return true;
                                    }
                                }
                            },
                            cardUsable(card, player, num) {
                                if (get.suit(card) == "unsure") {
                                    return Infinity;
                                }
                                if (!card.cards) {
                                    return;
                                }
                                for (var i of card.cards) {
                                    if (i.hasGaintag("reshen_tuoyu_qingqu_tag")) {
                                        return Infinity;
                                    }
                                }
                            },
                            ignoredHandcard(card, player) {
                                if (card.hasGaintag("reshen_tuoyu_fengtian_tag") || card.hasGaintag("reshen_tuoyu_qingqu_tag") || card.hasGaintag("reshen_tuoyu_junshan_tag")) {
                                    return true;
                                }
                            },
                        },
                        audio: "reshen_tuoyu",
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        filter(event, player) {
                            return player.hasHistory("lose", evt => {
                                const evtx = evt.relatedEvent || evt.getParent();
                                if (evtx !== event) {
                                    return false;
                                }
                                return Object.values(evt.gaintag_map).flat().containsSome("reshen_tuoyu_fengtian_tag", "reshen_tuoyu_qingqu_tag", "reshen_tuoyu_junshan_tag");
                            });
                        },
                        async content(event, trigger, player) {
                            const tags = ["reshen_tuoyu_fengtian_tag", "reshen_tuoyu_qingqu_tag", "reshen_tuoyu_junshan_tag"];
                            player.hasHistory("lose", evt => {
                                const evtx = evt.relatedEvent || evt.getParent();
                                if (evtx != trigger) {
                                    return false;
                                }
                                for (const i in evt.gaintag_map) {
                                    tags.removeArray(evt.gaintag_map[i]);
                                }
                                return tags.length == 0;
                            });
                            const card = trigger.card;
                            if (!tags.includes("reshen_tuoyu_fengtian_tag")) {
                                if (get.tag(card, "damage") > 0 || get.tag(card, "recover") > 0) {
                                    trigger.baseDamage++;
                                    game.log(card, "的伤害值/回复值+1");
                                }
                            }
                            if (!tags.includes("reshen_tuoyu_qingqu_tag")) {
                                if (trigger.addCount !== false) {
                                    trigger.addCount = false;
                                    let stat = player.getStat("card");
                                    if (stat[card.name] && stat[card.name] > 0) {
                                        stat[card.name]--;
                                    }
                                    game.log(card, "不计入次数限制");
                                }
                            }
                            if (!tags.includes("reshen_tuoyu_junshan_tag")) {
                                game.log(card, "不可被响应");
                                trigger.directHit.addArray(game.filterPlayer());
                            }
                        },
                        "skill_id": "reshen_tuoyu_effect",
                        sub: true,
                        sourceSkill: "reshen_tuoyu",
                        "_priority": 0,
                    },
                },
                ai: {
                    combo: "reshen_xianjin",
                },
                "skill_id": "reshen_tuoyu",
                "_priority": 0,
            },
            "reshen_xianjin": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: "gameStart",
                    player: "damageEnd",
                    source: "damageSource",
                },
                filter(event, player, name) {
                    if (name == "gameStart") {
                        return player.getStorage("reshen_tuoyu").length < 3;
                    }
                    let history = game.getAllGlobalHistory("everything", evt => {
                        if (evt.name !== "damage" || !evt.player.getAllHistory("damage").includes(evt)) {
                            return false;
                        }
                        return evt.player === player || evt.source === player;
                    });
                    history = history
                        .map(evt => {
                            let list = [];
                            if (evt.source === player) {
                                list.push([evt, "damageSource"]);
                            }
                            if (evt.player === player) {
                                list.push([evt, "damageEnd"]);
                            }
                            return list;
                        })
                        .flat();
                    let list = history.find(lit => lit[0] === event && lit[1] === name);
                    return list && history.indexOf(list) % 2 === 1;
                },
                forced: true,
                async content(event, trigger, player) {
                    const activateTag = async () => {
                        let tags = ["reshen_tuoyu_fengtian", "reshen_tuoyu_qingqu", "reshen_tuoyu_junshan"];
                        tags.removeArray(player.getStorage("reshen_tuoyu"));
                        if (tags.length > 0) {
                            const control =
                                tags.length === 1
                                    ? tags[0]
                                    : (
                                            await player
                                                .chooseControl(tags)
                                                .set(
                                                    "choiceList",
                                                    tags.map(tag => {
                                                        return `${get.translation(`${tag}_tag`)}：${
                                                            {
                                                                reshen_tuoyu_fengtian: "伤害/回复值+1",
                                                                reshen_tuoyu_qingqu: "无次数和距离限制",
                                                                reshen_tuoyu_junshan: "不可被响应",
                                                            }[tag]
                                                        }`;
                                                    })
                                                )
                                                .set("displayIndex", false)
                                                .set("prompt", "险进：选择激活一个副区域标签")
                                                .forResult()
                                        ).control;
                            game.log(player, "激活了副区域", "#y" + get.translation(control));
                            player.markAuto("reshen_tuoyu", [control]);
                            player.popup(get.translation(control + "_tag"));
                        }
                    };
                    if (event.triggername == "gameStart") {
                        await activateTag();
                        return;
                    }
                    await activateTag();
                    await player.draw(player.getStorage("reshen_tuoyu").length);
                },
                ai: {
                    effect: {
                        player(card, player, target) {
                            if (!get.tag(card, "damage") || player.hasSkillTag("jueqing", false, target)) {
                                return;
                            }
                            let history = game.getAllGlobalHistory("everything", evt => {
                                if (evt.name !== "damage" || !evt.player.getAllHistory("damage").includes(evt)) {
                                    return false;
                                }
                                return evt.player === player || evt.source === player;
                            });
                            if (
                                history.reduce((sum, evt) => {
                                    if (evt.source === player) {
                                        sum++;
                                    }
                                    if (evt.player === player) {
                                        sum++;
                                    }
                                    return sum;
                                }, 0) %
                                    2 ===
                                0
                            ) {
                                return;
                            }
                            return [1, Math.min(3, 1 + player.getStorage("reshen_tuoyu").length)];
                        },
                    },
                },
                "skill_id": "reshen_xianjin",
                "_priority": 0,
            },
            "reshen_qijing": {
                derivation: "reshen_cuixin",
                audio: "ext:扩展1:2",
                trigger: {
                    global: "phaseEnd",
                },
                filter(event, player) {
                    return player.getStorage("reshen_tuoyu").length == 3;
                },
                forced: true,
                juexingji: true,
                skillAnimation: true,
                animationColor: "orange",
                seatRelated: "changeSeat",
                async content(event, trigger, player) {
                    player.awakenSkill(event.name);
                    player.loseMaxHp();
                    player.addSkills("reshen_cuixin");
                    if (game.countPlayer() > 2) {
                        if (player == trigger.player && !trigger.skill) {
                            var evt = trigger.getParent();
                            if (evt.name == "phaseLoop" && evt._isStandardLoop) {
                                evt.player = player.previous;
                                _status.lastPhasedPlayer = player.next;
                            }
                        }
                        var result = await player
                            .chooseTarget(
                                "请选择一名要更换座次的角色，将自己移动到该角色的上家位置",
                                function (card, player, target) {
                                    return target != player && target != player.next;
                                },
                                true
                            )
                            .set("ai", function (target) {
                                var player = _status.event.player;
                                var current = _status.currentPhase?.next;
                                var max = 20,
                                    att = 0;
                                while (max > 0) {
                                    max--;
                                    if (current == target) {
                                        return att;
                                    }
                                    att -= get.attitude(player, current);
                                    current = current.next;
                                }
                                return att;
                            })
                            .forResult();
                        if (result.bool) {
                            var target = result.targets[0];
                            game.broadcastAll(
                                function (target1, target2) {
                                    game.swapSeat(target1, target2, null, true);
                                },
                                player,
                                target
                            );
                        }
                    }
                    player.insertPhase();
                },
                ai: {
                    combo: "reshen_tuoyu",
                },
                "skill_id": "reshen_qijing",
                "_priority": 0,
            },
            "reshen_cuixin": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "useCardAfter",
                },
                filter(event, player) {
                    if (!event._reshen_cuixin || get.type(event.card, null, false) == "delay" || get.type(event.card, null, false) == "equip") {
                        return false;
                    }
                    var card = {
                            name: event.card.name,
                            nature: event.card.nature,
                            isCard: true,
                        },
                        list = event._reshen_cuixin;
                    for (var target of list) {
                        var targetx = player[target]();
                        if (lib.filter.targetEnabled2(card, targetx, player)) {
                            return true;
                        }
                    }
                    return false;
                },
                direct: true,
                async content(event, trigger, player) {
                    const card = {
                        name: trigger.card.name,
                        nature: trigger.card.nature,
                        isCard: true,
                    };
                    event.card = card;

                    const targets = trigger._reshen_cuixin.map(target => player[target]()).filter(target => lib.filter.targetEnabled2(card, target, player));
                    let result;
                    if (targets.length == 1) {
                        event.target = targets[0];
                        result = await player
                            .chooseBool("摧心：是否视为对" + get.translation(event.target) + "使用" + get.translation(card) + "？")
                            .set("goon", get.effect(event.target, card, player, player) > 0)
                            .set("ai", () => get.event().goon)
                            .forResult();
                    } else {
                        result = await player
                            .chooseTarget("摧心：是否视为对上家或下家使用" + get.translation(card) + "？", "操作提示：从上家或下家中选择一名角色作为使用目标", (card, player, target) => {
                                return (target == player.getNext() || target == player.getPrevious()) && lib.filter.targetEnabled2(event.card, target, player);
                            })
                            .set("ai", target => {
                                const player = get.player();
                                return get.effect(target, event.card, player, player);
                            })
                            .forResult();
                    }
                    if (result.bool) {
                        const target = event.target || result.targets;
                        player.useCard(card, target, false, "reshen_cuixin");
                    }
                },
                group: "reshen_cuixin_silent",
                subSkill: {
                    silent: {
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        silent: true,
                        forced: true,
                        popup: false,
                        firstDo: true,
                        charlotte: true,
                        filter(event, player) {
                            if (!event.isFirstTarget || event.getParent().skill == "reshen_cuixin") {
                                return false;
                            }
                            if (event.targets.length == 0) {
                                return false;
                            }
                            return event.targets.includes(player.getNext()) || event.targets.includes(player.getPrevious());
                        },
                        async content(event, trigger, player) {
                            var list = [];
                            if (trigger.targets.includes(player.getNext())) {
                                list.push("getPrevious");
                            }
                            if (trigger.targets.includes(player.getPrevious())) {
                                list.push("getNext");
                            }
                            trigger.getParent()._reshen_cuixin = list;
                        },
                        "skill_id": "reshen_cuixin_silent",
                        sub: true,
                        sourceSkill: "reshen_cuixin",
                        "_priority": 1,
                    },
                },
                "skill_id": "reshen_cuixin",
                "_priority": 0,
            },
        },
        translate: {
            "ext1_mocansi": "魔残肆",
            "ext1_mocansi_info": "准备阶段，你可以回复1点体力，然后你可以令一名其他角色回复1点体力并视为对其使用三张【杀】/【决斗】/【火攻】（每次均可自由选择）。在此期间，你每造成1点伤害便摸两张牌。",
            "ext1_mofozong": "魔佛宗",
            "ext1_mofozong_info": "锁定技，其他角色获得手牌后，若其手牌数大于7，其将X张手牌置于其武将牌上（X为其手牌数-7）。然后若其武将牌上的“魔佛宗”牌数不小于7，你选择一项：⒈获得这些牌并令其回复1点体力；⒉令其失去1点体力。",
            "re_dclingxi": "灵犀",
            "re_dclingxi_info": "每轮开始时、出牌阶段开始和结束时，你可以将至多X张牌称为「翼」置于你的武将牌上（X为你的体力上限）。当你失去武将牌上的「翼」时，你将手牌数调整至Y张（Y为你武将牌上的「翼」所含有的花色数的两倍）。",
            "re_dczhifou": "知否",
            "re_dczhifou_info": "当你失去牌后，你可以移去至少X张武将牌上的「翼」（X为本回合此前发动此技能的次数+1），然后选择一名角色，并选择至多X项令其执行：①将一张牌称为「翼」置于你的武将牌上；②弃置其两张牌；③令其失去1点体力。",
            "reshen_tuoyu": "拓域",
            "reshen_tuoyu_info": "锁定技。①当你使用拥有对应副区域标签的牌时，你令此牌获得对应效果。丰田：伤害值或回复值+1；清渠：无次数和距离限制；峻山：不可被响应。②每回合开始时和结束时，你给你的手牌分配对应的已激活副区域标签（每个区域至多五张，分配至副区域的手牌不计入手牌上限）。",
            "reshen_xianjin": "险进",
            "reshen_xianjin_info": "锁定技。游戏开始时，你激活一个副区域标签；当你每造成或受到两次伤害后，你激活一个副区域标签并摸X张牌（X为你已激活的副区域数）。",
            "reshen_qijing": "奇径",
            "reshen_qijing_info": "觉醒技。一名角色的回合结束后，若你的三个副区域标签均被激活，则你减1点体力上限，获得〖摧心〗，将座位移动至两名相邻的其他角色之间并执行一个额外回合。",
            "reshen_cuixin": "摧心",
            "reshen_cuixin_info": "当你不因此技能使用的基本牌或普通锦囊牌结算结束后，若此牌的目标于你使用此牌指定第一个目标时包含你的上家或下家，则你可以视为对下家或上家再使用一张牌名和元素相同的牌。",
            "reshen_tuoyu_fengtian": "丰田",
            "reshen_tuoyu_qingqu": "清渠",
            "reshen_tuoyu_junshan": "峻山",
            "reshen_tuoyu_fengtian_tag": "<span data-nature=\"woodmm\">丰田</span>",
            "reshen_tuoyu_qingqu_tag": "<span data-nature=\"watermm\">清渠</span>",
            "reshen_tuoyu_junshan_tag": "<span data-nature=\"thundermm\">峻山</span>",
        },
    },
    intro: "",
    author: "nihility",
    diskURL: "",
    forumURL: "",
    version: "1.7.0",
},files:{"character":["mozarong.gif","re_caoxian.jpg","reshen_dengai.jpg"],"card":[],"skill":[],"audio":[]}}
};
