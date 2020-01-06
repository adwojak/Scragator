// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import servicesAPI from "../api/services";

const ServicesList = () => {
  const [services, setServices] = React.useState([]);
  const isLogged = useSelector((state: Object): Object => state.isLogged);
  const history = useHistory();
  const favouriteServices = useSelector(
    (state: Object): Object => state.favouriteServices
  );

  const parseService = data => {
    return data.map(service => { return {
      id: 1,
      serviceName: data,
      serviceImg: "",
      isFavourite: favouriteServices.includes(1)
    }});

  const getServices = () => {
    servicesAPI
      .GET()
      .then(response => {
        setServices(parseService(response.data));
      })
      .catch(error => {
        history.push("/message", {
          serverError: true
        });
      });
  };

  React.useEffect(() => {
    getServices();
  });
  debugger;

  return (
    <div>
      {services.map(service => (
        <p>{service}</p>
      ))}
    </div>
  );
};

export default ServicesList;
