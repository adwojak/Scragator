// @flow
import * as React from "react";
import { useTranslation } from 'react-i18next';
import "./NotFound.scss";

const NotFound = (): React.Node => {
  const { t } = useTranslation();
  return (
    <div className="NotFound">
      <p>Oops!</p>
      <p>{t("NOT_FOUND")}</p>
    </div>
  );
};

export default NotFound;
