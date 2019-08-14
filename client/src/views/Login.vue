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
      
            <v-layout  justify-center align-center fill-height>  
                <v-flex
                    xs12
                    md5
                    dark
                >
                <v-form class="primary col-md-6" v-model="valid">
                    <v-text-field
                        dark
                        v-model="username"
                        label="Email"
                        required
                    ></v-text-field>

                    <v-text-field
                        dark
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
