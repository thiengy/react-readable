import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  deletePost, 
  deleteComment, 
  newComment, 
  changePost, 
  getComments, 
  votePost, 
  voteComment 
} from '../actions'
import { Link, withRouter } from 'react-router-dom'
import EditComment from './EditComment'
const uuidv1 = require('uuid/v1')

class PostDetail extends Component {
  state ={
    postTitle: '',
    postBody: '',
    postAuthor: '',
    postCategory: '',
    renderPostEditor: false,
    commentBody: '',
    commentAuthor: '',
  }

  formInput = submit => {
    const name = submit.target.name
    const value = submit.target.value

    this.setState({
      [name]: value
    })
  }

  submitComment = submit => {
    submit.preventDefault()
    const formData = {
      id: uuidv1(),
      parentId: this.props.post.id,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    }
    this.props.newComment(formData)
    this.setState({
      commentBody: '',
      commentAuthor: '',
    })
    this.props.getComments(this.props.match.params.postId)
  }

  submitPost = submit => {
    submit.preventDefault()
    const formData = {
      id: this.props.post.id,
      timestamp: this.props.post.timestamp,
      title: this.state.postTitle,
      body: this.state.postBody,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      voteScore: this.props.post.voteScore,
      deleted: this.props.post.deleted,
    }
    this.props.changePost(formData, formData.id)
    this.setState({
      postTitle: '',
      postBody: '',
      postAuthor: '',
      postCategory: '',
      renderPostEditor: false,
    })
    this.props.history.push('/')
  }
    
  displayPostEditor () {
    this.setState({
      postTitle: this.props.post.title,
      postBody: this.props.post.body,
      postAuthor: this.props.post.author,
      postCategory: this.props.post.category,
      renderPostEditor: true
    })
  }

  componentDidMount() {
    this.props.getComments(this.props.match.params.postId)
  }

  deletePost = id => {
    this.props.dispatch(deletePost(id))
    this.props.history.push('/')
  }

  render(){
    const { post, comments } = this.props
    if(!post) {
      return <div/>
    }
    return(
      <div key={post.id} className='Posts' >
        <div>
          <p><b><Link to={`/`}>{post.title}</Link></b> <i> Rating: {post.voteScore} Comments: {post.commentCount}</i>
            <button onClick={(click) => this.displayPostEditor()}>Edit</button>
            <button onClick={(click) => this.deletePost(this.props.match.params.postId)}>Delete</button>
          </p>
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
          <button onClick={() => this.props.submitVotePost(post.id, 'upVote')}>Vote Up</button>
          <button onClick={() => this.props.submitVotePost(post.id, 'downVote')}>Vote Down</button>
          <div>
            <p>{post.body}</p>
          </div>
          <div>
            <p><i>posted by {post.author} to {post.category} on {new Date(post.timestamp).toString()}</i></p>
          </div>
            <h3>COMMENTS:</h3>
            {comments && Object.values(comments)
            .filter(comment => !comment.deleted)
            .sort((a, b) => b.voteScore - a.voteScore)
            .map((comment) =>
              <div key={comment.id}> 
                <div>"{comment.body}" <i> Rating: {comment.voteScore} </i> 
                  <button onClick={() => this.props.deleteComment(comment.id, post.id)}>Delete</button>
                </div>
                <div>
                  <EditComment commentData={comment}/>
                </div>
                <div>
                  <button onClick={() => this.props.submitVoteComment(comment.id, post.id, 'upVote')}>Vote Up</button>
                  <button onClick={() => this.props.submitVoteComment(comment.id, post.id, 'downVote')}>Vote Down</button>
                  <p><i>comment by {comment.author} on {new Date(comment.timestamp).toString()}</i></p>
                </div>
              </div>
            )}
        </div>
        <div>
          <h3>Add New Comment:</h3>
          <form onSubmit={this.submitComment}>
          <div>
            Username: <input required type="text" name="author" value={this.state.author} onChange={this.formInput}></input>
          </div>
          <div>
            Body: <input required type="text" name="body" value={this.state.body} onChange={this.formInput}></input>
          </div>
          <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps) {
  return {
    post: state.posts[ownProps.match.params.postId],
    comments: state.comments,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getComments: (data) => dispatch(getComments(data)),
    newComment: (data) => dispatch(newComment(data)),
    deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
    changePost: (data, postId) => dispatch(changePost(data, postId)),
    submitVotePost: (postId, vote) => dispatch(votePost(postId, vote)),
    submitVoteComment: (commentId, postId, vote) => dispatch(voteComment(commentId, postId, vote))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
)