// @flow
import * as React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Button from "../libs/components/Button";
import { SAVED_ARTICLES } from "../api/urls";
import "./Profile.scss";

const Profile = () => {
  const history = useHistory();
  const savedArticles = () => {
    history.push("/", { url: SAVED_ARTICLES });
  };

  return (
    <div className="Profile">
      <Button className="ButtonBig Button" onClick={savedArticles}>
        Favourite articles
      </Button>
      <Button className="ButtonBig Button">Favourite services</Button>
      <Button className="ButtonBig Button ButtonWarning">Delete profile</Button>
    </div>
  );
};

export default Profile;
