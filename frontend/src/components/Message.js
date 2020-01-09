// @flow
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from "../libs/components/Button";
import "./Message.scss";

const Error = (props: Object): React.Node => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <p className="TitleNormal Error">{t("ERROR")}</p>
      <Button
        className="ButtonBig ErrorButton"
        onClick={() => {
          props.history.goBack();
        }}
      >
        {t("BACK_PREVIOUS")}
      </Button>
    </React.Fragment>
  );
};

const UserCreated = (props: Object): React.Node => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <p className="TitleNormal">{t("USER_CREATED")}</p>
      <Button
        onClick={() => {
          props.history.push("/login");
        }}
      >
        {t("GOTO_LOGIN")}
      </Button>
    </React.Fragment>
  );
};

const UserDeleted = (props: Object): React.Node => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <p className="TitleNormal">{t("USER_DELETED")}</p>
      <Button
        onClick={() => {
          props.history.push("/register");
        }}
      >
        {t("GOTO_REGISTER")}
      </Button>
    </React.Fragment>
  );
};

const Message = (props: Object): React.Node => {
  const { isCreated, isDeleted, serverError } = useLocation().state;
  return (
    <div className="Message">
      {isCreated
        ? UserCreated(props)
        : isDeleted
        ? UserDeleted(props)
        : serverError
        ? Error(props)
        : null}
    </div>
  );
};

export default Message;
