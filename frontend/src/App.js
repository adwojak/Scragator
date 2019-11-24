import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: Array.from({}),
      services: null,
      hasMore: true,
      page: 1
    }
    this.pageFetch();
    this.pageFetch.bind(this);
  }

  pageFetch = () => {
    axios.get('http://localhost:5000/page', {
      params: {
        page: this.state.page
      }
    })
    .then(res => {
      console.log(res);
      this.setState({
        data: [
          ...this.state.data,
          ...res.data
        ],
        page: this.state.page + 1,
        hasMore: res.data.length > 0
      })
    });
  }

  servicesFetch() {
    axios.get('http://localhost:5000/services')
      .then(res => this.setState({services: res.data}))
  }

  displayArticles() {
    return this.state.data.map(function(item, i) {
      return (
        <div style={{height: 200}}>
          <p key={i}>{i} | {item.author} | {item.title} | {item.upload_date}</p>
        </div>
      )
    });
  }

  displayServices() {
    return this.state.services.map(function(item, i) {
      return <p key={i}>{item}</p>
    });
  }

  onMount() {
    this.pageFetch();
  }

  render() {
    return (
      <div className="App">
        {this.state.data && (
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.pageFetch}
            loader={<h4>Loading...</h4>}
            hasMore={this.state.hasMore}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.data.map(function(item, i) {
              return (<div style={{height: 200}}>
                <p key={i}>{i} | {item.author} | {item.title} | {item.upload_date}</p>
              </div>)
            })}
          </InfiniteScroll>
        )}
      </div>
    )
  }
}

export default App;
