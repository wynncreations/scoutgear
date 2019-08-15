<template>
    <v-container fluid class="secondary main">
        <v-alert
            v-model="alert"
            dismissible
            type="info"   
            >
            {{message}}
            </v-alert>
        <v-alert
            v-model="errAlert"
            dismissible
            type="danger"   
            >
            {{errMessage}}
        </v-alert>
      
            <v-layout  justify-center>  
                <v-flex
                    xs12
                    md3
                    dark
                >
                <v-card >
                    <v-card-title class="headline text-uppercase align-content-space-around">Login</v-card-title>
                    <v-card-text>
                        <v-form class="white" v-model="valid">
                            <v-text-field
                                
                                v-model="username"
                                label="Email"
                                required
                            ></v-text-field>

                            <v-text-field
                                
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>

                            <v-btn
                                right
                                color="success"
                                @click="login"
                            >
                                Login
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>        
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name:"login",
    data(){
        return {
            username:'',
            password:'',
            alert: false,
            errAlert: false
        }
    },
    mounted(){
        
    },
    methods:{
        login:function (){
          let username = this.username;
          let password = this.password;
          //alert(JSON.stringify({username,password}));
          this.$store
          .dispatch("login",{username,password})
          .then(()=>{
            this.$router.push('/');       //We need to go to the home route to catch the need for a unit.
          })
          .catch(err =>{
            this.errMessage = err
            this.errAlert = true
          });
        }
    }
}
</script>
