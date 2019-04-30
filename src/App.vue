<template>
  <div id="app">
     <!-- <p>{{name}}</p> -->
    <router-view/>
  </div>
</template>

<script>
 
export default {
  name: 'App',
  data(){
      return {
        name:'qw',
        classObject:{
          active:true,
          'text-danger':true
        },
        posts:[
          { id: 11, title: 'My journey with Vue' },
          { id: 22, title: 'Blogging with Vue' },
          { id: 33, title: 'Why Vue is so fun' }
        ],
        searchText:'er'
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
