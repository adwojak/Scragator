// @flow
import * as React from "react";
import { connect } from "react-redux";
import { axiosPost, axiosGet } from "../api/apiBase";
import ScrollingPage from "../libs/components/ScrollingPage";

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

  makeRequest = (url, method, rest) => {
    if (method === "POST") {
      return axiosPost(url, {
        page: this.state.page,
        ...rest
      });
    } else {
      return axiosGet(url);
    }
  };

  pageFetch = () => {
    const { url, method = "POST", ...rest } = this.props.location.state;
    this.makeRequest(url, method, rest)
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

  render() {
    return (
      <ScrollingPage
        data={this.state.data}
        pageFetch={this.pageFetch}
        hasMore={this.state.hasMore}
      />
    );
  }
}

export default connect<_, _, _, _, _, _>(mapStateToProps)(ArticlesList);
