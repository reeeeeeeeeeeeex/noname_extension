import { lib, game, ui, get, ai, _status } from "noname";
export const type = "extension";
export default function(){
	return {name:"将灵",editable:true,connect:false,arenaReady:function(){

},content:function(config,pack){

},prepare:function(){
},precontent:function(){
    if (lib.namePrefix) {
        lib.namePrefix.set("将灵", { color: "#c3f9ff", nature: "thundermm" });
    }
},help:{},config:{},package:{
    character: {
        character: {
            "jl_caochun": {
                sex: "male",
                group: "wei",
                hp: 5,
                maxHp: 5,
                skills: ["jl_shanjia","jl_xiaorui"],
                img: "extension/将灵/caochun.jpg",
                dieAudios: ["ext:将灵/audio/die/jl_caochun.mp3"],
            },
            "jl_zhangqiying": {
                sex: "female",
                group: "qun",
                hp: 4,
                maxHp: 4,
                skills: ["jl_falu","jl_dianhua","jl_zhenyi"],
                img: "extension/将灵/jl_zhangqiying.jpg",
                hujia: 0,
                dieAudios: ["ext:将灵/audio/die/jl_zhangqiying.mp3"],
            },
            "jl_zhaoxiang": {
                sex: "female",
                group: "shu",
                hp: 5,
                maxHp: 5,
                skills: ["jl_fanghun","jl_fuhan"],
                img: "extension/将灵/jl_zhaoxiang.jpg",
                hujia: 0,
                dieAudios: ["ext:将灵/audio/die/jl_zhaoxiang.mp3"],
            },
            "jl_nianshou": {
                sex: "male",
                group: "shen",
                hp: 4,
                maxHp: 4,
                skills: ["jl_fange","jl_xunlie"],
                img: "extension/将灵/jl_nianshou.jpg",
                hujia: 0,
                dieAudios: ["ext:将灵/audio/die/jl_nianshou.mp3"],
            },
            "jl_guansuo": {
                sex: "male",
                group: "shu",
                hp: 5,
                maxHp: 5,
                skills: ["jl_xiefang","jl_zhengnan"],
                img: "extension/将灵/jl_guansuo.jpg",
                hujia: 0,
                dieAudios: ["ext:将灵/audio/die/jl_guansuo.mp3"],
            },
            "jl_caoying": {
                sex: "female",
                group: "wei",
                hp: 5,
                maxHp: 5,
                skills: ["jl_lingren","jl_fujian"],
                img: "extension/将灵/jl_caoying.jpg",
                hujia: 0,
                dieAudios: ["ext:将灵/audio/die/jl_caoying.mp3"],
            },
            "jl_xiaoqiao": {
                sex: "female",
                group: "wu",
                hp: 4,
                maxHp: 4,
                skills: ["jl_tianxiang","jl_hongyan"],
                img: "extension/将灵/jl_xiaoqiao.jpg",
                hujia: 0,
                dieAudios: ["ext:将灵/audio/die/jl_xiaoqiao.mp3"],
            },
            "jl_shen_zhaoyun": {
                sex: "male",
                group: "shen",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["jl_juejing","jl_longhun"],
                img: "extension/将灵/jl_shen_zhaoyun.jpg",
                dieAudios: ["ext:将灵/audio/die/jl_shen_zhaoyun.mp3"],
            },
        },
        translate: {
            "jl_caochun": "将灵曹纯",
            "jl_caochun_prefix": "将灵",
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
            "jl_shen_zhaoyun": "将灵神赵云",
            "jl_shen_zhaoyun_prefix": "将灵|神",
            "将灵": "将灵",
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
            "jl_shanjia": {
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
                group: ["jl_zhenyi_damage","jl_zhenyi_defend"],
                "skill_id": "jl_zhenyi",
                "_priority": 0,
            },
            "jl_zhenyi_damage": {
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
            "jl_juejing": {
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
                group: ["jl_longhun_buff","jl_longhun_gain"],
                "skill_id": "jl_longhun",
                "_priority": 0,
            },
            "jl_longhun_buff": {
                audio: "ext:将灵:2",
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
                audio: "ext:将灵:2",
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
            "jl_juejing": "绝境",
            "jl_juejing_info": "准备阶段、结束阶段或当你进入或脱离濒死状态时，你可以摸二至四张牌并回复1点体力（每回合限三次）。",
            "jl_longhun": "龙魂",
            "jl_longhun_info": "你使用【杀】或【桃】时，可以令此牌伤害或回复值+1~3，且你使用【闪】或【无懈可击】时，可以获得当前回合角色至多两张牌。",
        },
    },
    intro: "",
    author: "nihility",
    diskURL: "",
    forumURL: "",
    version: "1.0.0",
},files:{"character":["caochun.jpg","jl_zhangqiying.jpg","jl_zhaoxiang.jpg","jl_nianshou.jpg","jl_guansuo.jpg","jl_caoying.jpg","jl_xiaoqiao.jpg","jl_shen_zhaoyun.jpg"],"card":[],"skill":[],"audio":[]}}
};
