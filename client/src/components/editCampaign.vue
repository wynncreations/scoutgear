<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-form>
                <v-layout>
                    <v-flex xs12 md2>
                        <v-text-field
                        v-model="campaign.label"
                        label="Campaign Name"
                        required
                        disabled
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            v-model="campaign_event.total_raised"
                            label="Total Raised"
                            disabled
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 md1>
                        <v-text-field
                            v-model="campaign_event_amount"
                            label="Adjust"
                            required
                        >
                        </v-text-field>
                    </v-flex>
                    <v-btn
                        @click="AdjustCampaign"
                        class="primary"
                    >
                    Adjust
                    </v-btn>    
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    props:['campaign-id','scout-id'],
    data: function (){
        return{
            name:'edit-campaign',
            campaign_id: this.campaignId,
            campaign:{},
            campaign_event:{
                total_raised:0
                },
            campaign_event_amount: 0
        }
    },
    mounted(){
       this.getCampaign();
       this.getCampaignEvents();
    },
    methods:{
        getCampaign: function(){
            fetch(`http://api.scoutsgeared.com/campaign/${this.campaign_id}`)
            .then(resp => resp.json())
            .then(data=> this.campaign = data.campaign)
            .catch(/*add error handler here.*/);
        },
        AdjustCampaign: function(){
            var updateData = {
                scout_id:this.scoutId,
                campaign_id:this.campaign_id,
                update_amount:this.campaign_event_amount
            }
            fetch(`http://api.scoutsgeared.com/campaign/${this.campaign_id}/updatescout`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData) })
                .then(resp=>resp.json())
                .then(data=>this.campaign_event.total_raised = parseFloat(JSON.stringify(data.message.total_raised)))
                .then(this.campaign_event_amount=0);
                
        },
        getCampaignEvents: function(){
            fetch(`http://api.scoutsgeared.com/campaign/getEvent/${this.campaign_id}/scout/${this.scoutId}`)
            .then(resp=>resp.json())
            .then(data=>this.campaign_event.total_raised = data.message.total_raised);
        }
    }
}
</script>