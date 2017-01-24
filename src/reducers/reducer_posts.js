import { FETCH_POSTS } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_POSTS:
            // takes whatever 'state' has and add to 'all'
            return { ...state, all: action.payload.data }
        default:
            return state;
    }
}