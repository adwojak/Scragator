import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { articles: state.articles };
};

const ArticlesList = ({ articles }) => (
    <ul>
        {articles.map(el => (
            <li key={el.id}>{el.title}</li>
        ))}
    </ul>
);

export default connect(mapStateToProps)(ArticlesList);