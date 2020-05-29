
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
            cc.find('dataN').getComponent('settingManage').score += cc.find('dataN').getComponent('settingManage').unit * 10000 + cc.find('dataN').getComponent('settingManage').difficulty * 20000
            console.log(cc.find('dataN').getComponent('settingManage').score)
        }
    },

    start () {

    },

    // update (dt) {},
});
