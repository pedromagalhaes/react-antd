import {
  DATA_FETCH_STATUS,
  UPDATE_PAGE_TITLE
} from '../constants/ActionTypes'

// ------------------------------------
// Actions
// ------------------------------------
export const dataFetchStatusChange = fetching => ({
  type    : DATA_FETCH_STATUS,
  payload : fetching
})

export const updatePageTitle = title => ({
  type    : UPDATE_PAGE_TITLE,
  payload : title
})

const GLOBAL_ACTION_HANDLERS = {
  [DATA_FETCH_STATUS]: (state, action) => ({ ...state, fetching: action.payload }),
  [UPDATE_PAGE_TITLE]: (state, action) => ({ ...state, pageTitle: action.payload })
}

const initialState = {
  fetching: false,
  pageTitle: null
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function globalReducer(state = initialState, action) {
  const handler = GLOBAL_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
