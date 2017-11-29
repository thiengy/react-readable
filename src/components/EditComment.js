import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newComment, getComments } from '../actions'

class EditComment extends Component {
  constructor(props){
    super(props)
    this.state = {
      body: this.props.commentData.body,
      author: this.props.commentData.author,
      renderCommentEditor: false,
    }
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
      id: this.props.commentData.id,
      parentId: this.props.commentData.parentId,
      timestamp: this.props.commentData.timestamp,
      body: this.state.body,
      author: this.state.author,
      voteScore: this.props.commentData.voteScore,
      deleted: this.props.commentData.deleted,
      parentDeleted: this.props.commentData.parentDeleted
    }
    this.props.newComment(formData)
    this.props.getComments(this.props.commentData.parentId)
  }

  displayCommentEditor = () => {
    this.setState({
      renderCommentEditor: true
    })
  }

  render(){
    return(
      <div key={this.props.commentData.id}>
        <button onClick={this.displayCommentEditor}>Edit</button>
        {console.log(this.props)}
        {this.state.renderCommentEditor &&
        <form onSubmit={this.submitComment}>
          <div><b>Edit Comment</b></div>
          <div>
            Username: <input required type="text" name="author" value={this.state.author} onChange={this.formInput}></input>
          </div>
          <div>
            Body: <input required type="text" name="body" value={this.state.body} onChange={this.formInput}></input>
          </div>
          <div>
            <input type="submit" value="Submit"/> <button>Cancel</button>
          </div>
        </form>
        }
      </div>
    )
  }
}

function mapStateToProps(state,ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getComments: (data) => dispatch(getComments(data)),
    newComment: (data) => dispatch(newComment(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)