<template>
    <v-app>
        <v-card>
            <v-card-title>
                Add Store Item
            </v-card-title>
            <v-card-text>
                <v-form>
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
                        v-model="item.subCategory"
                        label="Item Sub Category"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.retailPrice"
                        label="Item Retail Price"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.retailURL"
                        label="Item Retail URL"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.retailImageURL"
                        label="Item Retail Image URL"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="item.shippingCost"
                        label="Item Shipping Cost"
                        required
                    >
                    </v-text-field>
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
        }
    }
</script>