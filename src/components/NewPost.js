import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { newPost, getPosts } from '../actions'
const uuidv1 = require('uuid/v1')

class NewPost extends Component {
  state ={
    title: '',
    body: '',
    author: '',
    category: 'react',
  }

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
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      voteScore: 0,
      deleted: false,
      commentCount: 0
    }
    this.props.addPost(formData)
    this.props.history.push('/')
    this.props.getPosts()
  }

  render(){
    return(
      <div>
        <div><b>Create New Post</b></div>
        <form onSubmit={this.submitPost}>
          <div>
            Username: <input required type="text" name="author" onChange={this.formInput}></input>
          </div>
          <div>
            Category:
            <select required type="text" name="category" onChange={this.formInput} >
              {this.props.categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            Title: <input required type="text" name="title" onChange={this.formInput}></input>
          </div>
          <div>
            Body: <input required type="text" name="body" onChange={this.formInput}></input>
          </div>
          <div>
            <input type="submit" value="Submit"/> <Link to={'/'} >Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addPost: (postData) => dispatch(newPost(postData)),
    getPosts: () => dispatch(getPosts())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewPost)