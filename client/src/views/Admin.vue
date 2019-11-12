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

                                        
                                        @click="ViewCampaigns"
                                    >
                                        Campaigns
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

                                       
                                        @click="addItem"
                                    >
                                        Add Item
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

                                       
                                        @click="addCategory"
                                    >
                                        Add Category
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

                                       
                                        @click="addCampaign"
                                    >
                                        Add Campaign
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        
                    </v-navigation-drawer>
                </v-flex>
                
                <v-flex class="col-md-8" v-if="ShowScouts">
                    <v-data-table  
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



                <v-flex class="col-md-8" v-if="ShowCampaigns">
                    <show-campaigns
                        v-bind:unit-id="this.$store.getters.unit._id">
                    </show-campaigns>
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
                                        <v-select
                                            :items="categories"
                                            label="Category"
                                            v-model="item.category"
                                            item-text="label"
                                            item-value="_id"
                                            required
                                        ></v-select>
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
                <v-flex class="col-md-8" dark v-if="ShowAddCategory">
                    <v-card>
                        <v-card-title>
                            Add Store Category
                        </v-card-title>
                        <v-card-text>
                            <v-form class="white" v-model="valid">
                                <v-text-field
                                    v-model="category.label"
                                    label="Category Label"
                                    required
                                >
                                </v-text-field>
                                <v-btn
                                    @click="submitCategory"
                                    class="primary"
                                >
                                    Save
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex class="col-md-8" dark v-if="ShowAddCampaign">
                    <v-card>
                        <v-card-title>
                            Add Campaign
                        </v-card-title>
                        <v-card-text>
                            <v-form class="white" v-model="valid">
                                <v-text-field
                                    v-model="campaign.label"
                                    label="Category Label"
                                    required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="campaign.startdate"
                                        label="Start Date(MM/DD/YYYY)"
                                        prepend-icon="event"
                                ></v-text-field>
                                <v-btn
                                    @click="submitCampaign"
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
import showCampaigns from '../components/showCampaigns'
export default {
    name: 'Admin',
    data(){
        return {      
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            parent: {},
            campaign: {},
            item: {},
            category: {},//category we are trying to add
            categories: [],//These are the categories loaded in from data for dropdowns
            viewScouts: false,
            viewCampaigns: false,
            addCampaigns: false,
            addCategories: false,
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
            this.addCategories = false;
            this.getScouts();
            this.addCampaigns = false;
            this.viewCampaigns = false;
            //alert(`ViewScouts - ${this.viewScouts} \n addItems - ${this.addItems}`);

        },
        addCategory: function(){
            this.viewScouts = false;
            this.addItems = false;
            this.addCategories = true;
            this.addCampaigns = false;
            this.viewCampaigns = false;
        },
        addCampaign: function(){
            this.viewScouts = false;
            this.addItems = false;
            this.addCategories = false;
            this.addCampaigns = true;
            this.viewCampaigns = false;
        },
        addItem: function(){//show the add item form
            this.addItems = true;
            this.viewScouts = false;
            this.addCategories = false;
            this.addCampaigns = false;
            this.viewCampaigns = false;
            //alert(`ViewScouts - ${this.viewScouts} \n addItems - ${this.addItems}`);

            //get categories for the selection box
            fetch('http://api.scoutsgeared.com/category/'+this.$store.getters.unit._id)
            .then(resp=>resp.json())
            .then(data=>this.categories=data.categories);

        },
        ViewCampaigns: function(){
            this.addItems = false;
            this.viewScouts = false;
            this.addCategories = false;
            this.addCampaigns = false;
            this.viewCampaigns = true;
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
            this.item.unit_id = this.$store.getters.unit._id;
                fetch('http://api.scoutsgeared.com/item/add',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.item)
                });
        },
        submitCategory: function(){
                this.category.unit_id = this.$store.getters.unit._id;
                fetch('http://api.scoutsgeared.com/category/add',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.category)
                })
                .then(this.category={});//later add a success message
                
        },
        submitCampaign: function(){
                this.campaign.unit_id = this.$store.getters.unit._id;
                //alert(this.campaign.unit_ID);
                fetch('http://api.scoutsgeared.com/campaign/add',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.campaign)
                })
                .then(this.campaign={});//later add a success message
                
        }
    },
    computed:{
        ShowScouts: function (){
            return this.viewScouts;
        },
        ShowAddItems: function(){
            return this.addItems;
        },
        ShowAddCategory: function (){
            return this.addCategories;
        },
        ShowAddCampaign: function (){
            return this.addCampaigns;
        },
        ShowCampaigns: function (){
            return this.viewCampaigns;
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    components:{
        'show-campaigns':showCampaigns
    },
    mounted(){

    }

}
</script>
<style scoped>
    .main{
        min-height:"100%";
    }
</style>