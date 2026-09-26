import { lib, game, ui, get, ai, _status } from "noname";
export const type = "extension";
export default function(){
	return {name:"扩展1",editable:true,connect:false,arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
},precontent:function(){
    if (lib.namePrefix) {
        lib.namePrefix.set("将灵", { color: "#c3f9ff", nature: "thundermm" });
    }
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
            "jl_caochun": {
                sex: "male",
                group: "wei",
                hp: 5,
                maxHp: 5,
                skills: ["jl_shanjia","jl_xiaorui"],
                img: "extension/扩展1/caochun.jpg",
                dieAudios: ["ext:扩展1/audio/die/jl_caochun.mp3"],
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
            "jl_zhangqiying": {
                sex: "female",
                group: "qun",
                hp: 4,
                maxHp: 4,
                skills: ["jl_falu","jl_dianhua","jl_zhenyi"],
                img: "extension/扩展1/jl_zhangqiying.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/jl_zhangqiying.mp3"],
            },
            "jl_zhaoxiang": {
                sex: "female",
                group: "shu",
                hp: 5,
                maxHp: 5,
                skills: ["jl_fanghun","jl_fuhan"],
                img: "extension/扩展1/jl_zhaoxiang.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/jl_zhaoxiang.mp3"],
            },
            "jl_nianshou": {
                sex: "male",
                group: "shen",
                hp: 4,
                maxHp: 4,
                skills: ["jl_fange","jl_xunlie"],
                img: "extension/扩展1/jl_nianshou.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/jl_nianshou.mp3"],
            },
            "jl_guansuo": {
                sex: "male",
                group: "shu",
                hp: 5,
                maxHp: 5,
                skills: ["jl_xiefang","jl_zhengnan"],
                img: "extension/扩展1/jl_guansuo.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/jl_guansuo.mp3"],
            },
            "jl_caoying": {
                sex: "female",
                group: "wei",
                hp: 5,
                maxHp: 5,
                skills: ["jl_lingren","jl_fujian"],
                img: "extension/扩展1/jl_caoying.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/jl_caoying.mp3"],
            },
            "jl_xiaoqiao": {
                sex: "female",
                group: "wu",
                hp: 4,
                maxHp: 4,
                skills: ["jl_tianxiang","jl_hongyan"],
                img: "extension/扩展1/jl_xiaoqiao.jpg",
                hujia: 0,
                dieAudios: ["ext:扩展1/audio/die/jl_xiaoqiao.mp3"],
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
            "jl_shen_zhaoyun": {
                sex: "male",
                group: "shen",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["jl_juejing","jl_longhun"],
                img: "extension/扩展1/jl_shen_zhaoyun.jpg",
                dieAudios: ["ext:扩展1/audio/die/jl_shen_zhaoyun.mp3"],
            },
        },
        translate: {
            "mozarong": "魔笮融",
            "mozarong_prefix": "魔",
            "jl_caochun": "将灵曹纯",
            "jl_caochun_prefix": "将灵",
            "re_caoxian": "界曹宪",
            "re_caoxian_prefix": "界",
            "jl_zhangqiying": "将灵张琪瑛",
            "jl_zhangqiying_prefix": "将灵",
            "jl_zhaoxiang": "将灵赵襄",
            "jl_zhaoxiang_prefix": "将灵",
            "jl_nianshou": "将灵年兽",
            "jl_nianshou_prefix": "将灵",
            "jl_guansuo": "将灵关索",
            "jl_guansuo_prefix": "将灵",
            "jl_caoying": "将灵曹婴",
            "jl_caoying_prefix": "将灵",
            "jl_xiaoqiao": "将灵小乔",
            "jl_xiaoqiao_prefix": "将灵",
            "reshen_dengai": "界神邓艾",
            "reshen_dengai_prefix": "界|神",
            "jl_shen_zhaoyun": "将灵神赵云",
            "jl_shen_zhaoyun_prefix": "将灵|神",
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
            "jl_shanjia": {
                audio: "ext:扩展1:2",
                shaRelated: true,
                trigger: {
                    global: "phaseBegin",
                },
                frequent: true,
                async content(event, trigger, player) {
                    var drawResult = await player.chooseControl('2张', '3张', '4张').set('prompt', '请选择摸牌数量').set('ai', function() { return 2; }).forResult();
                    await player.draw(drawResult.index + 2);
                    player.logSkill('jl_shanjia');
                    if (trigger.player != player) return;
                    var useResult = await player.chooseBool('是否视为使用一张无视距离、不可响应且伤害自选的【杀】？').set('ai', function() { return true; }).forResult();
                    if (!useResult.bool) return;
                    var damageResult = await player.chooseControl('+1', '+2').set('prompt', '请选择伤害增加量').set('ai', function() { return 1; }).forResult();
                    player.storage.jl_shanjia_dmg = damageResult.index + 1;
                    player.addTempSkill('jl_shanjia_effect', 'phaseAfter');
                    await player.chooseUseTarget({name:'sha'}, false, 'nodistance').forResult();
                },
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_shanjia",
                "_priority": 0,
            },
            "jl_shanjia_effect": {
                trigger: {
                    player: "useCardToPlayered",
                },
                forced: true,
                popup: false,
                filter: function(event, player) {
                    return event.card && event.card.name == 'sha';
                },
                content: function() {
                    trigger.getParent().directHit.add(trigger.target);
                },
                ai: {
                    "directHit_ai": true,
                },
                group: "jl_shanjia_effect_damage",
                "skill_id": "jl_shanjia_effect",
                "_priority": 0,
            },
            "jl_shanjia_effect_damage": {
                trigger: {
                    source: "damageBegin1",
                },
                forced: true,
                popup: false,
                filter: function(event, player) {
                    return event.card && event.card.name == 'sha';
                },
                content: function() {
                    trigger.num += (player.storage.jl_shanjia_dmg || 1);
                    player.removeSkill('jl_shanjia_effect');
                    delete player.storage.jl_shanjia_dmg;
                },
                ai: {
                    damageBonus: true,
                },
                "skill_id": "jl_shanjia_effect_damage",
                "_priority": 0,
            },
            "jl_xiaorui": {
                audio: "ext:扩展1:2",
                trigger: {
                    source: "damageBegin",
                },
                usable: 4,
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var cardResult = await player.chooseControl('2张', '3张', '4张').set('prompt', '请选择获得牌的数量').set('ai', function() { return 2; }).forResult();
                    var cardCount = cardResult.index + 2;
                    var damageResult = await player.chooseControl('2', '3', '4').set('prompt', '请选择伤害增加量').set('ai', function() { return 2; }).forResult();
                    var dmgAdd = damageResult.index + 2;
                    var target = trigger.player;
                    // 先随机获得目标手牌装备
                    var cards = target.getCards('he').slice();
                    for (var i = cards.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = cards[i];
                        cards[i] = cards[j];
                        cards[j] = temp;
                    }
                    var num = Math.min(cardCount, cards.length);
                    if (num > 0) {
                        await player.gain(cards.slice(0, num), target, 'giveAuto');
                    }
                    // 再增加伤害
                    trigger.num += dmgAdd;
                    player.logSkill('jl_xiaorui');
                },
                ai: {
                    threaten: 2,
                },
                "skill_id": "jl_xiaorui",
                "_priority": 0,
            },
            "jl_falu": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "phaseJieshuBegin",
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var suits = ["spade", "heart", "club", "diamond"];
                    var gained = [];
                    for (var s = 0; s < suits.length; s++) {
                        var suit = suits[s];
                        var card = get.cardPile(function(card2) {
                            return get.suit(card2, false) == suit && !gained.includes(card2);
                        }, "cardPile", "random");
                        if (card) gained.push(card);
                    }
                    if (!gained.length) return;
                    player.logSkill("jl_falu");
                    await player.gain(gained, "draw");
                    var sameNum = false;
                    var nums = {};
                    for (var i = 0; i < gained.length; i++) {
                        var num = get.number(gained[i], false);
                        if (num !== undefined && num !== null) {
                            if (nums[num]) { sameNum = true; break; }
                            nums[num] = true;
                        }
                    }
                    if (!sameNum) return;
                    await player.recover();
                    if (!game.hasPlayer(function(current) { return current != player; })) return;
                    var result = await player.chooseTarget("法箓：选择至多两名其他角色各造成1点伤害", [1, 2], lib.filter.notMe)
                        .set("ai", function(target) {
                            return get.attitude(_status.event.player, target) < 0 ? 1 : 0;
                        }).forResult();
                    if (result.bool) {
                        var targets = result.targets.sortBySeat();
                        for (var target of targets) {
                            player.line(target, "fire");
                            await target.damage(1, player);
                        }
                    }
                },
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_falu",
                "_priority": 0,
            },
            "jl_dianhua": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                frequent: true,
                async content(event, trigger, player) {
                    var cards = get.cards(4);
                    var next = player.chooseToMove(true);
                    next.set("list", [["牌堆顶（上→下）", cards]]);
                    next.set("prompt", "点化：将卡牌按任意顺序置于牌堆顶（越靠左越在顶部）");
                    next.processAI = function(list) {
                        var cs = list[0][1].slice();
                        cs.sort(function(a, b) {
                            return get.value(b) - get.value(a);
                        });
                        return [cs];
                    };
                    var result = await next.forResult();
                    var top = (result && result.moved && result.moved[0]) ? result.moved[0] : cards;
                    top.reverse();
                    await game.cardsGotoPile(top, ["top_cards", top], function(event2, card) {
                        if (event2.top_cards.includes(card)) return ui.cardPile.firstChild;
                        return null;
                    });
                    player.logSkill("jl_dianhua");
                },
                ai: {
                    threaten: 1.2,
                },
                "skill_id": "jl_dianhua",
                "_priority": 0,
            },
            "jl_zhenyi": {
                audio: "ext:扩展1:2",
                group: ["jl_zhenyi_damage","jl_zhenyi_defend"],
                "skill_id": "jl_zhenyi",
                "_priority": 0,
            },
            "jl_zhenyi_damage": {
                audio: "ext:扩展1:2",
                trigger: {
                    source: "damageBegin",
                },
                usable: 2,
                filter: function(event, player) {
                    return event.player && event.player != player;
                },
                prompt: function(event, player) {
                    return "是否发动「真仪」，令对" + get.translation(event.player) + "造成的伤害+1并随机获得其一张牌？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    trigger.num++;
                    var target = trigger.player;
                    var cards = target.getCards("he");
                    if (cards.length) {
                        var card = cards[Math.floor(Math.random() * cards.length)];
                        await player.gain(card, target, "giveAuto");
                    }
                    player.logSkill("jl_zhenyi", target);
                },
                ai: {
                    damageBonus: true,
                },
                sub: true,
                sourceSkill: "jl_zhenyi",
                "skill_id": "jl_zhenyi_damage",
                "_priority": 0,
            },
            "jl_zhenyi_defend": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "damageBegin",
                },
                usable: 2,
                filter: function(event, player) {
                    return event.source && event.source != player;
                },
                prompt: function(event, player) {
                    return "是否发动「真仪」，防止此伤害并随机弃置" + get.translation(event.source) + "两张牌？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    trigger.cancel();
                    var source = trigger.source;
                    if (source && source.countCards("he")) {
                        var cards = source.getCards("he").slice();
                        for (var i = cards.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = cards[i];
                            cards[i] = cards[j];
                            cards[j] = temp;
                        }
                        var num = Math.min(2, cards.length);
                        await source.discard(cards.slice(0, num));
                    }
                    player.logSkill("jl_zhenyi", source);
                },
                ai: {
                    threaten: 1.5,
                },
                sub: true,
                sourceSkill: "jl_zhenyi",
                "skill_id": "jl_zhenyi_defend",
                "_priority": 0,
            },
            "jl_fanghun": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: ["cardsDiscardAfter"],
                },
                usable: 3,
                getCards: function(event, player) {
                    var evt = event.getParent();
                    if (!evt || evt.name !== "orderingDiscard") return [];
                    var evt2 = evt.relatedEvent || evt.getParent();
                    if (!evt2 || (evt2.name != "useCard" && evt2.name != "respond")) return [];
                    if (evt2.player != player) return [];
                    if (!evt2.card) return [];
                    var n = get.name(evt2.card, player);
                    if (n != "sha" && n != "shan") return [];
                    if (!event.getd) return [];
                    var d = event.getd();
                    return (d && d.length) ? d.filter(function(card) {
                        return get.name(card, player) == "sha" || get.name(card, player) == "shan";
                    }) : [];
                },
                filter: function(event, player) {
                    return lib.skill.jl_fanghun.getCards(event, player).length > 0;
                },
                prompt: function(event, player) {
                    var evt = event.getParent();
                    var evt2 = evt ? (evt.relatedEvent || evt.getParent()) : null;
                    return "是否发动「芳魂」获得" + (evt2 && evt2.card ? get.translation(evt2.card) : "此牌") + "？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var cards = lib.skill.jl_fanghun.getCards(trigger, player);
                    if (cards && cards.length) {
                        await player.gain(cards, "gain2");
                        player.logSkill("jl_fanghun");
                    }
                    if (!game.hasPlayer(function(current) { return current != player; })) return;
                    var result = await player.chooseTarget("芳魂：弃置一名其他角色至多3张牌", true, lib.filter.notMe)
                        .set("ai", function(target) {
                            return -get.attitude(_status.event.player, target);
                        }).forResult();
                    if (!result.bool) return;
                    var target = result.targets[0];
                    player.line(target, "fire");
                    var maxDiscard = Math.min(3, target.countCards("he"));
                    if (maxDiscard > 0) {
                        var r2 = await player.choosePlayerCard(target, "he", true, [1, maxDiscard], "弃置" + get.translation(target) + "的牌")
                            .set("ai", function(card) {
                                return -get.value(card);
                            }).forResult();
                        if (r2.bool && r2.cards && r2.cards.length) {
                            target.discard(r2.cards);
                        }
                    }
                    var r3 = await player.chooseControl("1张","2张","3张").set("prompt", "芳魂：选择摸牌数量").set("ai", function() { return 2; }).forResult();
                    var drawNum = r3.index + 1;
                    await player.draw(drawNum);
                    target.damage(1, player);
                },
                ai: {
                    threaten: 2,
                },
                "skill_id": "jl_fanghun",
                "_priority": 0,
            },
            "jl_fuhan": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: "damageEnd",
                },
                usable: 3,
                filter: function(event, player) {
                    return (event.source == player || event.player == player) && player.isIn();
                },
                prompt: function(event, player) {
                    var gained = Array.isArray(player.storage.jl_fuhan_skills) ? player.storage.jl_fuhan_skills : [];
                    if (gained.length >= 3) {
                        return "是否发动「扶汉」回复1点体力并摸两张牌？（你已因此获得3个技能）";
                    }
                    return "是否发动「扶汉」随机获得一个蜀国武将技能直到下回合开始时？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    if (!Array.isArray(player.storage.jl_fuhan_skills)) player.storage.jl_fuhan_skills = [];
                    var gained = player.storage.jl_fuhan_skills;
                    // 已因此获得3个技能：改为回复1点体力并摸两张牌，不再获得技能（直到下回合开始由 reset 清零）
                    if (gained.length >= 3) {
                        player.logSkill("jl_fuhan");
                        player.recover();
                        await player.draw(2);
                        return;
                    }
                    var pool = [];
                    for (var name in lib.character) {
                        var info = lib.character[name];
                        if (!info || info[1] != "shu") continue;
                        var skills = info[3];
                        if (!skills || !skills.length) continue;
                        for (var i = 0; i < skills.length; i++) {
                            var skill = skills[i];
                            if (gained.includes(skill)) continue;  // 本轮已获得过的不再随机到
                            if (player.hasSkill(skill)) continue;  // 当前已持有的不重复获得
                            var sinfo = get.info(skill);
                            if (!sinfo) continue;
                            if (sinfo.zhuSkill || sinfo.limited || sinfo.juexingji || sinfo.charlotte) continue;
                            if (sinfo.enable && !sinfo.trigger) continue;
                            pool.add(skill);
                        }
                    }
                    if (!pool.length) {
                        player.logSkill("jl_fuhan");
                        player.recover();
                        await player.draw(2);
                        return;
                    }
                    var skill = pool[Math.floor(Math.random() * pool.length)];
                    player.logSkill("jl_fuhan");
                    game.log(player, "获得了技能", "#g【" + get.translation(skill) + "】");
                    player.addTempSkill(skill, { player: "phaseBegin" });
                    player.storage.jl_fuhan_skills.add(skill);
                },
                group: "jl_fuhan_reset",
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_fuhan",
                "_priority": 0,
            },
            "jl_fuhan_reset": {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                popup: false,
                silent: true,
                filter: function(event, player) {
                    return Array.isArray(player.storage.jl_fuhan_skills) && player.storage.jl_fuhan_skills.length > 0;
                },
                async content(event, trigger, player) {
                    player.storage.jl_fuhan_skills = [];
                },
                sub: true,
                sourceSkill: "jl_fuhan",
                "skill_id": "jl_fuhan_reset",
                "_priority": 0,
            },
            "jl_fange": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "damageEnd",
                },
                filter: function(event, player) {
                    return event.source && event.source.isIn() && event.player == player;
                },
                prompt: function(event, player) {
                    return "是否发动「反戈」摸两张牌，获得" + get.translation(event.source) + "一至两张牌并对其造成1~2点伤害？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var source = trigger.source;
                    await player.draw(2);
                    if (source && source.isIn() && source.countCards("he")) {
                        var maxGet = Math.min(2, source.countCards("he"));
                        var r1 = await player.choosePlayerCard(source, "he", true, [1, maxGet],
                            "反戈：获得" + get.translation(source) + "一至两张牌")
                            .set("ai", function(card) { return get.value(card); }).forResult();
                        if (r1.bool && r1.cards && r1.cards.length) {
                            await player.gain(r1.cards, source, "giveAuto");
                        }
                    }
                    if (source && source.isIn()) {
                        var r2 = await player.chooseControl("1点", "2点").set("prompt", "反戈：选择对" + get.translation(source) + "造成的伤害点数")
                            .set("ai", function() { return 1; }).forResult();
                        source.damage(r2.index + 1, player);
                    }
                },
                ai: {
                    threaten: 2,
                },
                "skill_id": "jl_fange",
                "_priority": 0,
            },
            "jl_xunlie": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: "phaseJieshuBegin",
                },
                filter: function(event, player) {
                    return event.player && event.player.isIn() && player.isIn() && (player.storage.jl_xunlie_count || 0) < 2;
                },
                prompt: function(event, player) {
                    return "是否发动「寻猎」对" + get.translation(event.player) + "执行一项？（每轮剩余" + (2 - (player.storage.jl_xunlie_count || 0)) + "次）";
                },
                check: function(event, player) {
                    return get.attitude(player, event.player) > 0 || get.attitude(player, event.player) < 0;
                },
                async content(event, trigger, player) {
                    player.storage.jl_xunlie_count = (player.storage.jl_xunlie_count || 0) + 1;
                    var target = trigger.player;
                    var result = await player.chooseControl("回复1点体力并摸两张牌", "造成1点伤害并随机弃置两张牌")
                        .set("prompt", "寻猎：选择对" + get.translation(target) + "执行的一项")
                        .set("ai", function() {
                            var p = _status.event.player, t = _status.event.getParent().target;
                            return get.attitude(p, t) > 0 ? "回复1点体力并摸两张牌" : "造成1点伤害并随机弃置两张牌";
                        }).forResult();
                    player.logSkill("jl_xunlie", target);
                    if (result.control == "回复1点体力并摸两张牌") {
                        player.line(target, "green");
                        target.recover();
                        await target.draw(2);
                    } else {
                        player.line(target, "fire");
                        target.damage(1, player);
                        var cards = target.getCards("he").slice();
                        for (var i = cards.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var tmp = cards[i];
                            cards[i] = cards[j];
                            cards[j] = tmp;
                        }
                        var num = Math.min(2, cards.length);
                        if (num > 0) target.discard(cards.slice(0, num));
                    }
                },
                group: "jl_xunlie_reset",
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_xunlie",
                "_priority": 0,
            },
            "jl_xunlie_reset": {
                trigger: {
                    global: "roundStart",
                },
                forced: true,
                popup: false,
                silent: true,
                filter: function(event, player) {
                    return (player.storage.jl_xunlie_count || 0) > 0;
                },
                async content(event, trigger, player) {
                    player.storage.jl_xunlie_count = 0;
                },
                sub: true,
                sourceSkill: "jl_xunlie",
                "skill_id": "jl_xunlie_reset",
                "_priority": 0,
            },
            "jl_xiefang": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "phaseUseBegin",
                },
                group: ["jl_xiefang_dmg"],
                check: function(event, player) {
                    return true;
                },
                prompt: "是否发动「撷芳」？",
                async content(event, trigger, player) {
                    var x = game.filterPlayer(function(c) { return c.sex == "female"; }).length + 1;
                    player.storage.jl_xiefang_x = x;
                    player.storage.jl_xiefang_dmg_count = 0;
                    await player.draw(x);
                    player.logSkill("jl_xiefang");
                    player.addTempSkill("jl_xiefang_buff", { player: "phaseUseAfter" });
                },
                ai: {
                    threaten: 2,
                },
                "skill_id": "jl_xiefang",
                "_priority": 0,
            },
            "jl_xiefang_buff": {
                charlotte: true,
                mod: {
                    globalFrom: function(player, target, distance) {
                        var x = player.storage.jl_xiefang_x;
                        if (typeof x == "number" && x > 0) return distance - x;
                    },
                    cardUsable: function(card, player, num) {
                        if (card && card.name == "sha") {
                            var x = player.storage.jl_xiefang_x;
                            if (typeof x == "number" && x > 0) return num + x;
                        }
                    },
                },
                "skill_id": "jl_xiefang_buff",
                "_priority": 0,
            },
            "jl_xiefang_dmg": {
                audio: "ext:扩展1:2",
                trigger: {
                    source: "damageBegin1",
                },
                forced: true,
                popup: false,
                filter: function(event, player) {
                    if (!event.card || event.card.name != "sha") return false;
                    return (player.storage.jl_xiefang_dmg_count || 0) < 2 && player.hasSkill("jl_xiefang_buff");
                },
                async content(event, trigger, player) {
                    var x = player.storage.jl_xiefang_x || 0;
                    trigger.num += x;
                    player.storage.jl_xiefang_dmg_count = (player.storage.jl_xiefang_dmg_count || 0) + 1;
                },
                "skill_id": "jl_xiefang_dmg",
                "_priority": 0,
            },
            "jl_zhengnan": {
                audio: "ext:扩展1:2",
                trigger: {
                    global: "damageEnd",
                },
                filter: function(event, player) {
                    if (!event.player || !event.player.isIn() || !player.isIn()) return false;
                    if (event.player.hp > player.hp) return false;
                    var used = player.storage.jl_zhengnan_used;
                    if (used && used.includes(event.player)) return false;
                    return true;
                },
                prompt: function(event, player) {
                    return "是否发动「征南」摸1~3张牌并选择获得一个技能？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    if (!Array.isArray(player.storage.jl_zhengnan_used)) player.storage.jl_zhengnan_used = [];
                    player.storage.jl_zhengnan_used.add(trigger.player);
                    var r1 = await player.chooseControl("1张", "2张", "3张").set("prompt", "征南：选择摸牌数量")
                        .set("ai", function() { return 2; }).forResult();
                    await player.draw(r1.index + 1);
                    player.logSkill("jl_zhengnan", trigger.player);
                    var candidates = ["new_rewusheng", "jl_dangxian", "rezhiman"].filter(function(s) {
                        return !player.hasSkill(s);
                    });
                    if (!candidates.length) {
                        player.recover();
                        return;
                    }
                    var names = candidates.map(function(s) { return get.translation(s); });
                    var r2 = await player.chooseControl(names).set("prompt", "征南：选择获得一个技能（直到你的下个回合结束）")
                        .set("ai", function() { return 0; }).forResult();
                    var chosen = candidates[r2.index];
                    player.addTempSkill(chosen, { player: "phaseAfter" });
                    game.log(player, "获得了技能", "#g【" + get.translation(chosen) + "】");
                },
                group: "jl_zhengnan_round_reset",
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_zhengnan",
                "_priority": 0,
            },
            "jl_zhengnan_round_reset": {
                trigger: {
                    global: "phaseBegin",
                },
                forced: true,
                popup: false,
                silent: true,
                firstDo: true,
                filter: function(event, player) {
                    return Array.isArray(player.storage.jl_zhengnan_used) && player.storage.jl_zhengnan_used.length > 0;
                },
                async content(event, trigger, player) {
                    player.storage.jl_zhengnan_used = [];
                },
                sub: true,
                sourceSkill: "jl_zhengnan",
                "skill_id": "jl_zhengnan_round_reset",
                "_priority": 0,
            },
            "jl_dangxian": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                async content(event, trigger, player) {
                    trigger.phaseList.splice(trigger.num, 0, "phaseUse|" + event.name);
                },
                group: "jl_dangxian_rewrite",
                ai: {
                    halfneg: true,
                },
                "skill_id": "jl_dangxian",
                "_priority": 0,
            },
            "jl_dangxian_rewrite": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "phaseUseBegin",
                },
                forced: true,
                popup: false,
                filter: function(event, player) {
                    return event._extraPhaseReason == "jl_dangxian";
                },
                async content(event, trigger, player) {
                    var result = await player.chooseBool("是否失去1点体力并获得一张【杀】？")
                        .set("ai", function() { return player.hp > 2 && !player.hasSha(); }).forResult();
                    if (!result.bool) return;
                    await player.loseHp();
                    var card = get.cardPile(function(card) { return card.name == "sha"; });
                    if (card) await player.gain(card, "gain2");
                },
                sub: true,
                sourceSkill: "jl_dangxian",
                "skill_id": "jl_dangxian_rewrite",
                "_priority": 0,
            },
            "jl_lingren": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "useCard",
                },
                usable: 2,
                filter: function(event, player) {
                    if (!["basic", "trick"].includes(get.type(event.card))) return false;
                    return get.is.damageCard(event.card) && event.targets && event.targets.length > 0;
                },
                prompt: function(event, player) {
                    return "是否发动「凌人」选择一个目标使其受到此牌伤害+1~2并摸1~3张牌、获得奸雄与行殇？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var result = await player.chooseTarget("凌人：选择一个目标令此牌对其伤害+1~2", true, function(card, p, target) {
                        return _status.event.targets.includes(target);
                    }).set("targets", trigger.targets)
                        .set("ai", function(target) { return 2 - get.attitude(get.player(), target); }).forResult();
                    if (!result.bool) return;
                    var target = result.targets[0];
                    var r1 = await player.chooseControl("1点", "2点").set("prompt", "凌人：选择对" + get.translation(target) + "增加的伤害点数")
                        .set("ai", function() { return 1; }).forResult();
                    var dmgAdd = r1.index + 1;
                    var r2 = await player.chooseControl("1张", "2张", "3张").set("prompt", "凌人：选择摸牌数量")
                        .set("ai", function() { return 2; }).forResult();
                    var drawNum = r2.index + 1;
                    player.logSkill("jl_lingren", target);
                    player.addTempSkill("jl_lingren_damage");
                    var map = player.getStorage("jl_lingren_damage", {});
                    map[target.playerid] = (map[target.playerid] || 0) + dmgAdd;
                    player.setStorage("jl_lingren_damage", map, true);
                    await player.draw(drawNum);
                    player.addTempSkill("new_rejianxiong", { player: "phaseBegin" });
                    player.addTempSkill("rexingshang", { player: "phaseBegin" });
                    game.log(player, "获得了技能", "#g【奸雄】", "#g【行殇】");
                },
                ai: {
                    threaten: 2,
                },
                "skill_id": "jl_lingren",
                "_priority": 0,
            },
            "jl_lingren_damage": {
                audio: "ext:扩展1:2",
                charlotte: true,
                onremove: true,
                init: function(player, skill) {
                    player.storage[skill] = {};
                },
                trigger: {
                    source: "damageBegin1",
                },
                forced: true,
                popup: false,
                logTarget: "player",
                filter: function(event, player) {
                    var map = player.getStorage("jl_lingren_damage", {});
                    return map[event.player.playerid] > 0;
                },
                async content(event, trigger, player) {
                    var map = player.getStorage("jl_lingren_damage", {});
                    var num = map[trigger.player.playerid] || 0;
                    delete map[trigger.player.playerid];
                    if (!Object.keys(map).length) {
                        player.removeSkill("jl_lingren_damage");
                    } else {
                        player.setStorage("jl_lingren_damage", map, true);
                    }
                    trigger.num += num;
                },
                "skill_id": "jl_lingren_damage",
                "_priority": 0,
            },
            "jl_fujian": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: ["phaseZhunbeiBegin","phaseJieshuBegin"],
                },
                filter: function(event, player) {
                    return game.hasPlayer(function(target) { return target != player && target.countCards("h"); });
                },
                prompt: function(event, player) {
                    return "是否发动「伏间」观看并获得一名其他角色至多两张手牌？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var result = await player.chooseTarget("伏间：选择一名其他角色", true, function(card, p, target) {
                        return target != p && target.countCards("h") > 0;
                    }).set("ai", function(target) { return -get.attitude(get.player(), target); }).forResult();
                    if (!result.bool) return;
                    var target = result.targets[0];
                    player.logSkill("jl_fujian", target);
                    var maxGet = Math.min(2, target.countCards("h"));
                    var r2 = await player.chooseButton(["伏间：获得" + get.translation(target) + "至多两张手牌", target.getCards("h")], [1, maxGet])
                        .set("ai", function(button) { return get.value(button.link); }).forResult();
                    if (!r2.bool || !r2.links || !r2.links.length) return;
                    var cards = r2.links;
                    await player.gain(cards, target, "giveAuto");
                    var colors = cards.map(function(c) { return get.color(c, target); }).filter(function(c) { return c; });
                    if (colors.length) {
                        var same = colors.every(function(c) { return c == colors[0]; });
                        if (same) {
                            player.line(target, "fire");
                            target.damage(1, player);
                        }
                    }
                },
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_fujian",
                "_priority": 0,
            },
            "jl_tianxiang": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "damageBegin4",
                },
                usable: 2,
                filter: function(event, player) {
                    return event.num > 0 && player.countCards("h") > 0;
                },
                prompt: function(event, player) {
                    return "是否发动「天香」弃置一张手牌防止此伤害，令一名其他角色失去1点体力并获得你弃置的牌？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    var r1 = await player.chooseCard("h", true, "天香：弃置一张手牌").set("ai", function(card) {
                        return 5 - get.value(card);
                    }).forResult();
                    if (!r1.bool) return;
                    var r2 = await player.chooseTarget("天香：选择一名其他角色令其失去1点体力并获得弃置的牌", true, lib.filter.notMe)
                        .set("ai", function(target) { return -get.attitude(_status.event.player, target); }).forResult();
                    if (!r2.bool) return;
                    var target = r2.targets[0];
                    var card = r1.cards[0];
                    trigger.cancel();
                    player.logSkill("jl_tianxiang", target);
                    await player.discard(card);
                    target.loseHp();
                    if (card.isInPile()) await target.gain(card, "gain2");
                },
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_tianxiang",
                "_priority": 0,
            },
            "jl_hongyan": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "loseAfter",
                },
                usable: 3,
                filter: function(event, player) {
                    if (event.type != "discard" || event.getlx === false) return false;
                    // 仅“你的牌”（手牌+装备区）被弃才触发，判定区不算
                    var mine = (event.hs || []).concat(event.es || []);
                    if (!mine.length) return false;
                    return event.cards.some(function(card) {
                        return mine.includes(card) && get.position(card, true) == "d";
                    });
                },
                prompt: function(event, player) {
                    return "是否发动「红颜」摸两张牌？";
                },
                check: function(event, player) {
                    return true;
                },
                async content(event, trigger, player) {
                    await player.draw(2);
                },
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_hongyan",
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
            "jl_juejing": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: ["phaseZhunbeiBegin","phaseJieshuBegin","dying","dyingAfter"],
                },
                usable: 3,
                filter(event, player, name) {
                    return player.isIn();
                },
                prompt(event, player, name) {
                    if (name == "dying") return "绝境：是否摸2~4张牌并回复1点体力以脱离濒死？";
                    if (name == "dyingAfter") return "绝境：是否摸2~4张牌并回复1点体力？";
                    return "绝境：是否摸2~4张牌并回复1点体力？";
                },
                check(event, player) {
                    return player.hp < player.maxHp || player.countCards("h") < 4;
                },
                async content(event, trigger, player) {
                    var r = await player.chooseControl("2张", "3张", "4张").set("prompt", "绝境：选择摸牌数").set("ai", function() {
                        var player = _status.event.player;
                        return player.hp <= 1 ? 2 : (player.countCards("h") < 3 ? 2 : 0);
                    }).forResult();
                    var map = { "2张": 2, "3张": 3, "4张": 4 };
                    var n = map[r.control] || 2;
                    await player.draw(n);
                    if (player.isDamaged()) await player.recover(1);
                },
                ai: {
                    threaten: 1.5,
                },
                "skill_id": "jl_juejing",
                "_priority": 0,
            },
            "jl_longhun": {
                audio: "ext:扩展1:2",
                group: ["jl_longhun_buff","jl_longhun_gain"],
                "skill_id": "jl_longhun",
                "_priority": 0,
            },
            "jl_longhun_buff": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: "useCard",
                },
                filter(event, player) {
                    return (event.card.name == "sha" || event.card.name == "tao");
                },
                prompt(event, player) {
                    return "龙魂：是否令此" + get.translation(event.card) + (event.card.name == "sha" ? "的伤害值" : "的回复值") + "+1~3？";
                },
                check(event, player) { return true; },
                async content(event, trigger, player) {
                    var r = await player.chooseControl("+1", "+2", "+3").set("prompt", "龙魂：选择增加的数值").set("ai", function() {
                        return 0;
                    }).forResult();
                    var map = { "+1": 1, "+2": 2, "+3": 3 };
                    var n = map[r.control] || 1;
                    trigger.baseDamage += n;
                    game.log(player, "发动龙魂，令", trigger.card, (trigger.card.name == "sha" ? "伤害值" : "回复值"), "+", n);
                },
                sub: true,
                sourceSkill: "jl_longhun",
                "skill_id": "jl_longhun_buff",
                "_priority": 0,
            },
            "jl_longhun_gain": {
                audio: "ext:扩展1:2",
                trigger: {
                    player: ["useCardAfter","respondAfter"],
                },
                filter(event, player) {
                    if (event.card.name != "shan" && event.card.name != "wuxie") return false;
                    var target = _status.currentPhase;
                    if (!target || target == player || !target.isIn()) return false;
                    return target.countGainableCards(player, "he") > 0;
                },
                prompt(event, player) {
                    return "龙魂：是否获得" + get.translation(_status.currentPhase) + "至多两张牌？";
                },
                check(event, player) { return get.attitude(player, _status.currentPhase) < 0; },
                async content(event, trigger, player) {
                    var target = _status.currentPhase;
                    player.line(target, "green");
                    await player.gainPlayerCard(target, "he", [1, 2], true);
                },
                sub: true,
                sourceSkill: "jl_longhun",
                "skill_id": "jl_longhun_gain",
                "_priority": 0,
            },
        },
        translate: {
            "ext1_mocansi": "魔残肆",
            "ext1_mocansi_info": "准备阶段，你可以回复1点体力，然后你可以令一名其他角色回复1点体力并视为对其使用三张【杀】/【决斗】/【火攻】（每次均可自由选择）。在此期间，你每造成1点伤害便摸两张牌。",
            "ext1_mofozong": "魔佛宗",
            "ext1_mofozong_info": "锁定技，其他角色获得手牌后，若其手牌数大于7，其将X张手牌置于其武将牌上（X为其手牌数-7）。然后若其武将牌上的“魔佛宗”牌数不小于7，你选择一项：⒈获得这些牌并令其回复1点体力；⒉令其失去1点体力。",
            "jl_shanjia": "缮甲",
            "jl_shanjia_info": "每名角色的回合开始时，你可以摸2-4张牌（自选）；若此时是你的回合，你可以视为使用一张无视距离、不可响应且伤害增加1-2点（自选）的【杀】。",
            "jl_xiaorui": "骁锐",
            "jl_xiaorui_info": "每回合限四次，当你造成伤害时，你可以先随机获得受伤目标2-4张牌（自选张数），然后令此伤害增加2-4点（自选点数）。",
            "jl_falu": "法箓",
            "jl_falu_info": "结束阶段，你可以随机获得牌堆中四种花色的牌各一张。若你因此获得了点数相同的牌，你回复1点体力并对至多两名其他角色各造成1点伤害。",
            "jl_dianhua": "点化",
            "jl_dianhua_info": "准备阶段，你可以观看牌堆顶的四张牌，然后以任意顺序放回牌堆顶。",
            "jl_zhenyi": "真仪",
            "jl_zhenyi_info": "当你对其他角色造成伤害时，你可以令此伤害+1，然后随机获得其一张牌；当你受到其他角色造成的伤害时，你可以防止此伤害，然后你随机弃置伤害来源两张牌。（每个效果每回合各限触发2次）",
            "jl_fanghun": "芳魂",
            "jl_fanghun_info": "当你使用或打出的【杀】或【闪】进入弃牌堆时，你可以获得此牌，然后你可以弃置一名其他角色至多3张牌，并摸1~3张牌，再对其造成1点伤害。（每回合限触发3次）",
            "jl_fuhan": "扶汉",
            "jl_fuhan_info": "当你造成或受到伤害后，你可以随机获得一个蜀国武将技能直到你的下回合开始时。若你已因此获得3个技能，则改为回复1点体力并摸两张牌。（每回合限触发3次）",
            "jl_fange": "反戈",
            "jl_fange_info": "当你受到伤害后，你可以摸两张牌，然后获得伤害来源一至两张牌，再对伤害来源造成1~2点伤害。",
            "jl_xunlie": "寻猎",
            "jl_xunlie_info": "一名角色的回合结束时，你可以选择一项：令其回复1点体力并摸两张牌；或对其造成1点伤害并随机弃置两张牌。（每轮限触发两次）",
            "jl_xiefang": "撷芳",
            "jl_xiefang_info": "出牌阶段开始时，你可以获得以下效果：摸X张牌、此阶段计算与其他角色的距离-X、此阶段可以多使用X张【杀】，且【杀】的伤害+X（此阶段限触发2次），X为场上女性角色数+1。",
            "jl_zhengnan": "征南",
            "jl_zhengnan_info": "一名角色受到伤害后，若其体力值小于等于你，你可以摸1~3张牌，然后在“武圣”、“当先”、“制蛮”里选择并获得一个技能直到你的下个回合结束（每回合每名角色限触发一次），若未获得技能（已经选完）则你回复1点体力。",
            "jl_dangxian": "当先",
            "jl_dangxian_info": "锁定技，回合开始时，你执行一个额外的出牌阶段。此阶段开始时，你可以失去1点体力并获得一张【杀】。",
            "jl_lingren": "凌人",
            "jl_lingren_info": "你使用【杀】或伤害类锦囊牌指定目标后，你可以选择其中一个目标使此牌对其伤害+1~2，然后你摸1~3张牌，并且你获得“奸雄”、“行殇”直到你下回合开始。（每回合限触发2次）",
            "jl_fujian": "伏间",
            "jl_fujian_info": "准备阶段或结束阶段，你可以观看一名其他角色的手牌，然后你可以获得其中至多两张牌，若颜色相同，对其造成1点伤害。",
            "jl_tianxiang": "天香",
            "jl_tianxiang_info": "当你受到伤害时，你可以弃置一张手牌，防止此次伤害并选择一名其他角色，令其失去1点体力，然后其获得你弃置的牌。（每回合限触发两次）",
            "jl_hongyan": "红颜",
            "jl_hongyan_info": "当你弃置你的牌时，你可以摸两张牌。（每回合限触发三次）",
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
            "jl_juejing": "绝境",
            "jl_juejing_info": "准备阶段、结束阶段或当你进入或脱离濒死状态时，你可以摸二至四张牌并回复1点体力（每回合限三次）。",
            "jl_longhun": "龙魂",
            "jl_longhun_info": "你使用【杀】或【桃】时，可以令此牌伤害或回复值+1~3，且你使用【闪】或【无懈可击】时，可以获得当前回合角色至多两张牌。",
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
    version: "1.6.2",
},files:{"character":["mozarong.gif","jl_guansuo.jpg","reshen_dengai.jpg","jl_xiaoqiao.jpg","jl_caoying.jpg","jl_zhangqiying.jpg","jl_zhaoxiang.jpg","re_caoxian.jpg","jl_shen_zhaoyun.jpg","jl_nianshou.jpg"],"card":[],"skill":[],"audio":[]}} 
};
