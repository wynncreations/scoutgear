<template>
    <v-container fluid class="main blue ">
        <v-layout row class="justify-center">
            <v-flex xs3 md4>
                <v-card>
                    <v-card-text>
                        <v-form>
                            <v-select 
                                label="Registered Units"
                                :items="units"
                                v-model="unit"
                                :item-text="units.unit_type + ' ' + units.unit_number"
                                :item-value="units._id"
                            >

                            </v-select>
                            <v-btn
                                
                            >
                                Join Unit
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row class="justify-center">
            <v-flex xs3 md3>
                <v-card flat class="blue justify-center">
                    <v-card-text>
                        <v-form>
                            <v-text-input>

                            </v-text-input>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        
                            @click="create"
                        >
                            Create New Unit
                        </v-btn>
                        <v-btn
                        
                            @click="join"
                        >
                            Join Existing Unit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name:'PickUnit',
    data (){
        return{
            me:{},
            units:[]
        }
    },
    mounted(){
        this.me = this.$store.getters.me;
        fetch('/units/')
        .then(resp => resp.json())
        .then(data => this.units=data.units)
    },
    methods:{

    },
    computed:{

    }
    
}
</script>
<style>
    .main{
        min-height: 100%;
    }
</style>
