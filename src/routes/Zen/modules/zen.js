import axios from 'axios'
import { API_ENDPOINT_URL } from '../../../constants/Config'
import {
  REQUEST_ZEN,
  RECIEVE_ZEN,
  REQUEST_DELETE_ZEN,
  COMPLETED_DELETE_ZEN
} from '../../../constants/ActionTypes'
import * as globalStore from '../../../store/globalStore'

// ------------------------------------
// Actions
// ------------------------------------

// fetch zen
export const requestZen = () => ({
  type: REQUEST_ZEN
})

export const recieveZen = (zen, count, currentPage) => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(false))
  dispatch({
    type: RECIEVE_ZEN,
    payload: { zen, count, current:currentPage }
  })
}


export const fetchZen = params => (dispatch) => {
  const current = params ? params.current : 1
  const zenQueryStr = params ? encodeURIComponent(JSON.stringify(params)) : null
  const countQueryStr = params.where ? `?where=${encodeURIComponent(JSON.stringify(params.where))}` : ''

  dispatch(globalStore.dataFetchStatusChange(true))
  dispatch(requestZen())

  return axios.all([
    axios.get(`${API_ENDPOINT_URL}/api/notes?filter=${zenQueryStr}`),
    axios.get(`${API_ENDPOINT_URL}/api/notes/count${countQueryStr}`)
  ]).then(axios.spread((zen, count) => {
    dispatch(recieveZen(zen.data, count.data.count, current))
  }))
}

// delete zen
export const requestDeleteZen = () => ({
  type: REQUEST_DELETE_ZEN
})
export const completedDeleteZen = id => (dispatch) => {
  dispatch(globalStore.dataFetchStatusChange(false))
  dispatch({
    type: COMPLETED_DELETE_ZEN,
    id
  })
}
export const deleteZen = id => (dispatch) => {
  // shows the general spinner
  dispatch(globalStore.dataFetchStatusChange(true))
  // calls the action to inform about state change
  dispatch(requestDeleteZen())
  // The actual Delete API call.
  return axios.delete(`${API_ENDPOINT_URL}/api/notes/${id}`)
    // calls the action to inform about state change
    .then(() => dispatch(completedDeleteZen(id)))
}

// export actions
export const actions = {
  requestZen,
  recieveZen,
  fetchZen,
  requestDeleteZen,
  completedDeleteZen,
  deleteZen
}

// ------------------------------------
// Action Handlers. In other examples of Redux, this has the shape of a "switch"
// ------------------------------------

const ZEN_ACTION_HANDLERS = {

  [REQUEST_ZEN]: state => ({ ...state, fetching: true }),
  [RECIEVE_ZEN]: (state, action) => ({
    ...state,
    zens: action.payload.zen,
    count: action.payload.count,
    currentPage: action.payload.current,
    fetching: false
  }),

  [REQUEST_DELETE_ZEN]: state => ({ ...state, fetching: true }),
  [COMPLETED_DELETE_ZEN]: (state, action) => ({ ...state,
    // In order to avoid fetching the whole list again, we just remove the line that was deleted.
    // This code takes the whole list (state.zens) and filters only the items which ID is the same
    // than the one sent as parameter by the action "completedDeleteZen" (this action sends type and id)
    zens: state.zens.filter((x) => {
      if (x.id !== action.id) {
        return x
      } return null
    }),
    fetching: false })
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  fetching: false,
  zens: [],
  count: 0,
  currentPage: 1
}

export default function zenReducer(state = initialState, action) {
  const handler = ZEN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
