<template>
    <v-card

    >
        <v-card-title>
            {{iname}}
        </v-card-title>

        <v-card-text>
            <v-img
                v-bind:src="image_url"
                height="200"
                width="200"
                contain
            >

            </v-img>
            {{description}}
            <br><br>
            Retail Cost - ${{retail_cost}}
            <hr>
            <v-card-actions>
                <v-form>
                    <v-select
                        :items="scouts"
                        label="Scouts"
                        v-model="scout"
                        item-text="firstname"
                        item-value="_id"
                        required
                    ></v-select> 
                    <v-dialog
                        v-model="confirmation"
                        width="500"
                        >
                        <template v-slot:activator="{ on }">
                            <v-btn
                            color="red lighten-2"
                            dark
                            v-on="on"
                            >
                            Apply Scout Fund
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                            >
                            ScoutGeared Reservation
                            </v-card-title>

                            <v-card-text>
                                Are you sure you want to reserve {{iname}}? This will deduct ${{retail_cost}} from your scout's Scout Fund.
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="applyScoutFund()"
                            >
                                I accept
                            </v-btn>
                            <v-btn
                                color="primary"
                                text
                                @click="confirmation = false"
                            >
                                Cancel
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                </v-form>
                
                
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            name:'Item',
            scouts:[],
            confirmation: false,
            thisScout:{}
        }
    },props:{
        iname: String,
        image_url:String,
        description: String,
        factory_url: String,
        retail_cost: Number,
        item_id: String,
        parent_id:String
    },
    mounted(){
        this.getScouts();

    },
    methods:{
        applyScoutFund: function (){
            //confirmation prompt
            this.confirmation=false;
           
            if(this.scout==null){
                alert(`Please choose a scout from the dropdown.`);
            }else{
                //we need to do our stuff here.
                //call backend to deduct scout fund and send email to scout parent and unit admin and create "store_event" action

                let updateData = {
                    scout_id:this.scout,
                    item_id:this.item_id,
                    retail_cost:this.retail_cost,
                    parent_email:this.$store.getters.me.username
                }


                fetch(`http://api.scoutsgeared.com/store/purchase/`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData) })
                .then(resp=>resp.json())
                .then(resp=>this.message=resp.message)
                .catch();
                








           }

           //
        },
        getScouts: function(){
            fetch(`http://api.scoutsgeared.com/kid/scout/parent/${this.parent_id}`)
                .then(resp=>resp.json())
                .then(data=> {
                    this.scouts = data.scouts
                })
                .catch();
        }
    },
    computed:{

    }
}
</script>