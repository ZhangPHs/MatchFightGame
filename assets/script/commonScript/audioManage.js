// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
        console.log(" audioManage onload")
        this.bgmStop()
        this.bgmPlay()
    },

    bgmStop(){
        console.log("stop")
        cc.audioEngine.stop(this.bgmAudioId)
    },

    bgmPlay(){
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
        cc.loader.loadRes(file,cc.AudioClip,(err,clip)=>{
            this.bgmAudio = clip
            cc.audioEngine.play(this.bgmAudio, true, 0.3)
        })
        
    },

    soundPlay(){
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
        cc.loader.loadRes(file,cc.AudioClip,(err,clip)=>{
            this.soundAudio = clip
            cc.audioEngine.play(this.soundAudio, false, 1)
        })
    },

    changeBackgroundMusic(event, data){
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
    },

    changeSoundEffect(event, data){
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

    start () {
        console.log("start")

    },

    // update (dt) {},

    onDestroy(){
        //this.player.bgmStop()
    }
});
