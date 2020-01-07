// @flow
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import "./ScrollingPage.scss";

type PropsType = $ReadOnly<{|
data: Array,
pageFetch: Function,
hasMore: boolean  
|}>;

class ScrollingPage extends React.Component<PropsType, null> {
  render(): React.Node {
    const { data, pageFetch, hasMore } = this.props;

    return (
      <ul className="Articles">
        <InfiniteScroll
          dataLength={data.length}
          next={pageFetch}
          loader={<h4 class="Loading">Loading...</h4>}
          hasMore={hasMore}
          endMessage={<p class="End">End</p>}
        >
          {data.map((article: Object): React.Node => {
            return <Article key={article.id} article={article} />;
          })}
        </InfiniteScroll>
      </ul>
    );
  }
}

export default ScrollingPage;
