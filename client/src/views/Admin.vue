<template>
    <v-app secondary class="secondary" app>
        <v-container fluid>
            <v-layout>
                <v-flex class="col-md-2">
                    <v-navigation-drawer dark class="primary">
                        <v-list
                            nav
                        >
                            <v-list-item
                                link
                            >
                                <v-list-item-icon>
                                    <v-icon>
                                        mdi-view-comfy
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title 

                                        link
                                        @click="ViewScouts"
                                    >
                                        Scouts
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                                link
                            >
                                <v-list-item-icon>
                                    <v-icon>
                                        mdi-view-comfy
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title 

                                        link
                                        @click="addItem"
                                    >
                                        Add Item
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        
                    </v-navigation-drawer>
                </v-flex>
                
                <v-flex class="col-md-8" v-if="ShowScouts">
                    <v-data-table dark class="primary"
                        :headers="headers"     
                        :items="scouts"
                        :items-per-page="15"
                    >
                        
                            <template v-slot:item.firstname="{ item }">
                            <v-icon @click="editScout(item._id)"> mdi-account-edit</v-icon> 
                            <v-icon @click="deleteScout(item._id)"> mdi-trash-can</v-icon> 
                            {{ item.firstname }} {{item.lastname}}
                            </template>   
                            <template v-slot:item.parent.firstname="{ item }">
                            {{ item.parent.firstname }} {{item.parent.lastname}}
                            </template>  
                        
      
     

                      

                    </v-data-table>
                </v-flex>
                <v-flex class="col-md-8" dark v-if="ShowAddItems">
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
                                            label="Description"
                                            required
                                        >
                                        </v-text-field>
                                        <v-btn
                                            @click="submitItem"
                                            class="primary"
                                        >
                                            Save
                                        </v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
//import AddItem from '../components/AddItem'
export default {
    name: 'Admin',
    data(){
        return {
            parent: {},
            item: {},
            viewScouts: false,
            addItems:false,
            error: false,
            errorMessage: '',
            scouts: [],
            headers:[
                {
                    text: 'Scout',
                    align: 'left',
                    value: 'firstname',
                },                {
                    text: 'Parent',
                    align: 'left',
                    value: 'parent.firstname',
                },
                { text: 'Den', value: 'subUnitType' },
                { text: 'Parent Email', value: 'parent.username' },
                { text: 'Funds Raised ($)', value: 'fundRaised', align: 'right' },
                { text: 'Profit', value: 'profit', align: 'right' },
                { text: 'Scout Fund ($)', value: 'scoutFund', align: 'right'  }
            ]
        }
    },
    methods:{
        editItem (item) {
            this.editedIndex = this.scouts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        ViewScouts:function(){
            this.viewScouts = true;
            this.addItems = false;
            this.getScouts();
        },
        addItem: function(){
            this.addItems = true;
            this.viewScouts = false;
        },
        getScouts: function(){
            
            fetch('http://api.scoutsgeared.com/kid/all/'+this.$store.getters.me.unit_ID)
            .then(resp =>{
                if(!resp.ok){
                    this.errorMessage = `Error looking up children`;
                    this.error = true;
                }else{
                    return resp.json();
                }
            })
            .then(data=>{
                this.scouts = data.scouts;
                this.foundScouts = true;
            })
            .catch(err=>{
                this.errorMessage = `${err}`;
                this.error = true;
            })
        },
        editScout: function(id){
            this.$router.push(`/scout/edit?id=${id}`);
        },
        deleteScout: function(id){
            fetch(`http://api.scoutsgeared.com/scout/delete/${id}`,{method:'delete'})
            .then(resp=>resp.json())
            .catch(err=>err);

            this.$router.push('/admin');//not firing?
        },
        submitItem: function(){
                fetch('http://api.scoutsgeared.com/item/add',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.item)
                });
            }
    },
    computed:{
        ShowScouts: function (){
            return this.viewScouts;
        },
        ShowAddItems: function(){
            return this.addItems;
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    components:{
        //AddItem
    }

}
</script>
<style scoped>
    .main{
        min-height:"100%";
    }
</style>