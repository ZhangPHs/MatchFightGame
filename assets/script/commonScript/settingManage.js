// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        difficulty: 1
        
    },

    onLoad () {
        console.log("settingManage onload")
        cc.director.getPhysicsManager().enabled = true; // 开启物理引擎
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);

        cc.view.enableRetina(true) ;
        cc.view.resizeWithBrowserSize(true);

    },

    start () {

    },

    changeDifficulty(event, data){
        switch(data){
            case "1":
                this.difficulty = 1
                break;
            case "2":
                this.difficulty = 2
                break;
            case "3":
                this.difficulty = 3
                break;
            default:
                break;
        }
    }

    // update (dt) {},
});
