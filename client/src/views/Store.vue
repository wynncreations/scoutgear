<template>
    <v-container>
        <v-row no-gutter >
            <v-col
                md="3"
                sm="12"       
                v-for="item in items"
                :key="item._id"
            >
                <Item
                    v-bind:iname="item.name"
                    v-bind:image_url="item.image_url"
                    v-bind:description="item.description"
                    v-bind:factory_url="item.factory_url"
                    v-bind:retail_cost="item.retail_cost"
                    v-bind:item_id="item._id"
                    v-bind:parent_id="parent_id"
                ></Item>    
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Item from '../components/Item'
export default {
    data(){
        return{
            items:[],
            parent_id: ''
        }
    },
    mounted(){
        fetch(`http://api.scoutsgeared.com/item/unit/${this.$store.getters.unit._id}`)
        .then(resp =>{
                if(!resp.ok){
                    this.errorMessage = `Error looking up items`;
                    this.error = true;
                }else{
                    return resp.json();
                }
        })
        .then(data=>{
            this.items = data.items;
        })
        .catch(err=>{
            this.errorMessage = `${err}`;
            this.error = true;
        });
        console.log(this.$store.getters.me._id);
        this.parent_id = this.$store.getters.me._id
        console.log(this.parent_id)
    },
    components:{
        Item
    },
    methods:{

    }
}
</script>