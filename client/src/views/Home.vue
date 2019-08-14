<template>
  <v-container fluid class="secondary main">
    <v-layout v-if="isLoggedIn" justify-center>
      <v-flex xs12 md4>

      </v-flex>
      <v-flex xs12 md3>
        <v-card justify-center>
          <v-card-title>
            <span>Welcome</span>  <span> {{ me.firstname }} {{me.lastname}}</span>
          </v-card-title>
          <v-card-divider></v-card-divider>
          <v-card-text>


            <span>Position:</span><span xs6> {{ me.position }}</span><br>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="isParent">
        <v-card v-for="kid in kids" :key="kid.id">
          <v-card-title>

          </v-card-title>
          <v-card-divider></v-card-divider>
          <v-card-text>
            <span>{{ kid.firstname }} {{ me.lastname }}</span><br>

            <span>Age:</span><span xs6> {{ kid.age }}</span><br>
          </v-card-text>
        </v-card>
      </v-flex>



    </v-layout>
    <v-layout v-if="!isLoggedIn">
      <v-flex>
        <span class="white--text">Register now to get started!</span>
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
