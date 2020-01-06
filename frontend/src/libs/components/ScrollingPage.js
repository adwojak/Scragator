// @flow
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import "./ScrollingPage.scss";

class ScrollingPage extends React.Component {
  render() {
    const { data, pageFetch, hasMore } = this.props;

    return (
      <ul className="Articles">
        <InfiniteScroll
          dataLength={data.length}
          next={pageFetch}
          loader={<h4>Loading...</h4>}
          hasMore={hasMore}
          endMessage={<p>End</p>}
        >
          {data.map(article => {
            return <Article key={article.id} article={article} />;
          })}
        </InfiniteScroll>
      </ul>
    );
  }
}

export default ScrollingPage;
