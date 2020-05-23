const UnitHP = 8;

cc.Class({
    extends: cc.Component,

    properties: {
        selfNode : cc.Node,
        enemyNode : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        body = this.rigidbody;
    },

    start () {

    },

    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.group == "enemy"){
            switch(selfCollider.node._name) {
                case "头":
                    switch(otherCollider.node._name) {
                        case "头":
                            console.log("twoHeadHit");
                            this.twoHeadHit(this.selfNode, this.enemyNode, contact, selfCollider, otherCollider);
                            break;
                        case "躯干":
                        case "小肚子":
                        case "骻":
                            console.log("headHitBody");
                            this.headHitBody(this.selfNode, this.enemyNode, contact, selfCollider, otherCollider);
                            break;
                        case "左手":
                        case "左手前":
                        case "右手":
                        case "右手前":
                        case "左手":
                        case "左腿":
                        case "左腿前":
                        case "右腿":
                        case "右腿前":
                            console.log(contact);
                            console.log("headGetHit");
                            this.headGetHit(this.enemyNode, this.selfNode, contact, selfCollider, otherCollider);
                            break;
                    }
                    break;
                case "躯干":
                case "小肚子":
                case "骻":
                    break;
                case "左手":
                case "左手前":
                case "右手":
                case "右手前":
                case "左手":
                    break;
                case "左腿":
                case "左腿前":
                case "右腿":
                case "右腿前":
                    break;
            }
        }
    },

    // 两个头相撞
    twoHeadHit(selfNode, otherNode, contact, selfCollider, otherCollider) {
        // 处理碰撞声音，下同
        cc.find("dataN").getComponent("audioManage").soundPlay();

        // 处理碰撞血量，下同
        selfNode.getComponent("attribute").HP -= UnitHP * 3;
        otherNode.getComponent("attribute").HP -= UnitHP * 3;
        console.log(selfNode.getComponent("attribute").HP, otherNode.getComponent("attribute").HP)

        // 处理碰撞作用力，下同
        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        console.log(points, normal);
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -10000, normal.y * -10000), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 10000, normal.y * 10000), cc.v2(points[0].x, points[0].y), true);
    },

    // 头撞到了身体
    headHitBody(headNode, bodyNode, contact) {
        cc.find("dataN").getComponent("audioManage").soundPlay();
        headNode.getComponent("attribute").HP -= UnitHP * 0;
        bodyNode.getComponent("attribute").HP -= UnitHP * 2;
        console.log(headNode.getComponent("attribute").HP, bodyNode.getComponent("attribute").HP)
    },

    // 头被四肢撞到
    headGetHit(headNode, limbNode, contact) {
        cc.find("dataN").getComponent("audioManage").soundPlay();
        headNode.getComponent("attribute").HP -= UnitHP * 3;
        limbNode.getComponent("attribute").HP -= UnitHP * 0;
        console.log(headNode.getComponent("attribute").HP, limbNode.getComponent("attribute").HP)
    },

    // 身体间相撞
    bodyHitBody(selfNode, otherNode, contact) {
        cc.find("dataN").getComponent("audioManage").soundPlay();
        selfNode.getComponent("attribute").HP -= UnitHP * 2;
        otherNode.getComponent("attribute").HP -= UnitHP * 2;
        console.log(selfNode.getComponent("attribute").HP, otherNode.getComponent("attribute").HP)
    },

    // 身体被四肢撞到
    bodyGetHit(bodyNode, limbNode, contact) {
        cc.find("dataN").getComponent("audioManage").soundPlay();
        bodyNode.getComponent("attribute").HP -= 0;
        limbNode.getComponent("attribute").HP -= UnitHP;
        console.log(bodyNode.getComponent("attribute").HP, limbNode.getComponent("attribute").HP)
    },

    // 四肢与四肢相撞
    collision(selfNode, otherNode, contact) {
        cc.find("dataN").getComponent("audioManage").soundPlay();
        selfNode.getComponent("attribute").HP -= 0;
        otherNode.getComponent("attribute").HP -= 0;
        console.log(selfNode.getComponent("attribute").HP, otherNode.getComponent("attribute").HP)
    },

    // update (dt) {},
});
