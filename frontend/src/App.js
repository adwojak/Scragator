import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      services: null,
      page: 1
    }
    this.pageFetch.bind(this);
  }

  pageFetch() {
    axios.get('http://localhost:5000/page', {
      params: {
        page: this.state.page
      }
    })
      .then(res => this.setState({data: res.data}));
  }

  servicesFetch() {
    axios.get('http://localhost:5000/services')
      .then(res => this.setState({services: res.data}))
  }

  changePage(e) {
    this.setState({
      page: e.target.value
    })
  }

  displayArticles() {
    return this.state.data.map(function(item, i) {
      return <p key={i}>{i} | {item.author} | {item.title} | {item.upload_date}</p>
    });
  }

  displayServices() {
    return this.state.services.map(function(item, i) {
      return <p key={i}>{item}</p>
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <input type="range" min="1" max="5" value={this.state.page} name="page" onChange={(e) => this.changePage(e)}/>
          <label>{this.state.page}</label>
        </div>
        <div>
          <button onClick={() => this.pageFetch()}>Page</button>
          <button onClick={() => this.servicesFetch()}>Services</button>
        </div>
        <div>
          <div style={{width: `50%`, float: `left`}}>
            {this.state.data && this.displayArticles()}
          </div>
          <div style={{width: `50%`, float: `left`}}>
            {this.state.services && this.displayServices()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
