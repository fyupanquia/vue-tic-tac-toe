<template>
    <section class="body">
        <div>
            <game-options label_begin="Clear All" :function_begin="clear" ></game-options>
        </div>
        <div>
            <ul v-if="logs">
                <li v-for="(a,i) in logs" :key="i">
                    <div v-if="a.player">
                        <b>Winner: </b><span>Player {{a.player}}</span>
                    </div>
                    <div v-else >
                        <b>Draw</b>
                    </div>
                    <div><b>Time: </b><span>{{a.time}}</span></div>
                    <div v-if="a.fulldate"><b>Date: </b><span>{{a.fulldate}}</span></div>
                </li>
            </ul>
            <ul v-else>
                <li>No results found</li>
            </ul>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import game_options from "./game_room/game_options.vue";
Vue.component('game-options', game_options);

export default {
    data(){
        return {
            logs:null,
        }
    },
    created(){
        var data = localStorage.getItem(this.$store.state.log_storage);
        this.logs = (data) ? JSON.parse(data).reverse() : null;
    },
    methods:{
        clear:function(){
            this.$store.commit("clear_log");
            this.logs = null;
        }
    }
}
</script>
<style scoped>
    .body > div:first-child{
        height: 3em;
    }
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .body > div:last-child li{
        margin: 1em 0em;
        border: 1px dashed #f1f1f1;
    }
</style>
