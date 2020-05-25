cc.Class({
    extends: cc.Component,

    properties: {
        // player: {
        //     default: null,
        //     type: cc.Node
        // },
        ball: {
            default: null,
            type: cc.Node
        },
        maxSpeed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // hide FPS info
        cc.debug.setDisplayStats(false);

        // get joyStickBtn
        this.joyStickBtn = this.node.children[0]; 

        // Player's move direction
        this.dir = cc.v2(0, 0);

        // touch event
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
    },

    onDestroy() {
        // touch event
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) {
        // when touch starts, set joyStickBtn's position 
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.joyStickBtn.setPosition(pos);
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
                
        // get direction
        this.dir = this.joyStickBtn.position.normalize();
    },

    onTouchEnd(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
    },

    onTouchCancel(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
    },

    update (dt) {
        // get ratio
        let len = this.joyStickBtn.position.mag(); //摇杆移动的位置相对圆盘中心的向量长度
        let maxLen = this.node.width / 2; //圆盘的半径
        let ratio = len / maxLen; //获取摇杆移动的向量长度除以圆盘半径的比例

        // restrict joyStickBtn inside the joyStickPanel
        if (ratio > 1) {
            this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
        }

        // move Player
        let dis = this.dir.mul(this.maxSpeed * ratio*1500);
        
        //对球的处理
        this.ball_body = this.ball.getComponent(cc.RigidBody)
        this.ball_body.applyForceToCenter(dis)
    },
});
