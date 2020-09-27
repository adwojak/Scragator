import React from 'react';
import './Article.scss';

const Article = () => (
    <div className="ArticleContainer">
        <span className="ArticleBookmark"/>
        <div className="ArticleImage" style={{backgroundImage: 'url(https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349)'}}/>
        <div className="ArticleInfo">
            <p className="ArticleTitle">Jakiś tam przykładowy tytuł jakiegoś tam artykułu</p>
            <p className="ArticleMeta">23.12.1995 | NIEBEZPIECZNIK - Ktoś Ktosiowski</p>
        </div>
    </div>
);

export default Article;