// @flow
import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser } from "../states/actions";
import Button from "../libs/components/Button";
import { axiosPost } from "../api/apiBase";
import { SAVED_ARTICLES, SAVED_SERVICES, DELETE_USER } from "../api/urls";
import "./Profile.scss";

const Profile = (): React.Node => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteBoxDisplayed, setDeleteBoxDisplayed] = React.useState(false);
  const savedArticles = () => {
    history.push("/savedArticles", { url: SAVED_ARTICLES });
  };

  const savedServices = () => {
    history.push("/savedServices", { url: SAVED_SERVICES });
  };

  const deleteProfile = () => {
    axiosPost(DELETE_USER, {
      is_confirmed: true
    })
      .then((response: Object) => {
        dispatch(deleteUser());
        history.push("/message", { isDeleted: true });
      })
      .catch((error: Error) => {
        history.push("/message", { serverError: true });
      });
  };

  const DeleteBox = (): React.Node => {
    return (
      <div className="DeleteBox">
        <p className="ConfirmText">Confirm deletion</p>
        <Button
          className="ButtonBig Button ButtonWarning"
          onClick={deleteProfile}
        >
          CONFIRM
        </Button>
      </div>
    );
  };

  return (
    <div className="Profile">
      <Button className="ButtonBig Button" onClick={savedArticles}>
        Favourite articles
      </Button>
      <Button className="ButtonBig Button" onClick={savedServices}>
        Favourite services
      </Button>
      <Button
        className="ButtonBig Button ButtonWarning"
        onClick={() => {
          setDeleteBoxDisplayed(!deleteBoxDisplayed);
        }}
      >
        Delete profile
      </Button>
      {deleteBoxDisplayed && <DeleteBox />}
    </div>
  );
};

export default Profile;
