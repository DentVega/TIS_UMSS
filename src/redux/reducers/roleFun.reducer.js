import {CHANGE_ROLEFUNCS, CLEAN_ALL_REDUCERS} from '../actions/actions';

const initialState = {
    actualFuncs:null,
    roleFuncs:null,
    loading:true
}

function roleFuncsReducer(state=initialState,action){
    switch(action.type){
        case CHANGE_ROLEFUNCS:{
            return {
                ...state,
                roleFuncs: action.roleFuncs,
                loading: false
            }
        }
        case CLEAN_ALL_REDUCERS: {
            return initialState;
        }
        default:
            return state;
        
    }
}

export default roleFuncsReducer;