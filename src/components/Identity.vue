<template>
  <div>
    <x-img default-src="/static/images/loading.png" :src='wx_user.avatar' width="100%"></x-img>
    <group>
      <cell title='姓名' :value='wx_user.name'></cell>
      <cell title='邮箱' :value='wx_user.email'></cell>
    </group>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <checklist ref="roleObject"  title="请选择角色" label-position="left" required :options="roles" v-model="roleIds" @on-change="change"></checklist>
    </group>
    <group>
      <div style="padding:15px;">
        <x-button type="primary" :gradients="['#1D62F0', '#19D5FD']" @click.native="handleLoginSubmit">提交</x-button>
      </div>
    </group>
    <div v-transfer-dom>
      <loading :show="show" text="Loading"></loading>
    </div>
  </div>
    
       <!-- <p>{{wx_user}}</p>
       <p>{{roles}}</p> -->
   
</template>

 

<script>
import { addUser } from '@/api/togo'
import { Loading, XImg, Group, Cell, CellBox,Checklist,Selector,XButton, TransferDomDirective as TransferDom  } from 'vux'
import  { LoadingPlugin } from 'vux'
import Vue from 'vue'
Vue.use(LoadingPlugin)

import { mapGetters } from 'vuex'
import { getRoleTree } from '@/api/role'

export default {
  name: 'Identity',
  directives: {
    TransferDom
  },
  data () {
      return {
        msg: 'Identity',
        wx_user: {},
        roles: [],
        roleIds:[],
         
        show: false,
        addressValue: ['广东省', '深圳市', '南山区'],
        value1: '张三',
        value2: '工艺技术',
        value3: '',
        value7: '',
        value8: '',
        value4: '',
        time1: '2017-06-01',
        value5: ['A'],
        value6: [],
        list: [['A', 'B', 'C']],
        numberValue: 0
      }
    },
  components: {
    Group,
    Cell,
    CellBox,
    XImg,
    Checklist,
    Selector,
    XButton,
    Loading
  },
  methods: {
     beforeInit() {
      const userId = this.$route.params.userId
      if(this.$store.getters.token){
        this.$router.push({ path: this.redirect || `/main/${userId}` })
      }else{
        this.$store.dispatch('GetWxUserBycode', {userId}).then((value) => {
          debugger
          this.wx_user = value.user
          this.roles = value.roles.map((val) => ({'key':val.id,'value':val.name}))
        }).catch(() => {
          //this.loading = false
        }) 
      }
    },
    // getRoles() {
    //   getRoleTree().then(res => {
    //     this.roles = res
    //   })
    //   console.log(this.roles)
    // },
    change (val, label) {
      console.log('change', val, label);
    },
    handleLoginSubmit(){
      console.log(this.wx_user)
      console.log(this.roleIds)
      this.wx_user.extAttrs = this.roleIds.map((val) =>({'name':'key','value':val}))
      this.doAdd();
      this.$vux.loading.show({
        text: 'Loading'
      })
      
      setTimeout(() => {
        this.$vux.loading.hide()
        const userId = this.wx_user.userId
        //this.$router.push({ path: this.redirect || `/main/${userId}` })
      }, 2000)
    },
    doAdd() {
      addUser(this.wx_user).then(res => {
        this.$router.push({ path: this.redirect || `/main/${res.openId}` })
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
  },
  computed: {
    ...mapGetters([
      'wxuser'
    ])
  },

  beforeCreate(){
  },
  created(){
    this.$nextTick(() => {
      this.beforeInit()
      
    })
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.cell {
    padding-top: 1px;
    padding-bottom: 1px;
    color: #333;
    img {
      display: block;
      margin-right: 15px;
    }
  }
</style>
