<template>
    <v-container>
        <v-layout>
            <v-flex>
                <edit-campaign></edit-campaign>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import editCampaign  from '../components/editCampaign'

export default {
    props:['scout-id'],
    data: function(){
        return{
            name:'edit-scout',
            scout:{}
        }
    },
    mounted(){
        this.loadScout();
    },
    methods:{
        loadScout: function(){
            fetch(`http://api.scoutsgeared.com/scout/${this.scoutId}`)
            .then(resp=> resp.json())
            .then(data=>this.scout = data.scout);
        }
    },
    components:{
        'edit-campaign':editCampaign
    },
}
</script>