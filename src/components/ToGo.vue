<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <h2>Essential Links qw</h2>
    
    <div>
      <msg :title='msg' :description="'内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现'" :buttons="buttons" :icon="icon"></msg>
    </div>
    <router-view></router-view>
  </div>
</template>

 

<script>
import { Msg, Divider, XButton } from 'vux'
import Vue from 'vue'
import { WechatPlugin, AjaxPlugin } from 'vux'

Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)

import Qs from 'qs'
import axios from 'axios'
import { debug } from 'util';


export default {
  name: 'ToGo',
   
  components: {
    Msg,
    Divider,
    XButton
  },
  methods: {
    changeIcon () {
      if (!this.icon || this.icon === 'success') {
        this.icon = 'warn'
        return
      }
      if (this.icon === 'warn') {
        this.icon = 'info'
        return
      }
      if (this.icon === 'info') {
        this.icon = 'waiting'
        return
      }
      if (this.icon === 'waiting') {
        this.icon = 'success'
      }
    }
  },
  data () {
    return {
      msg: 'TOGO ！',
      description: 'msg description',
      icon: '',
      buttons: [{
        type: 'primary',
        text: 'Primary button',
        onClick: this.changeIcon.bind(this)
      }]
    }
  },
  created(){
    
    var url = window.location.toLocaleString()
    var data = Qs.stringify({url:url})


    //服务端api 身份认证，根据code获取当前用户基本信息
    var code = GetUrlParam("code")
    var CORPID = "ww50da71f4b12b0af1"
    var REDIRECT_URI = "http%3A%2F%2Fb682d120.ngrok.io";
    var weixinurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${CORPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`


    if(code=='' || code == undefined) {
      window.location.href = weixinurl;
    }else{
      
      this.$store.dispatch('GetWxUserBycode', {code}).then((value) => {
        //this.loading = false
        const userId = value.user.userId
        if(value.token=='no_token'){
          this.$router.push({ path: this.redirect || `/setrole/${userId}` })
        }else if(value.token!='no_token'){
          const userId = value.user.username
          this.$router.push({ path: this.redirect || `/main/${userId}`  })
        }
      }).catch(() => {
        //this.loading = false
      })

      //JS-SDK 认证请求
      Vue.http.post('http://193.169.100.166:8000/jspapi/1000006',data).then((res) => {
          //Vue.wechat.config(res)
          //console.log(res.data);
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
                  // debugger
                  console.log('qwlog:-------');
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
      });
    }

  }

}

function GetUrlPara(){
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("?");

　　　　var para = arrUrl[1];
　　　　return para;
}

function GetUrlParam(paraName) {
　　　var url = document.location.toString();
　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
