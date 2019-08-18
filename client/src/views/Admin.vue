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
                
                <v-flex class="col-md-8" v-if="ShowScouts">
                    <v-data-table dark class="primary"
                        :headers="headers"     
                        :items="scouts"
                        :items-per-page="15"
                    >
                        <template v-slot:item.firstname="{ item }">
                            {{ item.firstname }} {{item.lastname}}
                        </template>   
                        <template v-slot:item.parent.firstname="{ item }">
                        {{ item.parent.firstname }} {{item.parent.lastname}}
                        </template>        

                        <template v-slot:item.fundRaised="props">
                            <v-edit-dialog
                            :return-value.sync="props.item.fundRaised"
                            @save="save"
                            @cancel="cancel"
                            @open="open"
                            @close="close"
                            persistent
                            > {{ props.item.fundRaised }}
                            <template v-slot:input>
                                <v-text-field
                                persistent
                                large
                                v-model="props.item.fundRaised"
                                :rules="[max25chars]"
                                label="Edit"
                                single-line
                                counter
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>                                
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
                //alert(JSON.stringify(this.scouts[0].parent.username));
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