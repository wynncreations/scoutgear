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
            Retail Cost - ${{retail_cost}}
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            name:'Item'
        }
    },props:{
        iname: String,
        image_url:String,
        description: String,
        factory_url: String,
        retail_cost: Number
    }
}
</script>