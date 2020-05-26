// 绑于敌方的身体部位（头部），用于控制敌人的自主移动

cc.Class({
    extends: cc.Component,

    properties: {
        // 分别绑定player和enemy的身体部位，用于识别
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
        // schedule回调函数（cocos自带的schedule定时器）
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
        // 攻击函数，朝着player施加力的作用
        let enemybody = this.enemyBall.getComponent(cc.RigidBody)
        let epos = enemybody.getWorldPosition()

        let playerbody = this.playerBall.getComponent(cc.RigidBody)
        let pos = playerbody.getWorldPosition()

        let ratio = 15

        let dir = cc.v2(pos.x-epos.x, pos.y-epos.y).mulSelf(ratio)

        enemybody.applyForce(dir, pos)
//        console.log("make attack")
    },

    back(){
        // 后退函数，远离player
        let enemybody = this.enemyBall.getComponent(cc.RigidBody)
        let epos = enemybody.getWorldPosition()

        let playerbody = this.playerBall.getComponent(cc.RigidBody)
        let pos = playerbody.getWorldPosition()

        let ratio = 15

        let dir = cc.v2(epos.x - pos.x, epos.y - pos.y).mulSelf(ratio)

        enemybody.applyForce(dir, pos)
//        console.log("make back")
    }

});

