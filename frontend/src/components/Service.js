// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { addFavService, removeFavService } from "../states/actions";
import singleServiceAPI from "../api/singleService";
import { SERVICE_ARTICLES } from "../api/urls";

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
      console.log("You need to be logged in to save articles!");
    }
  };

  const displayArticles = () => {
    history.replace("/serviceArticles", {
      url: SERVICE_ARTICLES,
      service: serviceName
    });
  };

  return (
    <div>
      <p>{serviceName}</p>
      <p>{favourite ? "YES" : "NO"}</p>
      <button onClick={bookmarkClicked}>CLICK</button>
      <button onClick={displayArticles}>Display articles</button>
    </div>
  );
};

export default Service;
