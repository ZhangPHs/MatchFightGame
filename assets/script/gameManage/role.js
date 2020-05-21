cc.Class({
    extends: cc.Component,

    properties: {
        LeftButton: cc.Node,
        RightButton: cc.Node,
        UpButton: cc.Node,
        DownButton: cc.Node,
    },

    onLoad () {
        this.setEvent(this.RightButton);
    },

    start () {
        this.power = 10;
        this.body = this.getComponent(cc.RigidBody);
    },

    setEvent(node) {
        node.on("touchstart", this.touchStart, this);
        node.on("touchend", this.touchEnd, this);
        node.on("touchcancle", this.touchCancle, this);
    }, 

    touchStart(e) {
        let name = e.target.name;
        switch(name) {
            case "right":
                this.body.applyLinearImpulse(cc.v2(500, 0), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), true);
                break;
            case "left":
                this._speed.x = -15;
                break;
            case "up":
                this._speed.y = 15;
                break;
            case "down":
                this._speed.y = -15;
                break;
        }
    },

    touchEnd(e) {
        console.log("end");
    },

    update (dt) {
    },
});
