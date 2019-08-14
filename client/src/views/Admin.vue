<template>
    <v-app secondary class="secondary" app>
        <v-container fluid>
            <v-layout>
                <v-flex>
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

                <v-flex>
                    <v-data-table>
                        
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
            viewScouts: false
        }
    },
    methods:{
        ViewScouts:function(){
            this.viewScouts = true;
        }
    },
    computed:{
        GetScouts: function (){
            return this.viewScouts;
        }
    }
}
</script>
<style scoped>
    .main{
        min-height:"100%";
    }
</style>