// @flow
import * as React from "react";
import { connect } from "react-redux";
import { axiosPost, axiosGet } from "../api/apiBase";
import { HOME } from "../api/urls";
import ScrollingPage from "../libs/components/ScrollingPage";
import ArticleWindow from "../libs/components/ArticleWindow";

type StateType = $ReadOnly<{|
  isLogged: boolean,
  favouriteArticles: Array
|}>;

const mapStateToProps = (state: StateType): Object => {
  return {
    isLogged: state.isLogged,
    favouriteArticles: state.favouriteArticles
  };
};

class ArticlesList extends React.Component {
  constructor(props: Object) {
    super(props);
    this.pageFetch();
  }

  state = {
    data: Array.from({}),
    hasMore: true,
    page: 1,
    displayedArticle: null
  };

  mergeArticles = (responseData: Object): Array => {
    const newData = responseData.map((article: Object): Object => {
      return {
        author: article.author,
        id: article.id,
        service: article.name,
        title: article.title,
        date: article.upload_date,
        url: article.url,
        isFavourite: this.props.favouriteArticles.includes(article.id)
      };
    });
    return [...this.state.data, ...newData];
  };

  makeRequest = (url: string, method: string, rest: Object): Promise => {
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
    const { url = HOME, method = "POST", ...rest } =
      this.props.location.state || {};
    this.makeRequest(url, method, rest)
      .then((response: Object) => {
        this.setState({
          data: this.mergeArticles(response.data),
          page: this.state.page + 1,
          hasMore: response.data.length > 0
        });
      })
      .catch((error: Error) => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  setDisplayArticle = (url: string) => {
    this.setState({
      displayedArticle: url
    });
  };

  render(): React.Node {
    return (
      <React.Fragment>
        {this.state.displayedArticle ? (
          <ArticleWindow
            url={this.state.displayedArticle}
            setDisplayArticle={this.setDisplayArticle}
          />
        ) : (
          <ScrollingPage
            data={this.state.data}
            pageFetch={this.pageFetch}
            hasMore={this.state.hasMore}
            setDisplayArticle={this.setDisplayArticle}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect<_, _, _, _, _, _>(mapStateToProps)(ArticlesList);
