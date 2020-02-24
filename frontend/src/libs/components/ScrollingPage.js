// @flow
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { withTranslation } from 'react-i18next';
import Article from "./Article";
import "./ScrollingPage.scss";

type PropsType = $ReadOnly<{|
  data: Array,
  pageFetch: Function,
  hasMore: boolean,
  setDisplayArticle: Function,
  t: Function
|}>;

class ScrollingPage extends React.Component<PropsType, null> {
  render(): React.Node {
    const { data, pageFetch, hasMore, setDisplayArticle, t } = this.props;

    return (
      <ul className="Articles">
        <InfiniteScroll
          dataLength={data.length}
          next={pageFetch}
          loader={<h4 className="Loading">{t("Loading")}</h4>}
          hasMore={hasMore}
        >
          {data.map((article: Object): React.Node => {
            return (
              <Article
                key={article.id}
                article={article}
                setDisplayArticle={setDisplayArticle}
              />
            );
          })}
        </InfiniteScroll>
      </ul>
    );
  }
}

export default withTranslation()(ScrollingPage);
