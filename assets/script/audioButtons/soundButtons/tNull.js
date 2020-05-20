// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = cc.find("dataN"); // 这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "audioManage";// 这个是代码文件名
            clickEventHandler.handler = "changeSoundEffect";
            clickEventHandler.customEventData = "-1";
            
            var button = this.node.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
    },

    start () {

    },

    // update (dt) {},
});
