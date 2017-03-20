import axios from 'axios'
import { API_ENDPOINT_URL } from '../../../constants/Config'
import { RECIEVE_ZEN_EDIT } from '../../../constants/ActionTypes'
import * as globalStore from '../../../store/globalStore'

// ------------------------------------
// Actions
// ------------------------------------

export const recieveZenEdit = id => (dispatch) => {
  dispatch({
    type: RECIEVE_ZEN_EDIT,
    payload: id
  })
}


export const fetchZenEdit = id => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(false))
  dispatch(recieveZenEdit())
  return axios.get(`${API_ENDPOINT_URL}/api/notes/${id}`)
    .then(text => dispatch(recieveZenEdit(text.data)))
}

export const actions = {
  fetchZenEdit
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ZEN_ACTION_HANDLERS = {
  [RECIEVE_ZEN_EDIT]: (state, action) => ({ ...state, note: action.payload, fetching: true })
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = { fetching: true, note:[] }
export default function zenReducer(state = initialState, action) {
  const handler = ZEN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
