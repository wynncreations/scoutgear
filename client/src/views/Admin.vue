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
                        </v-list>
                        
                    </v-navigation-drawer>
                </v-flex>
                
                <v-flex class="col-md-6" v-if="ShowScouts">
                    <v-data-table dark class="primary"
                        :headers="headers"     
                        :items="scouts"
                        :items-per-page="15"
                    >
                        
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>



    </v-app>
</template>
<script>
export default {
    name: 'Admin',
    data(){
        return {
            parent: {},
            viewScouts: false,
            error: false,
            errorMessage: '',
            scouts: [],
            headers:[
                {
                    text: 'First Name',
                    align: 'left',
                    value: 'firstname',
                },
                {
                    text: 'Last Name',
                    align: 'left',
                    value: 'lastname',
                },
                { text: 'Den', value: 'subUnitType' },
                { text: 'Parent Email', value: 'username' },
                { text: 'Funds Raised ($)', value: 'fundRaised', align: 'right' },
                { text: 'Profit', value: 'profit', align: 'right' },
                { text: 'Scout Fund ($)', value: 'scoutFund', align: 'right'  }
            ]
        }
    },
    methods:{
        ViewScouts:function(){
            this.viewScouts = true;
            this.getScouts();
        },
        getScouts: function(){
            
            fetch('/kid/all/'+this.$store.getters.me.unit_ID)
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
                alert(JSON.stringify(this.scouts));
                //this.$store.dispatch("AddScout");
            })
            .catch(err=>{
                this.errorMessage = `${err}`;
                this.error = true;
            })
        }
    },
    computed:{
        ShowScouts: function (){
            return this.viewScouts;
        }
    },
    mounted(){
        this.getScouts();
    }
}
</script>
<style scoped>
    .main{
        min-height:"100%";
    }
</style>