import { combineReducers } from 'redux'
import { 
  LOAD_CATEGORIES, 
  SELECT_CATEGORY, 
  VOTE_ASCENDING, 
  VOTE_DESCENDING, 
  DATE_ASCENDING, 
  DATE_DESCENDING, 
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  LOAD_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions'

function formatId (items) {
  const formattedItems = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemId = item.id
    formattedItems[itemId] = item
  }
  return formattedItems
}

function categories (state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function filter (state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.filter
    default:
      return state
  }
}

function sortOrder (state = 'DATE_DESCENDING', action) {
  switch (action.type) {
    case VOTE_ASCENDING:
      return 'VOTE_ASCENDING'
    case VOTE_DESCENDING:
      return 'VOTE_DESCENDING'
    case DATE_ASCENDING:
      return 'DATE_ASCENDING'
    case DATE_DESCENDING:
      return 'DATE_DESCENDING'
    default:
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...formatId(action.posts)}
    case ADD_POST:
      return { ...formatId(action.post)}
    case REMOVE_POST:
      return state
    case EDIT_POST:
      return { ...state, ...formatId(action.post)}
    default:
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return { ...formatId(action.comments)}
    case ADD_COMMENT:
      return { ...formatId(action.comment)}
    case REMOVE_COMMENT:
      state[action.comments].deleted = true
      return state
    default:
      return state
  }
}

export default combineReducers({
  categories,
  filter,
  sortOrder,
  posts,
  comments,
})