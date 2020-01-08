// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import { addFavService, removeFavService, showPopup } from "../../states/actions";
import singleServiceAPI from "../../api/singleService";
import { SERVICE_ARTICLES } from "../../api/urls";
import './Service.scss';

const Service = props => {
  const { serviceName, serviceImg, isFavourite } = props.service;
  const [favourite, setFavourite] = React.useState(isFavourite);
  const isLogged = useSelector((state: Object): Object => state.isLogged);
  const dispatch = useDispatch();
  const history = useHistory();

  const callAddFavService = () => {
    singleServiceAPI.POST.addFavService({
      service_name: serviceName
    })
      .then(response => {
        dispatch(
          addFavService({
            favouriteServices: response.data.user_fav_services
          })
        );
        setFavourite(true);
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  const callRemoveFavService = () => {
    singleServiceAPI.POST.removeFavService({
      service_name: serviceName
    })
      .then(response => {
        dispatch(
          removeFavService({
            favouriteServices: response.data.user_fav_services
          })
        );
        setFavourite(false);
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  const bookmarkClicked = () => {
    if (isLogged) {
      if (favourite) {
        callRemoveFavService();
      } else {
        callAddFavService();
      }
    } else {
      dispatch(showPopup({popupContent: {
        popupTitle: "You need to be logged in to save articles!"
      }}));
    }
  };

  const displayArticles = (event) => {
    const notTriggerOnClasses = ["ServiceBookmark", "Favourite"];
    if (!notTriggerOnClasses.includes(event.target.className)) {
          history.replace("/serviceArticles", {
      url: SERVICE_ARTICLES,
      service: serviceName
    });
  }
  };

  return (
    <div className="Service" onClick={displayArticles}>
      <img className="Image" src={serviceImg} alt={serviceName} />
      <p className="Name">{serviceName}</p>
      <span className="ServiceBookmark" onClick={bookmarkClicked}></span>
      <span
        className={classNames({ Favourite: favourite })}
        onClick={bookmarkClicked}
      ></span>
    </div>
  );
};

export default Service;
