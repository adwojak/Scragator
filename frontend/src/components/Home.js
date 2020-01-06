// @flow
import * as React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import articlesApi from "../api/articles";
import Article from "./Article";
import "./Home.scss";

const mapStateToProps = state => {
  return {
    isLogged: state.isLogged,
    favouriteArticles: state.favouriteArticles
  };
};

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    this.pageFetch();
  }

  state = {
    data: Array.from({}),
    hasMore: true,
    page: 1
  };

  mergeArticles = responseData => {
    const newData = responseData.map(article => {
      return {
        author: article.author,
        id: article.id,
        service: article.name,
        title: article.title,
        date: article.upload_date,
        isFavourite: this.props.favouriteArticles.includes(article.id)
      };
    });
    return [...this.state.data, ...newData];
  };

  pageFetch = () => {
    articlesApi
      .POST({
        page: this.state.page
      })
      .then(response => {
        this.setState({
          data: this.mergeArticles(response.data),
          page: this.state.page + 1,
          hasMore: response.data.length > 0
        });
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  onMount() {
    this.pageFetch();
  }

  render() {
    return (
      <ul className="Articles">
        <InfiniteScroll
          dataLength={this.state.data.length}
          next={this.pageFetch}
          loader={<h4>Loading...</h4>}
          hasMore={this.state.hasMore}
          endMessage={<p>End</p>}
        >
          {this.state.data.map(article => {
            return <Article key={article.id} article={article} />;
          })}
        </InfiniteScroll>
      </ul>
    );
  }
}

export default connect<_, _, _, _, _, _>(mapStateToProps)(ArticlesList);
