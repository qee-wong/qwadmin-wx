<template lang="">
    <div>
        msg {{ msg }}
         {{this.$store.state.togo.name}}
    </div>
</template>

<script>
import { queryTest,queryRolesTree } from '@/api/togo'
import Vue from 'vue'
import Qs from 'qs'

export default {
    name: 'Main',
    data () {
        return {
            msg: 'Main',
        }
    },
    methods: {
        beforeInit() {
            console.log(this.$store.state.togo.name)
            queryTest(this.$store.state.togo.name).then(res => {
                console.log(res)
            }).catch(err => {
                this.loading = false
                console.log(err.response.data.message)
            })
             
            
        },
        jsskrequest(){
            var url = window.location.toLocaleString()
            var data = Qs.stringify({url:url})
            //JS-SDK 认证请求
            Vue.http.post('http://193.169.100.166:8000/jspapi/1000006',data).then((res) => {
            //Vue.wechat.config(res)
            console.log(res.data);
            Vue.wechat.config({
                beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，企业微信的corpID
                timestamp:res.data.timestamp , // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
                jsApiList: ['checkJsApi','chooseImage','getLocation'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
            });
            Vue.wechat.checkJsApi({
                jsApiList: ['chooseImage',"getLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    debugger
                    console.log('qwlog22:-------');
                    // console.log(res);
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
            Vue.wechat.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    //alert(networkType);
                }
            });
            Vue.wechat.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    //alert('log2222222222:-------');
                    //console.log(latitude);
                    //console.log(latitude);
                }
            });
            Vue.wechat.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                console.log('ready!!!!')
                Vue.wechat.getNetworkType({
                    success: function (res) {
                    console.log("qwq+++++++++");
                    console.log(res.networkType);
                    },
                    fail: function (res) {
                    console.log("qwqerrror");
                    console.log(JSON.stringify(res));
                    }
                });
            });
            Vue.wechat.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res)
            });
        });
        }
    },
    created(){
        this.beforeInit()
        this.jsskrequest()
    },
  
}
</script>

<style scoped>

</style>
