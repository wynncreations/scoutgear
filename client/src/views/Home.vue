<template>
  <v-container fluid class="blue main">
    <v-layout v-if="isLoggedIn" >
      <v-flex xs3 md3>
        <v-card>
          <v-card-title>
            User Info
          </v-card-title>
          <v-card-divider></v-card-divider>
          <v-card-text>
            <span>{{ me }} {{ me.lastname }}</span><br>

            <span>Position:</span><span xs6> {{ me.position }}</span><br>
          </v-card-text>
        </v-card>
      </v-flex>


      <v-flex v-if="me.unit_ID==='000000000000000000000000'" xs6 md3>
        <v-card flat class="registerCard blue" >
          <v-card-actions>
            <v-btn
              flat
              router
              to="/registerUnit"
              
            >
              Register New Unit
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              router
              to="/joinUnit"      
            >
              Join Unit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex v-if="isParent">
        <v-card v-for="kid in kids" :key="kid.id">
          <v-card-title>
            User Info
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
