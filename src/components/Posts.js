import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions'
import { Link } from 'react-router-dom'

class Posts extends Component {
  constructor(props){
    super(props)
    this.state = {
      browserCategory: this.props.match.params.category,
    }
  }

  componentDidMount(){
    this.props.getPosts()
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
    sortOrder: state.sortOrder
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)