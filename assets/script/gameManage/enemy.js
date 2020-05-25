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
        enemyBall: {
            default: null,
            type: cc.Node
        },
        playerBall:{
            default: null,
            type: cc.Node
        },
        vec: cc.v2(0,0),
        flag: true
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let interval = 1.5
        let repeat = 1000
        let delay = 0.1
        this.schedule(function(){
            this.callback()
        }, interval, repeat, delay)
    },

    callback(){
        if(this.node.getComponent("attribute").HP <= 0)
            this.unschedule(this.callback)
        if(this.flag == true){
            this.schedule(function(){
                this.attack()
            },0,100,0.1)
            this.flag = false
        }else{
            this.schedule(function(){
                this.back()
            },0,100,0.1)
            this.flag = true
        }
    },

    attack(){
        
        let enemybody = this.enemyBall.getComponent(cc.RigidBody)
        let epos = enemybody.getWorldPosition()

        let playerbody = this.playerBall.getComponent(cc.RigidBody)
        let pos = playerbody.getWorldPosition()

        let ratio = 25

        dir = cc.v2(pos.x-epos.x, pos.y-epos.y).mulSelf(ratio)

        enemybody.applyForce(dir, pos)
        console.log("make attack")
    },

    back(){
        let enemybody = this.enemyBall.getComponent(cc.RigidBody)
        let epos = enemybody.getWorldPosition()

        let playerbody = this.playerBall.getComponent(cc.RigidBody)
        let pos = playerbody.getWorldPosition()

        let ratio = 25

        dir = cc.v2(epos.x - pos.x, epos.y - pos.y).mulSelf(ratio)

        enemybody.applyForce(dir, pos)
        console.log("make back")
    },
    update (dt) {

    },
});

