<template>
    <v-container fluid class="blue main">
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
            <v-form v-model="valid">
                <v-container>
                <v-layout justify-center>  
                    <v-flex
                    xs12
                    md3
                    >
            
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
                    color="primary"
                    @click="login"
                >
                    Login
                </v-btn>
                </v-flex>        
            </v-layout>
            </v-container>
        </v-form>
    </v-container>
</template>
<script>
export default {
    name:"login",
    data(){
        return {
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
          //alert(JSON.stringify(user));
          this.$store
          .dispatch("login",{username,password})
          .then(()=>{
            this.$router.push('/');       
          })
          .catch(err =>{
            this.errMessage = err
            this.errAlert = true
          });
        }
    }
}
</script>
