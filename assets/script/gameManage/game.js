
cc.Class({
    extends: cc.Component,

    properties: {
        gameOverLabel: cc.Node,
    },

    onLoad() {
        cc.director.getPhysicsManager().enabled = true; // 开启物理引擎
        cc.director.getPhysicsManager().gravity = cc.v2(0, -100);

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        // 只影响定时器的时间间隔
        // cc.director.getScheduler().setTimeScale(0.01);

        //判断当前难度.
        let diff = cc.find('dataN').getComponent('settingManage').difficulty
        let blocksN = this.node.getChildByName('bg').getChildByName('blocks')
        if(diff == 2) blocksN.active = true
        else blocksN.active = false

        //获取当前的关卡数
        var unit = cc.find('dataN').getComponent('settingManage').unit
        var difficulty = cc.find('dataN').getComponent('settingManage').difficulty
        console.log('unit', unit)
        console.log('difficulty', difficulty)
        //初始化这局游戏的初始血量
        //设置己方血量
        this.node.getChildByName('blackMatchMan').getComponent('attribute').HP = 100;
        //设置敌方血量，随着难度和关卡数的增加，敌方血量增加
        this.node.getChildByName('blackMatchMan_enemy').getComponent('attribute').HP = unit * 20 + difficulty * 20;
        console.log('己方血量', this.node.getChildByName('blackMatchMan').getComponent('attribute').HP)
        console.log('敌方血量', this.node.getChildByName('blackMatchMan_enemy').getComponent('attribute').HP)
        //显示两秒的第几关提示label
        var interval = 0
        var repeat = 1
        var delay = 3
        // console.log(this.node.getChildByName('GameUI').getChildByName('unitTip').getComponent(cc.Label))
        this.node.getChildByName('GameUI').getChildByName('unitTip').getComponent(cc.Label).string = '第' + unit + '关'
        this.schedule(function () {
            this.node.getChildByName('GameUI').getChildByName('unitTip').getComponent(cc.Label).string = ''
        }, interval, repeat, delay)

        //动态改变敌人的大小，随着关卡数的增加，地方大小变大
        console.log(this.node.getChildByName('blackMatchMan_enemy'))
        this.node.getChildByName('blackMatchMan_enemy').scaleY = 1 + difficulty * 0.3 + unit * 0.2
        let _this = this
        // 注册监听事件，HP归零游戏结束则调用这里的处理函数
        this.node.on("judgeGameOver", function (event) {
            let judgeFlag = event.getUserData()
            _this.GameOverControll(judgeFlag)
        })
    },

    start() {
        
    },

    // 当游戏结束时执行的函数
    GameOverControll(judgeFlag) {
        // 通过传入的参数judgeFlag来判定输赢
        this.gameOverLabel.active = true
        let label = this.gameOverLabel.getComponent(cc.Label)
        if (judgeFlag) {
            label.string = "You Win!"
            cc.find('dataN').getComponent('settingManage').continue_game = true
        }
        else {
            label.string = "You Lose!"
            cc.find('dataN').getComponent('settingManage').continue_game = false
        }
        label.schedule(function () {
            label.fontSize += 0.1
            if (label.fontSize > 60) cc.director.loadScene("transitionPage")
        }, 0.1, 100, 0.3)

    },

    // // 实现血条显示和渐隐
    // showBlood() {
    //     let sprite = this.enemyBlood.getComponent(cc.Sprite);
    //     sprite.fillStart = this.enemy.getComponent("attribute").HP / 100;

    //     let eb = this.enemyBlood;

    //     this.enemyBlood.opacity = 255;
    //     sprite.schedule(function() {
    //         eb.opacity -= 5;
    //     }, 0.03, 51);
    // },

    // update (dt) {},
});
