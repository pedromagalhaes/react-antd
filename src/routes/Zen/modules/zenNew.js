import axios from 'axios'
import { API_ENDPOINT_URL } from '../../../constants/Config'
import { REQUEST_ZEN_CATEGORY, RECIEVE_ZEN_CATEGORY } from '../../../constants/ActionTypes'
import * as globalStore from '../../../store/globalStore'

// ------------------------------------
// Actions
// ------------------------------------

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
  requestZenCategory,
  recieveZenCategory,
  fetchZenCategory
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ZEN_ACTION_HANDLERS = {
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

const initialState = {
  fetching: true,
  category: []
}

export default function zenReducer(state = initialState, action) {
  const handler = ZEN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
