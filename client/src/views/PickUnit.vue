<template>
    <v-container fluid class="main blue ">
        <v-layout row class="justify-center">
            <v-flex xs3 md4>
                <v-card>
                    <v-card-text>
                        <v-form>
                            <v-select
                                :items="units"
                                label="Registered Units"
                                v-model="unit"
                                item-text="unit_name"
                                item-value="_id"
                                required
                            ></v-select>
                            <v-btn
                                @click="JoinUnit"
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
            unit:'',
            units:[]
        }
    },
    mounted(){
        this.me = this.$store.getters.me;
        fetch('/unit/')
        .then(resp => resp.json())
        .then(data => this.units=data.units)
    },
    methods:{
        JoinUnit: function(){
            let data = {
                id:this.me._id,
                unit_id:this.unit
            }

            //let id = this.me._id;

            //alert (JSON.stringify(data))

            fetch(`${base}/auth/joinunit`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            })
            .then(resp => resp.json())
            .then(this.$store.dispatch("logout"))
            //.then(this.$store.dispatch("resetUser",id))
            .then(this.$router.push('/login'))
        }
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
