// 存放了更改场景的一些函数（所有场景已经被预加载，这里load可以直接切换）。

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //G是在login场景的一个全局变量，来存储微信用户的一些信息，这里想着之后会记录用户达到第几关
        //可能还会用到云存储
        // console.log(G)
        // 加载 SpriteFrame
        var self = this;
        // console.log(G.userInfo.avatarUrl)这个变量存储的是微信头像的url，但我加载不到组件上。。。
        //这里想把用户的微信头像加载到主页上，但是加载不上
        // cc.loader.loadRes({url:G.userInfo.avatarUrl, type: 'png'}, cc.SpriteFrame, function (err, data) {
        //     self.node.children[2].getComponent(cc.Sprite).spriteFrame = data;
        // });
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
    }
});
