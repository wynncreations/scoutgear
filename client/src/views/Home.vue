<template>
  <v-container no-gutter fluid class="main fill-height">
    <v-row no-gutter class="align-center centerContent">
      <v-col 
        cols="12"
        sm="12"
        md="3"
        
      >
        <div class="">ScoutsGeared is a fundraising and unit spending assistance app. Units, parents, and scouts can easily track and view fundraising efforts and apply the funds as needed.</div>
      </v-col>

      <v-col 
        cols="12"
        sm="12"
        md="3"
        
      >
        Create fundraising campaigns, see profit from those campaigns and what each scout has contributed and earned!
      </v-col>

      <v-col 
        cols="12"
        sm="12"
        md="3"
      >
        Apply scout funds to gear, dues, and budget items!
      </v-col>
    </v-row>
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
    console.log(this.$vuetify.breakpoint)
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
    min-height:100%;
    background-image:url('../assets/background.jpg');
    background-size:cover;
  }
  .registerCard{
    min-height:50%
  }
  .centerContent{
    background-color: white;
  }

</style>
