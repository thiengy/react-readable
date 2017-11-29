import * as api from '../utils/api'

//Action Types
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const DATE_ASCENDING = 'DATE_ASCENDING'
export const DATE_DESCENDING = 'DATE_DESCENDING'
export const VOTE_ASCENDING = 'VOTE_ASCENDING'
export const VOTE_DESCENDING = 'VOTE_DESCENDING'
export const LOAD_POSTS = 'LOAD_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

//Action 
export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export const selectCategory = filter => ({
  type: SELECT_CATEGORY,
  filter
})

export const sortDateAscending = sort => ({
  type: DATE_ASCENDING,
  sort
})

export const sortDateDescending = sort => ({
  type: DATE_DESCENDING,
  sort
})

export const sortVoteAscending = sort => ({
  type: VOTE_ASCENDING,
  sort
})

export const sortVoteDescending = sort => ({
  type: VOTE_DESCENDING,
  sort
})

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
})

export const addPost = post => ({
  type: ADD_POST,
  post
})

export const editPost = post => ({
  type: EDIT_POST,
  post
})

export const removePost = post => ({
  type: REMOVE_POST,
  post
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

export const removeComment = comments => ({
  type: REMOVE_COMMENT,
  comments
})


export const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments
})

//Action Creators

export const getCategories = () => dispatch =>
  api.getCategories()
    .then(data => dispatch(loadCategories(data.categories
      .map((data) => data.name)))
)

export const getPosts = () => dispatch =>
  api.getPosts()
    .then(data => dispatch(loadPosts(data))
)

export const newPost = (data) => dispatch =>
  api.newPost(data)
    .then (data => dispatch(addPost(data))
)

export const changePost = (data, postId) => dispatch =>
  api.editPost(data, postId)
    .then (data => dispatch(editPost(data))
)

export const deletePost = (data) => dispatch =>
  api.deletePost(data)
    .then (data => dispatch(removePost(data))
)

export const votePost = (postId, vote) => dispatch =>
  api.votePost(postId, vote)
    .then(data => dispatch(getPosts(data))
)
  
export const getComments = (postId) => dispatch =>
  api.getComments(postId)
    .then(data => dispatch(loadComments(data))
)

export const newComment = commentData => dispatch =>
  api.newComment(commentData)
    .then(data => dispatch(addComment(data))
)

export const deleteComment = (commentId, postId) => dispatch =>
  api.deleteComment(commentId)
    .then(data => api.getComments(postId))
    .then(data => dispatch(loadComments(data))
)

export const voteComment = (commentId, postId, vote) => dispatch =>
  api.voteComment(commentId, vote)
    .then(data => api.getComments(postId))
    .then(data => dispatch(loadComments(data))
)