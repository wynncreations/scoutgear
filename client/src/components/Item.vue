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
                        label="Category"
                        v-model="item.firstname"
                        item-text="Name"
                        item-value="_id"
                        required
                    ></v-select>
                </v-form>
                <v-btn>Request <v-icon>mdi-cash-usd</v-icon></v-btn>
                
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            name:'Item',
            scouts: []
        }
    },props:{
        iname: String,
        image_url:String,
        description: String,
        factory_url: String,
        retail_cost: Number
    },
    mounted(){
        this.scouts = this.$store.getters.kids;
    }
}
</script>