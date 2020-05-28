// window.WeChat = {}
// //微信登陆注册调用
// WeChat.onRegisterUser = function (_userInfo) {
//     //调用云函数处理注册
//     wx.cloud.callFunction({
//         name: 'login',
//         data: {
//             userInfo: _userInfo,
//         },
//         success: res=> {
//             console.log('登陆成功回调', res)
//             G.userInfo = res.result.data[0].userInfo
//             // cc.director.loadScene('homePage')
//         }
//     })
// }