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
                    <v-btn @click="applyScoutFund()">Apply Scout Fund <v-icon>mdi-cash-usd</v-icon></v-btn>
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
            scouts:[]
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
           prompt(`Apply scoutfund to ${this.iname} for ${this.scout}?`,true) 
           //call backend to deduct scout fund and send email to scout parent and unit admin and create "store_event" action

           //
        },
        getScouts: function(){
            fetch(`http://api.scoutsgeared.com/kid/scout/parent/${this.parent_id}`)
                .then(resp=>resp.json())
                .then(data=> {
                    this.scouts = data.scout
                })
                .catch();
        }
    }
}
</script>