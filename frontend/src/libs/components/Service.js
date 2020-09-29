import React from 'react';
import './Service.scss';

const Service = () => (
    <div className="ServiceContainer">
        <span className="ServiceBookmark"/>
        <div className="ServiceImage" style={{backgroundImage: 'url(https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349)'}}/>
        <p className="ServiceTitle">Niebezpiecznik</p>
    </div>
);

export default Service;