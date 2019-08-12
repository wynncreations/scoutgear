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
        v-if="!checkLogin"
        text
        router
        to="/login"
      >
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn
        v-if="!checkLogin"
        text
        router
        to="/register"
        
      >
        <span  class="mr-2">Register</span>
      </v-btn>  

      <v-btn
        
        text
        @click="AddScout"
      >
        Add Scout
      </v-btn>






      <v-btn
        v-if="checkLogin"
        text
        router
        to="/dashboard"
        
      >
        <span  class="mr-2">Dashboard</span>
      </v-btn>
      
      <v-btn
        v-if="checkLogin"
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
      getState:function(){
        if(this.$store.state.authStatus !== ""){
          this.$store.state.isLoggedIn = true;
          //alert(this.$store.state.authStatus);
        }else{
          this.$store.state.isLoggedIn = false;
        }
      },
        logout: function(){
            this.$store.state.isLoggedIn = false;
            this.$store.dispatch("logout")
            .then(this.$router.push("/"))
            .catch(err=>{
                this.$store.state.isLoggedIn = true;
                this.errMessage = err;
                this.errStatus = true;
            })
        },
        AddScout: function(){
          this.$store.dispatch("AddScout");
        }
    },
    computed:{

      checkLogin: function(){
        return this.$store.getters.isLoggedIn;
      },
      checkAdmin: function(){
        if(this.$store.getters.isAdmin){
          return true;
        }else{
          return false;
        }
      },
      isDashboard: function (){
        return this.$store.getters.isDashboard;
      }
    },
    mounted(){
        this.isLoggedIn = this.$store.getters.isLoggedIn;
        this.getState;
        this.isDashboard();
    }
}
</script>

