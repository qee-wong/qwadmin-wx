<template lang="">
    <div>
        msg {{ msg }}
         {{this.$store.state.togo.name}}
    </div>
</template>

<script>
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
        }
    },
    created(){
        this.beforeInit()
    },
  
}
</script>

<style scoped>

</style>
