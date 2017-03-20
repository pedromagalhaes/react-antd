import axios from 'axios'
import { API_ENDPOINT_URL } from '../../../constants/Config'
import { RECIEVE_ZEN_VIEW } from '../../../constants/ActionTypes'
import * as globalStore from '../../../store/globalStore'

// ------------------------------------
// Actions
// ------------------------------------

export const recieveZenView = id => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(true))
  dispatch({
    type: RECIEVE_ZEN_VIEW,
    payload: id
  })
}


export const fetchZenView = id => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(false))
  dispatch(recieveZenView())
  return axios.get(`${API_ENDPOINT_URL}/api/notes/${id}`)
    .then(text => dispatch(recieveZenView(text.data)))
}

export const actions = {
  fetchZenView
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ZEN_ACTION_HANDLERS = {
  [RECIEVE_ZEN_VIEW]: (state, action) => ({ ...state, note: action.payload, fetching: true })
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = { fetching: true, note:[] }
export default function zenReducer(state = initialState, action) {
  const handler = ZEN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
