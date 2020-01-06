// @flow
import * as React from "react";
import { connect } from "react-redux";
import { axiosGet } from "../api/apiBase";
import { SERVICES } from "../api/urls";
import Service from "./Service";

const mapStateToProps = state => {
  return {
    isLogged: state.isLogged,
    favouriteServices: state.favouriteServices
  };
};

class ServicesList extends React.Component {
  constructor(props) {
    super(props);
    this.pageFetch();
  }

  state = {
    services: Array.from({})
  };

  parseService = data => {
    return data.map(service => {
      return {
        serviceName: service,
        serviceImg: "",
        isFavourite: this.props.favouriteServices.includes(service)
      };
    });
  };

  pageFetch = () => {
    const { url = SERVICES, method = "POST" } = this.props.location.state || {};
    axiosGet(url)
      .then(response => {
        this.setState({
          services: this.parseService(response.data)
        });
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.services.map(service => (
          <Service key={service.id} service={service} />
        ))}
      </div>
    );
  }
}

export default connect<_, _, _, _, _, _>(mapStateToProps)(ServicesList);
