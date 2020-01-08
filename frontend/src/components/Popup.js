// @flow
import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { showPopup } from "../states/actions";
import "./Popup.scss";

const Popup = (props: Object): none => {
  const dispatch = useDispatch();
  const history = useHistory();
  const closePopup = (event: Event) => {
    event.preventDefault();
    dispatch(
      showPopup({
        showPopup: false
      })
    );
  };

  return (
    <div className="Popup">
      <div className="Box">
        <h2>You need to be logged in to save articles!</h2>
        <button className="Close" onClick={closePopup}>
          &times;
        </button>
        <div className="Content">
          <button
            className="Navigate"
            onClick={(event: Event) => {
              closePopup(event);
              history.replace("/register");
            }}
          >
            Register
          </button>
          <button
            className="Navigate"
            onClick={(event: Event) => {
              closePopup(event);
              history.replace("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
