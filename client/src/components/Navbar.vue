<template> 
    <v-app-bar app>      
      <v-btn
        text
        router
        to="/"
      >
      <v-toolbar-title class="headline text-uppercase">
        <span>Scouts</span>
        <span class="font-weight-light">.Geared</span>
      </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLogged"
        text
        router
        to="/login"
      >
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn
        v-if="isLogged"
        text
        @click="logout"
        
      >
        <span  class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {
    name:'Navbar',
    data(){
        return{
            isLoggedIn: false
        }
    },
    methods:{
        logout: function(){
            this.$store.state.isLoggedIn = false;
            this.$store.dispatch("logout")
            .then(this.$router.push("/"))
            .catch(err=>{
                this.$store.state.isLoggedIn = true;
                this.errMessage = err;
                this.errStatus = true;
            })
        }
    },
    computed:{
        isLogged: function (){
            return this.isLoggedIn;
        }
    },
    mounted(){
        this.isLoggedIn = this.$store.getters.isLoggedIn
    }
}
</script>

