// 存放了更改场景的一些函数（所有场景已经被预加载，这里load可以直接切换）。

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var self = this;
        //加载用户头像
        cc.loader.load({
            url: G.userInfo.avatarUrl,
            type: "png",
        }, (err, texture) => {
            if (err) {
                console.error(err);
            }
            let userIcon = self.node.getChildByName('headimage')
            if (userIcon) {
                userIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            }
        })
    },

    start() {

    },

    // update (dt) {},

    to_settings: function () {
        cc.director.loadScene("settingPage")
    },

    to_home: function () {
        cc.director.loadScene("homePage")
    },

    to_game: function () {
        cc.director.loadScene("gamePage")
    },

    to_next_unit: function () {
        cc.director.loadScene("gamePage")
    }
});
