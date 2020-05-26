// 该脚本绑于常驻节点，记录当前播放的bgm和碰撞音效
// 播放的音频由properties中的各自的ID决定！！！
cc.Class({
    extends: cc.Component,

    properties: {
        soundAudio:{
            default: null,
            type: cc.AudioClip
        },
        bgmAudio:{
            default: null,
            type: cc.AudioClip
        },
        soundAudioId: 1,
        bgmAudioId: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bgmStop()
        this.bgmPlay()
    },

    bgmStop(){
        cc.audioEngine.stopAll()
    },

    bgmPlay(){
        // 播放BGM函数
        // 这里由于回调函数的缘故，掺入了播放功能。
        var file = ""
        switch(this.bgmAudioId){
            case 1:
                file = "bgm/bgm1"
                break;
            case 2:
                file = "bgm/bgm2"
                break;
            case 3:
                file = "bgm/bgm3"
                break;
            default:
                this.bgmAudio = null
                return;
        }
        let _this = this
        cc.loader.loadRes(file,cc.AudioClip,(err,clip)=>{
            // 加载对应资源，并在回调函数中进行播放
            _this.bgmAudio = clip
            cc.audioEngine.play(_this.bgmAudio, true, 0.3)
        })
        
    },

    soundPlay(){
        // 播放碰撞音效函数
        var file = ""
        switch(this.soundAudioId){
            case 1:
                file = "soundEffect/t1"
                break;
            case 2:
                file = "soundEffect/t2"
                break;
            case 3:
                file = "soundEffect/t3"
                break;
            case 4:
                file = "soundEffect/t4"
                break;
            default:
                this.soundAudio = null
                return;
        }
        let _this = this
        cc.loader.loadRes(file,cc.AudioClip,(err,clip)=>{
            _this.soundAudio = clip
            cc.audioEngine.play(_this.soundAudio, false, 1)
        })
    },

    changeBackgroundMusic(event, data){
        // 改变BGM，本质是修改id
        this.bgmStop()
        switch(data){
            case "1":
                this.bgmAudioId = 1
                break;
            case "2":
                this.bgmAudioId = 2
                break;
            case "3":
                this.bgmAudioId = 3
                break;
            default:
                this.bgmAudioId = -1
                this.bgmAudio = null
                return;
        }
        this.bgmPlay()
        // 修改完毕后调用播放函数，加载音频
    },

    changeSoundEffect(event, data){
        // 改变碰撞音效
        switch(data){
            case "1":
                this.soundAudioId = 1
                break;
            case "2":
                this.soundAudioId = 2
                break;
            case "3":
                this.soundAudioId = 3
                break;
            case "4":
                this.soundAudioId = 4
                break;
            default:
                this.soundAudioId = -1
                this.soundAudio = null
                return;
        }
        this.soundPlay()
    },

    // update (dt) {},

});
