<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     
     
    <div>
       
       <p>{{wx_user}}</p>
       <p>{{roles}}</p>
    </div>
     
  </div>
</template>

 

<script>
import { mapGetters } from 'vuex'
import { getRoleTree } from '@/api/role'

export default {
  name: 'Identity',
  data () {
      return {
        msg: 'Identity',
        wx_user: {},
        roles: {}
      }
    },
  components: {
     
  },
  methods: {
     beforeInit() {
      const userId = this.$route.params.userId
      this.$store.dispatch('GetWxUserBycode', {userId}).then((value) => {
        this.wx_user = value.user
      }).catch(() => {
        //this.loading = false
      }) 
    },
    getRoles() {
      getRoleTree().then(res => {
        this.roles = res
      })
    }
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
      this.getRoles()
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
<style scoped>
 
</style>
