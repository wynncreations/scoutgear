<template>
    <v-layout>
        <v-flex
            v-for="item in items" v-bind:key="item._id"
        >
    
         <Item 
                v-bind:iname="item.name"
                v-bind:image_url="item.image_url"
                v-bind:description="item.description"
                v-bind:factory_url="item.factory_url"
                v-bind:retail_cost="item.retail_cost"
        ></Item>
           
        </v-flex>
    </v-layout>
</template>

<script>
import Item from '../components/Item'
export default {
    data(){
        return{
            items:[]
        }
    },
    mounted(){
        fetch(`/item`)
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
    },
    components:{
        Item
    }
}
</script>