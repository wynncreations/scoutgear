<template>
  <v-container fluid class="secondary main">
    
      <v-container >
        <v-layout justify-center>  
          <v-flex
            xs12
            md4
          >
            <v-card>
              <v-card-title class="headline text-uppercase align-content-space-around">Register New Parent Account</v-card-title>
              <v-card-text>
                <v-form v-model="valid"  class="white"> 
                  <v-text-field
                    v-model="firstname"
                    label="First name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="lastname"
                    label="Last name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    label="E-mail"
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
                    @click="register"
                  >
                    Submit
                  </v-btn>
                </v-form>
              </v-card-text>

            </v-card>
            
          </v-flex>  

        </v-layout>
      </v-container>

    
  </v-container>
  
</template>


<script>
export default {
    name: 'register',
    data (){
      return {
        valid:false,
        email:'',
        password:'',
        firstname:'',
        lastname:''
      }
    },
    methods:{
        register: function() {
            let data1 = {
                firstname: this.firstname,
                lastname: this.lastname,
                username: this.email,
                password: this.password
            };
            //alert(JSON.stringify(data1));
            this.$store
                .dispatch("register", data1)
                .then(()=>{
                  this.$router.push("/");
                });
        }
    }

}
</script>
