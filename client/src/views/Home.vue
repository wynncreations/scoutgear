<template>
  <v-container class="secondary main">
    <v-layout>
      <v-flex class="white--text text-center">
        ScoutsGeared is THE premier way to track your unit's fundraising and gear your scouts! 


      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>


export default {
  name:'home',
  data (){
    return {
      me:{},
      kids:[]
    }
  },
  methods:{

  },
  mounted(){
    this.me = this.$store.getters.me
    this.kids = this.$store.getters.kids
  },computed:{
    haskids: function (){
      return this.$store.getters.haskids;
    },
    isLoggedIn: function (){
      return this.$store.getters.isLoggedIn
    },
    isParent: function(){
      return this.$store.getters.me.isParent
    }
  }
};
</script>

<style>
  .main{
    min-height:100%
  }
  .registerCard{
    min-height:50%
  }

</style>
