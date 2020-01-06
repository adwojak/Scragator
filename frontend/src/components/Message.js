import * as React from "react";
import { useLocation } from "react-router-dom";
import Button from "../libs/components/Button";
import "./Message.scss";

const Error = props => {
  return (
    <React.Fragment>
      <p className="TitleNormal Error">Error</p>
      <Button
        className="ButtonBig ErrorButton"
        onClick={() => {
          props.history.goBack();
        }}
      >
        Back to previous location
      </Button>
    </React.Fragment>
  );
};

const UserCreated = props => {
  return (
    <React.Fragment>
      <p className="TitleNormal">User has been created!</p>
      <Button
        onClick={() => {
          props.history.push("/login");
        }}
      >
        Proceed to login
      </Button>
    </React.Fragment>
  );
};

const UserDeleted = props => {
  return (
    <React.Fragment>
      <p className="TitleNormal">User has been deleted!</p>
      <Button
        onClick={() => {
          props.history.push("/register");
        }}
      >
        Proceed to register
      </Button>
    </React.Fragment>
  );
};

const Message = props => {
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
