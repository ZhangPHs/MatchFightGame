cc.Class({
    extends: cc.Component,

    properties: {
        enemy_hand : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        body = this.rigidbody;
    },

    start () {

    },

    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.group == "enemy"){
            // console.log("on colliation");
            // console.log(selfCollider);
            // console.log(otherCollider.node._name);
            // console.log(selfCollider.node.group);
            switch(otherCollider.node._name) {
                case "头":
                    // console.log(cc.find("image_root/fighter/blackMatchMan"));
                    // var response = cc.find("image_root/fighter/blackMatchMan").getComponent('response');
                    // response.makeHit();
                    console.log(this.getParent());
                    response.makeHit();
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


    // update (dt) {},
});
