<template>
    <v-app>
        <v-card>
            <v-card-title>
                Add Store Item
            </v-card-title>
            <v-card-text>
                <v-form class="white" v-model="valid">
                    <v-text-field
                        v-model="item.name"
                        label="Item Name"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.category"
                        label="Item Category"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.retail_cost"
                        label="Item Retail Price"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.factory_url"
                        label="Item Retail URL"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.image_url"
                        label="Item Retail Image URL"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.description"
                        label="Item Shipping Cost"
                        required
                    >
                    </v-text-field>
                    <v-btn
                        @click="submitItem"
                    >

                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
    export default {
        name:'AddItem',
        data(){
            return{

            }
        },
        methods:{
            submitItem: function(){
                fetch('http://api.scoutsgeared.com/item/add',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(item)
                });
            }
        }
    }
</script>