// 实现摄像机的跟踪

cc.Class({
    extends: cc.Component,

    properties: {
        role: {
            type: cc.Node,
            default: null
        },
        enemy: {
            type: cc.Node,
            default: null
        },
        edge: {
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //console.log("this mainCamera onload")
    },

    start () {               
    },

    update (dt) {
        let role_w_pos = this.role.convertToWorldSpaceAR(cc.v2(0, 0));
        let enemy_w_pos = this.enemy.convertToWorldSpaceAR(cc.v2(0, 0));

        // 更新摄像机的坐标
        let x = (role_w_pos.x + enemy_w_pos.x) / 2; 
        let y = (role_w_pos.y + enemy_w_pos.y) / 2;

        // 判断边界
        let edge = this.edge;
        let edge_w_pos = edge.convertToWorldSpaceAR(cc.v2(0, 0));
        if (x < edge_w_pos.x) 
            x = edge_w_pos.x;
        else if (x > edge_w_pos.x + edge.width)
            x = edge_w_pos.x + edge.width;
        if (y < edge_w_pos.y) 
            y = edge_w_pos.y;
        else if (y > edge_w_pos.y + edge.height)
            y = edge_w_pos.y + edge.height;

        let n_pos = this.node.parent.convertToNodeSpaceAR(cc.v2(x, y));
        this.node.position = n_pos;

        // 更新摄像机的缩放比例
        x = Math.abs(role_w_pos.x - enemy_w_pos.x); 
        y = Math.abs(role_w_pos.y - enemy_w_pos.y);
        let ratio;
        if (x / 960 > y / 640) {
            ratio = Math.abs(x / 960) > 1 ? 1 / Math.abs(x / 960) : 1;
        } else {
            ratio = Math.abs(y / 640) > 1 ? 1 / Math.abs(y / 640) : 1;
        }
        let camera = this.node.getComponent(cc.Camera);
        camera.zoomRatio = ratio;
    },
});
