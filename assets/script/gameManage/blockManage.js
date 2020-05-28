// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        colMove: {
            default: [],
            type: [cc.Node]
        },
        rowMove: {
            default: [],
            type: [cc.Node]
        },
        rotateScale: {
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        for( let i=0, len = this.colMove.length; i<len;i++)
        {
            this.blockColMove(this.colMove[i])
        }
        for( let i=0, len = this.rowMove.length; i<len;i++)
        {
            this.blockRowMove(this.rowMove[i])
        }
        for( let i=0, len = this.rotateScale.length; i<len;i++)
        {
            this.blockRotateScale(this.rotateScale[i])
        }
    },

    update (dt) {

    },

    blockColMove(node){
        console.log(node)
        cc.tween(node)
            .repeatForever(
                cc.tween()
                    .by(2, {position: cc.v2(0, 600)})
                    .by(2, {position: cc.v2(0, -600)})
            )
            .start()
    },
    blockRotateScale(node){
        cc.tween(node)
            .repeatForever(
                cc.tween()
                    .by(1, {scale: 1, angle: 360 })
                    .by(1, {scale: -1, angle: -360 })
            )
            .start()
    }
});
