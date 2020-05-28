window.G = {
    userInfo: null,
}
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad() {
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '进入游戏',
            style: {
                left: 250,
                top: 150,
                width: 200,
                height: 80,
                lineHeight: 80,
                backgroundColor: '#222222',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 30,
                borderRadius: 10
            }
        })
        console.log('login onload')
        wx.login({
            success: res => {
                if (res.code) {
                    console.log('登陆成功')
                    button.onTap((res) => {
                        console.log(res)
                        if (res.errMsg == 'getUserInfo:ok') {
                            button.destroy()
                            console.log('授权了')
                            G.userInfo = res.userInfo
                            if (G.userInfo) {
                                console.log(G.userInfo)
                                cc.director.loadScene('homePage')
                            } else {
                                console.log('userInfo is null ');
                            }
                        }
                        else {
                            console.log('授权失败')
                        }
                    })

                }
            }
        })
    },

    start() {

    },

    // update (dt) {},
});
