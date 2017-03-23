import axios from 'axios'
import { API_ENDPOINT_URL } from '../../../constants/Config'
import { RECIEVE_ZEN_EDIT, REQUEST_ZEN_CATEGORY, RECIEVE_ZEN_CATEGORY } from '../../../constants/ActionTypes'
import * as globalStore from '../../../store/globalStore'

// ------------------------------------
// Actions test
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

export const requestZenCategory = () => ({
  type: REQUEST_ZEN_CATEGORY
})

export const recieveZenCategory = category => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(false))
  dispatch({
    type: RECIEVE_ZEN_CATEGORY,
    payload: { category }
  })
}

export const fetchZenCategory = params => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(false))
  dispatch(requestZenCategory())
  const parseParams = params || ''
  return axios.get(`${API_ENDPOINT_URL}/api/categories${parseParams}`)
    .then((zen) => {
      dispatch(recieveZenCategory(zen.data))
    })
}

export const actions = {
  fetchZenEdit,
  requestZenCategory,
  recieveZenCategory,
  fetchZenCategory
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ZEN_ACTION_HANDLERS = {
  [RECIEVE_ZEN_EDIT]: (state, action) => ({ ...state, note: action.payload, fetching: true }),
  [REQUEST_ZEN_CATEGORY]: state => ({ ...state, fetching: true }),
  [RECIEVE_ZEN_CATEGORY]: (state, action) => ({
    ...state,
    category: action.payload.category,
    fetching: false
  })
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = { fetching: true, note:[] }
export default function zenReducer(state = initialState, action) {
  const handler = ZEN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
