<template>
    <v-app secondary class="secondary" app>
        <v-container fluid>
            <v-layout>
                <v-flex>
                    <v-card>
                        <v-card-title>
                            Update Scout
                        </v-card-title>
                        <v-card-text>
                            <v-form class="white">
                                <v-text-field
                                    v-model="scout.firstname"
                                    label="First Name"
                                    required
                                >


                                </v-text-field>
                                <v-text-field
                                    v-model="scout.lastname"
                                    label="Last Name"
                                    required
                                >


                                </v-text-field>
                                <v-text-field
                                    v-model="scout.fundRaised"
                                    label="Funds Raised"
                                    required
                                >


                                </v-text-field>
                                <v-text-field
                                    v-model="scout.scoutFund"
                                    label="Scout Fund Balance"
                                    required
                                >


                                </v-text-field>
                                <v-btn
                                    class="success"
                                    @click="updateScout"
                                >
                                    Update
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
export default {
    name: 'EditScout',
    data(){
        return{
            scout: []
        }
    },
    mounted(){
        fetch(`${base}/scout/${this.$route.query.id}/withParent`)
        .then(resp =>{
                if(!resp.ok){
                    this.errorMessage = `Error looking up scout`;
                    this.error = true;
                }else{
                    return resp.json();
                }
        })
        .then(data=>{
            this.scout = data.scout;
        })
        .catch(err=>{
            this.errorMessage = `${err}`;
            this.error = true;
        });
        
    },
    methods:{
        updateScout: function (){
            fetch(`${base}/scout/update`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.scout) })
            .then(    
                alert(`Successfully updated scout ${JSON.stringify(this.scout.firstname)}`)
            )
            .catch(err=>alert(`Error updating scout ${err}`))
        }
    }

}
</script>