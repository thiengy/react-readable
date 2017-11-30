import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, deletePost, votePost, changePost } from '../actions'
import { Link } from 'react-router-dom'

class Posts extends Component {
  constructor(props){
    super(props)
    this.state = {
      browserCategory: this.props.match.params.category,
    }
  }
  /*
  formInput = submit => {
    const name = submit.target.name
    const value = submit.target.value

    this.setState({
      [name]: value
    })
  }

  submitPost = submit => {
    submit.preventDefault()
    const formData = {
      id: this.state.postId,
      timestamp: this.state.postTimestamp,
      title: this.state.postTitle,
      body: this.state.postBody,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      voteScore: this.state.postVoteScore,
      deleted: this.state.postDeleted,
    }
    this.props.changePost(formData, formData.id)
    this.setState({
      postId: '',
      postTimestamp: '',
      postTitle: '',
      postBody: '',
      postAuthor: '',
      postCategory: '',
      postVoteScore: '',
      postDeleted: '',
      renderPostEditor: false,
    })
    this.props.history.push('/')
  }

  displayPostEditor (postId) {
    this.setState({
      postId: this.props.posts[postId].id,
      postTimestamp: this.props.posts[postId].timestamp,
      postTitle: this.props.posts[postId].title,
      postBody: this.props.posts[postId].body,
      postAuthor: this.props.posts[postId].author,
      postCategory: this.props.posts[postId].category,
      postVoteScore: this.props.posts[postId].voteScore,
      postDeleted: this.props.posts[postId].deleted,
      renderPostEditor: true,
    })
  }
  */
  componentDidMount(){
    this.props.getPosts()
  }
  
  deletePost = postId => {
    this.props.dispatch(deletePost(postId)).then(this.props.getPosts())
  }
  
  render(){
    return(
      <div>
        {this.props.posts && Object.values(this.props.posts)
          .filter(post => !post.deleted)
          .filter(post => this.props.match.params.category !== undefined ? post.category === this.props.match.params.category : post.category !== undefined  )
          .sort((a, b) => {
            switch (this.props.sortOrder) {
              case 'VOTE_ASCENDING':
                return b.voteScore - a.voteScore
              case 'VOTE_DESCENDING':
                return a.voteScore - b.voteScore
              case 'DATE_ASCENDING':
                return a.timestamp - b.timestamp
              case 'DATE_DESCENDING':
                return b.timestamp - a.timestamp
              default:
                return b.timestamp - a.timestamp
            }
          })
          .map((post) =>
            <div key={post.id} className='Posts' >
              <div className='Post-title' >
                <p><b><Link to={`/${post.category}/${post.id}`} >{post.title}</Link></b> <i>Rating: {post.voteScore} Comments: {post.commentCount}</i></p>
                
                <button onClick={() => this.props.submitVotePost(post.id, 'upVote')}>Vote Up</button>
                <button onClick={() => this.props.submitVotePost(post.id, 'downVote')}>Vote Down</button>
                <Link to={{ pathname: `/${post.category}/${post.id}`, state: { renderPostEditor: true }}} ><button>Edit</button></Link>
                <button onClick={(click) => this.deletePost(post.id)}>Delete</button>
                {this.state.renderPostEditor && 
                <div>
                  <h3>Edit Post</h3>
                  <form onSubmit={this.submitPost}>
                    <div>
                      Username: <input required type="text" name="postAuthor" value={this.state.postAuthor} onChange={this.formInput}></input>
                    </div>
                    <div>
                      Category:
                      <select required type="text" name="postCategory" value={this.state.postCategory} onChange={this.formInput} >
                        {this.props.categories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      Title: <input required type="text" name="postTitle" value={this.state.postTitle} onChange={this.formInput}></input>
                    </div>
                    <div>
                      Body: <input required type="text" name="postBody" value={this.state.postBody} onChange={this.formInput}></input>
                    </div>
                    <div>
                      <input type="submit" value="Submit"/> <Link to={'/'} >Cancel</Link>
                    </div>
                  </form>
                </div>}
              </div>
              <div className='Post-metainfo' >
                <p><i>posted by {post.author} to {post.category} on {new Date(post.timestamp).toString()}</i></p>
              </div>
            </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    filter: state.filter,
    sortOrder: state.sortOrder,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPosts: () => dispatch(getPosts()),
    submitVotePost: (postId, vote) => dispatch(votePost(postId, vote)),
    changePost: (data, postId) => dispatch(changePost(data, postId)),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

//<button onClick={(click) => this.displayPostEditor(post.id)}>Edit</button>
