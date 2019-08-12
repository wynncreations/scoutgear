<template>
    <v-container fluid class="blue main"> 
        <v-layout v-if="error">
            <v-flex>
                <v-alert dismissible type="error">
                    {{errorMessage}}
                </v-alert>
            </v-flex>
        </v-layout>


        <v-layout v-if="success">
            <v-flex>
                <v-alert dismissible type="success">
                    {{successMessage}}
                </v-alert>
            </v-flex>
        </v-layout>

        <v-layout fill-height>
            <v-dialog
                width="40%"
                v-model="AddScout"
            >
                <v-layout v-if="getAddScoutStatus"  align-center justify-center row fill-height>
                    <v-flex xs12 md6>
                        <v-card class="register">
                            <v-card-title>Add Scout</v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        v-model='firstname'   
                                        label="First Name" 
                                        required
                                    >
                                        
                                    </v-text-field>
                                    <v-text-field
                                        v-model='lastname'    
                                        label="Last Name" 
                                        required
                                    >
                                    
                                    </v-text-field>
                                    <v-text-field
                                        v-model='age'    
                                        label="Age"
                                        required 
                                    >
                                    
                                    </v-text-field>
                                    <v-select
                                        v-model='den'    
                                        label="Den" 
                                        :items="dens"
                                        item-text="label"
                                        item-value="_id"
                                        required
                                    >
                                    
                                    </v-select>


                                    <v-btn
                                        flat
                                        text
                                        class="success"
                                        @click="saveScout"

                                    >
                                        Submit
                                    </v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-flex>  
                </v-layout>

            </v-dialog>
             

            <v-layout v-if="didFindScouts" align-center justify-center row fill-height>
                <v-data-table  
                    dark
                    :headers="headers"     
                    :items="scouts"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-layout>
        </v-layout>  


       


    </v-container>
</template>
<script>
export default {
    name:'Dashboard',
    data (){
        return {
            dens:[],
            parent:{},
            scouts:[],
            errorMessage:'',
            error: false,
            successMessage:'',
            success: false,
            addscout:false,
            foundScouts: false,
            headers:[
            {
                    text: 'Name',
                    align: 'left',
                    value: 'firstname',
                },
                { text: 'Den', value: 'subUnitType' },
                { text: 'Funds Raised ($)', value: 'fundRaised', align: 'right' },
                { text: 'Scout Fund ($)', value: 'scoutFund', align: 'right'  },          
            ],
            AddScout: this.$store.getters.AddScout

        }
    },
    mounted(){
        this.getDens();//get a list of dens on view mount
        this.getParent();//get parent info
        //this.getUnit(); //Get unit info
        this.getScouts();//get any registered scouts
    },
    methods:{
        getDens: function (){
            fetch('/dens')
            .then(resp=> resp.json())
            .then(data => this.dens = data.dens)
        },
        getParent: function(){
            this.parent = this.$store.getters.me;
        },
        saveScout: function (){

            var subUnitType = this.dens.find(object=> object._id === this.den);

            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                age: this.age,
                unit_id: this.parent.unit_ID,
                den: subUnitType.label,
                den_id: this.den,
                parent: this.parent._id
            }

            //alert(JSON.stringify(data))

            fetch('/kid/add',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            })
            .then(resp=>{
                if (!resp.ok) { 

                    this.success = false;
                    this.errorMessage = `Error adding ${data.firstname} have you already added them?`;
                    this.error = true;
                }else{
                    resp.json()
                    this.success = true;
                    this.$store.dispatch("AddScout");
                    this.successMessage = `Successfully added scout - ${data.firstname + ' ' + data.lastname}`                
                }
                })
            .then(this.getScouts())
            .then(this.formReset())
            .catch(err=>
            {
                this.success = false;
                this.errorMessage = err
                this.error = true;
            });
        },
        formReset: function(){
            this.age = '';
            this.firstname = '',
            this.lastname = '';
            this.den = '';
            this.errorMessage = '';
            this.error = false;
            this.successMessage = '';
            this.success = false;
        },
        getScouts: function(){
            fetch('/kid/'+this.parent._id)
            .then(resp =>{
                if(!resp.ok){
                    this.errorMessage = `Error looking up children`;
                    this.error = true;
                }else{
                    return resp.json();
                }
            })
            .then(data=>{
                this.scouts = data.scouts;
                this.foundScouts = true;
                //this.$store.dispatch("AddScout");
            })
            .catch(err=>{
                this.errorMessage = `${err}`;
                this.error = true;
            })
        }

    },
    computed:{
      getDenId: function (){
          return this.den;
      },
      getAddScoutStatus: function (){
          // eslint-disable-next-line
          this.AddScout = this.$store.getters.AddScout;
          return this.$store.getters.AddScout;
          
      },
      didFindScouts: function (){
          return this.foundScouts;
      }
    }
}
</script>
<style>
    .main {
        min-height: 100%;
    }
    .sub{
        min-width: 100%;
        padding: 0;
        margin:0px;
    }
    .register{
        margin-top: 25px;
    }
</style>
