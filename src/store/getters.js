import moment from 'moment';

export const getters = {
    get_fulldate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var H = today.getHours();
        var i = today.getMinutes();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        if (H < 10) {
            H = '0' + H
        }
        if (i < 10) {
            i = '0' + i
        }
        return `${dd}/${mm}/${yyyy} ${H}:${i}`;
    },
    get_second(state){
        return state.milisenconds / 1000;
    },
    get_milisenconds(state){
        return state.milisenconds;
    },
    isStarted(state){
        return state.is_started;
    },
    is_finished(state){
        return state.is_finished;
    },
    get_mode(state) {
        return state.mode;
    },
    get_is_available_to_cross_out(state, getters) {
        return (position)=>{
            return  !getters.get_is_cross_out(position) && 
                    !getters.is_finished && 
                    ( (getters.get_mode === "s" && getters.get_turn!="b") || getters.get_mode === "m");
        }
    },
    get_is_cross_out(state){
        return (position) => {
            return state.positions.a.concat(state.positions.b).indexOf(position) != -1;
        }
    },
    get_cross_out_by_position(state, getters){
        return (position) => {
            var get_cross_out = function (position) {
                return (state.positions.a.indexOf(position) != -1) ? "a" : "b";
            }
            return (!getters.get_is_cross_out(position)) ? "" : getters.get_strikethrough(get_cross_out(position));
        }
    },
    get_turn(state) {
        return state.turn;
    },
    getSize(state){
        return state.size;
    },
    getOppositeStrikethrough(state){
        let strikethroughStyles = state.strikethroughStyles;
        strikethroughStyles.splice(strikethroughStyles.indexOf(state.settings.strikethrough), 1);
        return strikethroughStyles.pop();
    },
    get_strikethrough(state, getters){
        return (turn)=>{
            return (turn === "a") ? state.settings.strikethrough : getters.getOppositeStrikethrough;
        }
    },
    getStrikethrough(state, getters) {
        return (state.turn === "a") ? state.settings.strikethrough : getters.getOppositeStrikethrough;
    },
    getPlayers(state, getters) {
        return [{label:"a",class:state.settings.strikethrough},{label:"b",class:getters.getOppositeStrikethrough}];
    },
    get_leftover_positions(state){
        return state.size - state.positions.a.concat(state.positions.b).length;
    },
    getPositions(state){
        return state.positions;
    },
    getWinner(state){
        return state.winner;
    },
    get_did_i_win(state) {
        return (function (winning_combinations,my_combination) {
            let didiwin = false,
                BreakException = {},
                everyEval = (combination,my_combination)=>{
                    return combination.sort().every(function(value, index) { return my_combination.sort().indexOf(value)!=-1; });
                };

            try {
                winning_combinations.forEach(combination => {
                    didiwin = everyEval(combination,my_combination);
                    if (didiwin) throw BreakException;
                });
            } catch (e) {}

            return didiwin;
        })(state.winning_combinations, state.positions[state.turn]);
    },
    get_seconds_formated(state){
        return moment.utc(state.timer * 1000).format('HH:mm:ss');
    }
}