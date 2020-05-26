// 该脚本用于将dataN设置为常驻节点

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node)
        // 预加载场景，提高效率
        cc.director.preloadScene("settingPage", function(){
            console.log("settingPage preloaded")
        })
        cc.director.preloadScene("gamePage", function(){
            console.log("gamePage preloaded")
        })
    },

    start () {

    },

    // update (dt) {},
});
