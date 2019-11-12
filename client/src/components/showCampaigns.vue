<template>
    <v-layout>
        <v-flex xs12>
            <v-layout>
                <v-data-table
                    :headers="headers"
                    :items="campaigns"
                    :items-per-page="15"
                    class="elevation-1"
                ></v-data-table>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    props:['unit-id'],
    data: function(){
        return{
            name:'show-campaigns',
            campaigns:[]
            ,headers:[
                {
                    text: 'Campaign',
                    align: 'left',
                    value: 'label',
                },
                { text: 'Total Raised ($)', value: 'total_raised' },
                { text: 'Pack Keeps ($)', value: 'total_raised' }

            ]
        }    
    },
    mounted(){
        this.loadCampaigns();
    },
    methods:{
        loadCampaigns: function(){
            fetch(`http://api.scoutsgeared.com/campaign/unit/${this.unitId}`)
            .then(resp=>resp.json())
            .then(data=>this.campaigns=data.campaigns);
        }
    }
}
</script>