import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state ={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress} 
      />
          <Switch>
            <Route exact path="/">
              <News setProgress={this.setProgress}
                key="general"
                pagesize="15"
                country="in"
                category="general"
              ></News>
            </Route>
            <Route exact path="/business">
              <News setProgress={this.setProgress}
                key="business"
                pagesize="15"
                country="in"
                category="business"
              ></News>
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress}
                key="entertainment"
                pagesize="15"
                country="in"
                category="entertainment"
              ></News>
            </Route>
            <Route exact path="/health">
              <News setProgress={this.setProgress}
                key="health"
                pagesize="15"
                country="in"
                category="health"
              ></News>
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress}
                key="science"
                pagesize="15"
                country="in"
                category="science"
              ></News>
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress}
                key="sports"
                pagesize="15"
                country="in"
                category="sports"
              ></News>
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress}
                key="technology"
                pagesize="15"
                country="in"
                category="technology"
              ></News>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
