// @flow
import * as React from "react";
import { connect } from "react-redux";
import { axiosGet } from "../api/apiBase";
import { SERVICES } from "../api/urls";
import Service from "../libs/components/Service";
import Placeholder from "../static/images/placeholder.png";
import "./ServicesList.scss";

type StateType = $ReadOnly<{|
  isLogged: boolean,
  favouriteServices: Array
|}>;

const mapStateToProps = (state: StateType): Object => {
  return {
    isLogged: state.isLogged,
    favouriteServices: state.favouriteServices
  };
};

class ServicesList extends React.Component {
  constructor(props: Object) {
    super(props);
    this.pageFetch();
  }

  state = {
    services: Array.from({})
  };

  parseService = (data: Object): Array => {
    return data.map((service: Object): Object => {
      return {
        serviceName: service.name,
        serviceImg: service.img || Placeholder,
        isFavourite: this.props.favouriteServices.includes(service.name)
      };
    });
  };

  pageFetch = () => {
    const { url = SERVICES, method = "POST" } = this.props.location.state || {};
    axiosGet(url)
      .then((response: Object) => {
        this.setState({
          services: this.parseService(response.data)
        });
      })
      .catch((error: Error) => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  render(): React.Node {
    return (
      <div className="ServicesList">
        {this.state.services.map((service: Object): React.Node => (
          <Service key={service.id} service={service} />
        ))}
      </div>
    );
  }
}

export default connect<_, _, _, _, _, _>(mapStateToProps)(ServicesList);
