const UnitHP = 8;

cc.Class({
    extends: cc.Component,

    properties: {
        selfNode : cc.Node,
        enemyNode : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
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
                    switch(otherCollider.node._name) {
                        case "头":
                            this.headHitBody(this.enemyNode, this.selfNode, contact, selfCollider, otherCollider);
                            break;
                        case "躯干":
                        case "小肚子":
                        case "骻":
                            this.bodyHitBody(this.selfNode, this.enemyNode, contact, selfCollider, otherCollider);
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
                            this.bodyGetHit(this.selfNode, this.enemyNode, contact, selfCollider, otherCollider);
                            break;
                    }
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
                    switch(otherCollider.node._name) {
                        case "头":
                            this.headGetHit(this.enemyNode, this.selfNode, contact, selfCollider, otherCollider);
                            break;
                        case "躯干":
                        case "小肚子":
                        case "骻":
                            this.bodyGetHit(this.enemyNode, this.selfNode, contact, selfCollider, otherCollider);
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
                            this.collision(this.selfNode, this.enemyNode, contact, selfCollider, otherCollider);
                            break;
                    }
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
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -5000, normal.y * -5000), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 5000, normal.y * 5000), cc.v2(points[0].x, points[0].y), true);

        /*
        //处理碰撞泛红
        selfsprite = selfNode.children[0].getComponent(cc.Sprite);
        //console.log("selfNode:", selfNode.children[0].getComponent(cc.Sprite))
        cc.loader.loadRes('photo/man_red/head', cc.SpriteFrame,function(err,spriteFrame){

            //创建一个新的节点，因为cc.Sprite是组件不能直接挂载到节点上，只能添加到为节点的一个组件
            var node = new cc.Node('Node')
            //调用新建的node的addComponent函数，会返回一个sprite的对象
            const sprite = node.addComponent(cc.Sprite)
            //给sprite的spriteFrame属性 赋值
            sprite.spriteFrame = spriteFrame
            console.log(sprite.spriteFrame)
            console.log(node)
            console.log(selfNode.children[0])
            node.width = selfNode.children[0].width
            node.height = selfNode.children[0].height

            //把新的节点追加到self.node节点去。self.node，就是脚本挂载的节点

            selfNode.children[0].addChild(node)
        
       })
       */
    },

    // 头撞到了身体
    headHitBody(headNode, bodyNode, contact, selfCollider, otherCollider) {
        // 处理碰撞声音，下同
        cc.find("dataN").getComponent("audioManage").soundPlay();
        
        // 处理碰撞血量，下同
        headNode.getComponent("attribute").HP -= UnitHP * 0;
        bodyNode.getComponent("attribute").HP -= UnitHP * 2;
        console.log(headNode.getComponent("attribute").HP, bodyNode.getComponent("attribute").HP)
        
        // 处理碰撞作用力，下同
        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -3500, normal.y * -3500), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 3500, normal.y * 3500), cc.v2(points[0].x, points[0].y), true);
    },

    // 头被四肢撞到
    headGetHit(headNode, limbNode, contact, selfCollider, otherCollider) {
        // 处理碰撞声音，下同
        cc.find("dataN").getComponent("audioManage").soundPlay();

        // 处理碰撞血量，下同
        headNode.getComponent("attribute").HP -= UnitHP * 3;
        limbNode.getComponent("attribute").HP -= UnitHP * 0;
        console.log(headNode.getComponent("attribute").HP, limbNode.getComponent("attribute").HP)

        // 处理碰撞作用力，下同
        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -4250, normal.y * -4250), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 4250, normal.y * 4250), cc.v2(points[0].x, points[0].y), true);
    },

    // 身体间相撞
    bodyHitBody(selfNode, otherNode, contact, selfCollider, otherCollider) {
        // 处理碰撞声音，下同
        cc.find("dataN").getComponent("audioManage").soundPlay();
        
        // 处理碰撞血量，下同
        selfNode.getComponent("attribute").HP -= UnitHP * 2;
        otherNode.getComponent("attribute").HP -= UnitHP * 2;
        console.log(selfNode.getComponent("attribute").HP, otherNode.getComponent("attribute").HP)

        // 处理碰撞作用力，下同
        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -2000, normal.y * -2000), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 2000, normal.y * 2000), cc.v2(points[0].x, points[0].y), true);
    },

    // 身体被四肢撞到
    bodyGetHit(bodyNode, limbNode, contact, selfCollider, otherCollider) {
        // 处理碰撞声音，下同
        cc.find("dataN").getComponent("audioManage").soundPlay();
                
        // 处理碰撞血量，下同
        bodyNode.getComponent("attribute").HP -= 0;
        limbNode.getComponent("attribute").HP -= UnitHP;
        console.log(bodyNode.getComponent("attribute").HP, limbNode.getComponent("attribute").HP)

        // 处理碰撞作用力，下同
        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -2750, normal.y * -2750), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 2750, normal.y * 2750), cc.v2(points[0].x, points[0].y), true);
    },

    // 四肢与四肢相撞
    collision(selfNode, otherNode, contact, selfCollider, otherCollider) {
        // 处理碰撞声音，下同
        cc.find("dataN").getComponent("audioManage").soundPlay();
                        
        // 处理碰撞血量，下同
        selfNode.getComponent("attribute").HP -= 0;
        otherNode.getComponent("attribute").HP -= 0;
        console.log(selfNode.getComponent("attribute").HP, otherNode.getComponent("attribute").HP)

        // 处理碰撞作用力，下同
        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        selfCollider.body.applyLinearImpulse(cc.v2(normal.x * -3500, normal.y * -3500), cc.v2(points[0].x, points[0].y), true);
        otherCollider.body.applyLinearImpulse(cc.v2(normal.x * 3500, normal.y * 3500), cc.v2(points[0].x, points[0].y), true);
    },

    // update (dt) {},
});
