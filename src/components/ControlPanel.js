import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getCategories,
  selectCategory, 
  sortDateAscending, 
  sortDateDescending, 
  sortVoteAscending, 
  sortVoteDescending 
} from '../actions'

class ControlPanel extends Component {

  componentWillMount(){
    this.props.getCategories()
  }

  render(){
    return(
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable!</h1>
        </header>
        <div>
          <div> 
            Sort by Vote: <button onClick={(click) => this.props.sortVoteAscending()} > Ascending </button>
            / <button onClick={(click) => this.props.sortVoteDescending()} > Descending </button> 
          </div>
          <div> 
            Sort by Date: <button onClick={(click) => this.props.sortDateAscending()} > Ascending </button>
            / <button onClick={(click) => this.props.sortDateDescending()} > Descending </button> 
        </div>
          <div className="Header-control">
            Categories:
            <select>
              <option key={'all'} onClick={(click) => this.props.selectCategory('all')} >all</option>
              {this.props.categories.map((category) => (
                <option key={category} onClick={(click) => this.props.selectCategory(category)} >{category}</option>
              ))}
            </select>
            <div>
              <Link to={'/new-post'} >New Post </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    sortOrderToggle: state.sortOrderToggle,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCategories: () => dispatch(getCategories()),
    selectCategory: (category) => dispatch(selectCategory(category)),
    sortDateAscending: () => dispatch(sortDateAscending()),
    sortDateDescending: () => dispatch(sortDateDescending()),
    sortVoteAscending: () => dispatch(sortVoteAscending()),
    sortVoteDescending: () => dispatch(sortVoteDescending()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)