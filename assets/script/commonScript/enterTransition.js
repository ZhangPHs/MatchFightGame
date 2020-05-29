
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
        console.log(cc.find('dataN').getComponent('settingManage'))
        console.log(cc.find('dataN').getComponent('settingManage').continue_game)
        if(!cc.find('dataN').getComponent('settingManage').continue_game) {
            //游戏不能继续
            //渲染抱歉的提示信息
            this.node.getChildByName('tip').getComponent(cc.Label).string = '抱歉，闯关失败'
            //取消下一关的按钮
            this.node.getChildByName('nextunit').destroy()
        }
        else {
            //游戏继续
            //渲染恭喜的提示信息
            this.node.getChildByName('tip').getComponent(cc.Label).string = '恭喜，闯关成功'
        }
    },

    start () {

    },

    // update (dt) {},
});
