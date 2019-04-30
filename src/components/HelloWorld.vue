<template>
  <div class="hello">
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

export default {
  name: 'HelloWorld',
   
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
      msg: 'lll ！',
      description: 'msg description',
      icon: '',
      buttons: [{
        type: 'primary',
        text: 'Primary button',
        onClick: this.changeIcon.bind(this)
      }, {
        type: 'default',
        text: 'Secondary button',
        link: '/demo'
      }]
    }
  },
  created(){
    // this.$http.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods').then(({data}) =>{
    //     console.log(data);
    // })
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
