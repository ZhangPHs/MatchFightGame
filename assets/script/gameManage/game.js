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
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true; // 开启物理引擎
        cc.director.getPhysicsManager().gravity = cc.v2(0, -100);

        cc.view.enableRetina(true) ;
        cc.view.resizeWithBrowserSize(true);

        // 只影响定时器的时间间隔
        // cc.director.getScheduler().setTimeScale(0.01);
    },

    start () {
        this.GameOverControll();
    },

    // 当游戏执行时执行的函数
    GameOverControll() {
        // 游戏暂停，但文本动画也会暂停
        // cc.director.pause();
        this.gameOverLabel.active = true;
        let label  = this.gameOverLabel.getComponent(cc.Label);
        label.string = "You Win!";
        label.schedule(function() {
            label.fontSize++;
            console.log("font size ++");
        }, 0.01, 20);
    },

    // update (dt) {},
});
