import React, { Component } from 'react'
import { connect } from 'react-redux'
import ControlPanel from './components/ControlPanel'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import NewPost from './components/NewPost'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {

  render(){ 
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={ControlPanel} />
          <Route exact path='/new-post' component={NewPost} />
          <Route exact path='/' component={Posts} />
          <Route exact path='/:category' component={Posts} />
          <Route exact path='/:category/:postId' component={PostDetail} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect()(App)