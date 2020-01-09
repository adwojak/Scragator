// @flow
import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { showPopup } from "../states/actions";
import "./Popup.scss";

const Popup = (props: Object): none => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
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
        <h2>{t("NEED_LOGIN")}</h2>
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
            {t("REGISTER_TITLECASE")}
          </button>
          <button
            className="Navigate"
            onClick={(event: Event) => {
              closePopup(event);
              history.replace("/login");
            }}
          >
            {t("LOGIN_TITLECASE")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
