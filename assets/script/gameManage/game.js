// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gameOverLabel: cc.Node,
        enemyBlood: cc.Node,
        enemy: cc.Node,
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true; // 开启物理引擎
        cc.director.getPhysicsManager().gravity = cc.v2(0, -100);

        cc.view.enableRetina(true) ;
        cc.view.resizeWithBrowserSize(true);

        // 只影响定时器的时间间隔
        // cc.director.getScheduler().setTimeScale(0.01);
        let _this = this
        this.node.on("judgeGameOver",function(event){
            let judgeFlag = event.getUserData()
            _this.GameOverControll(judgeFlag)
        })
    },

    start () {
    },

    // 当游戏执行时执行的函数
    GameOverControll(judgeFlag) {
        // 游戏暂停，但文本动画也会暂停
        // cc.director.pause();
        this.gameOverLabel.active = true
        let label  = this.gameOverLabel.getComponent(cc.Label)
        if(judgeFlag)   label.string = "You Win!"
        else    label.string = "You Lose!"
        label.schedule(function() {
            label.fontSize += 0.1
            if(label.fontSize > 99)cc.director.loadScene("homePage")
        }, 0.5, 100, 0.3)
        
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
