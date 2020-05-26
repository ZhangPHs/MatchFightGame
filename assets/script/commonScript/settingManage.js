
cc.Class({
    extends: cc.Component,

    properties: {
        difficulty: 1
        
    },

    onLoad () {

    },

    start () {

    },

    changeDifficulty(event, data){
        // 更改当前游戏难度
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
