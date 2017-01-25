import { FETCH_POSTS, FETCH_POST } from '../actions/index';

// 2 pieces of state
// all: all posts but not the content
// post: active post
const INITIAL_STATE = { all: [], post: null };

export default function (state = INITIAL_STATE, action){

    switch(action.type){

        case FETCH_POST:
            return { ...state, post: action.payload.data };

        case FETCH_POSTS:
            // takes whatever 'state' has and add to 'all'
            return { ...state, all: action.payload.data };

        default:
            return state;

    }

}