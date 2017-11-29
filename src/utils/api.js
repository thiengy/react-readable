const url = "http://localhost:3001"

const headers = {
  'Authorization': 'topsecret'
}

//Category API
export const getCategories = () => 
  fetch(`${url}/categories`, { method: 'GET', headers })
    .then(results => results.json())
    .then(results => results)
    
//Post API
export const getPosts = () => 
  fetch(`${url}/posts`, { method: 'GET', headers })
    .then(results => results.json()
)

export const newPost = postData =>
  fetch(`${url}/posts`, { method: 'POST', headers: {
      'Authorization': 'topsecret',
      'Content-Type': 'application/json'
    }, body: JSON.stringify(postData)})
      .then(results => results.json()
)

export const editPost = (postData, postId) => 
  fetch(`${url}/posts/${postId}`, { method: 'PUT', headers: {
    'Authorization': 'topsecret',
    'Content-Type': 'application/json'
  }, body: JSON.stringify(postData)})
    .then(results => results.json()
)

export const deletePost = postId =>
  fetch(`${url}/posts/${postId}`, { method: 'DELETE', headers })
    .then(results => results.json()
)

export const votePost = (postId, vote) =>
  fetch(`${url}/posts/${postId}`, { method: 'POST', headers: {
      'Authorization': 'topsecret',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ option: vote })})
      .then(results => results.json()
)
  
//Comment API
export const getComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, { method: 'GET', headers })
    .then(results => results.json()
)

export const newComment = (commentData) =>
  fetch(`${url}/comments`, { method: 'POST', headers: {
    'Authorization': 'topsecret',
    'Content-Type': 'application/json'
  }, body: JSON.stringify(commentData)})
    .then(results => results.json()
)

export const deleteComment = commentId =>
  fetch(`${url}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(results => results.json()
)
  
export const voteComment = (commentId, vote) =>
  fetch(`${url}/comments/${commentId}`, { method: 'POST', headers: {
        'Authorization': 'topsecret',
        'Content-Type': 'application/json'
      }, body: JSON.stringify({option: vote})})
        .then(results => results.json()
)