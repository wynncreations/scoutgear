<template>
  <v-container fluid class="blue main">
    <v-layout>
      <v-flex xs3>
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

      <v-flex v-if="haskids">

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
      kids: false
    }
  },
  methods:{

  },
  mounted(){
    this.me = this.$store.getters.me
  },computed:{
    haskids: function (){
      return this.$store.getters.haskids;
    }
  }
};
</script>

<style>
  .main{
    min-height:100%
  }

</style>
