
cc.Class({
    extends: cc.Component,

    properties: {
        difficulty: 1,//游戏难度
        unit: 1,//关卡数
        continue_game: true,//是否可以继续闯关
        score: 0,//存储这次游戏的分数
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
