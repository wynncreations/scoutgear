<template> 
    <v-app-bar dark class="primary">   
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

      <v-btn
        v-if="checkLogin"
        text
        router
        to="/store"
        class="text-center"
      >
           <span class="col-md-3 text-center text-align-center" 
        
      >
        Store

      </span>
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

      <span class="col-md-3"
        v-if="checkLogin"
      >
        Welcome {{this.$store.getters.me.username}} - {{this.$store.getters.unit.unit_name}}

      </span>

      <v-btn
        v-if="checkAdmin"
        text
        router
        to="/admin"
        
      >
        <span  class="mr-2">Unit Dashboard</span>
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
            this.$store.state.isAdmin = false;
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

      checkLogin: function(){
        return this.$store.getters.isLoggedIn;
      },
      checkAdmin: function(){
        if(this.$store.getters.isAdmin){
          return true;
        }else{
          return false;
        }
      }
    },
    mounted(){
        this.isLoggedIn = this.$store.getters.isLoggedIn;
        this.getState;
       
    }
}
</script>

