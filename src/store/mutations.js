import {cmb} from './cmb/cmb';
export const mutations = {
    set_default_settings(state) {
        state.settings = {
            strikethrough : state.strikethroughStyles[0],
        }
    },
    clean_last_game(state){
        state.interval = null;
        state.positions = { 'a': [], 'b': [] };
        state.winner = null;
        state.turn = "a";
        state.timer = 0;
    },
    set_is_started_set_is_finished(state, bool){
        state.is_started = bool;
        state.is_finished = bool;
    },
    set_is_started(state,bool){
        state.is_started = bool;
    },
    set_is_finished(state, bool) {
        state.is_finished = bool;
    },
    set_interval(state, interval){
        state.interval = interval
    },
    //reset_game_status(state) {
    //    state.is_finished = false;
    //},
    add_position(state, position){
        state.positions[state.turn].push(position);
    },
    add_timer(state, second){
        state.timer += second;
    },
    change_turn(state) {
        state.turn = (state.turn==="a") ? "b" : "a";
        if (state.mode==="s" && state.turn=="b") {
            cmb(state);
        }
    },
    finalize(state, args) {
        var data = localStorage.getItem(state.log_storage);
        data = (data) ? JSON.parse(data) : [];
        data.push(args);
        localStorage.setItem(state.log_storage, JSON.stringify(data));

        clearInterval(state.interval);
        state.winner = args;
        state.is_finished = true;
    },
    clear_log(payload){
        localStorage.clear();
    }
}