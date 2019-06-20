import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  render() {
    return (
      <div
        style={{
          height: "50vh",
          width: "100%",
          borderRadius: "7px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }}
      >
        <p />
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA0B4v4wBVfRvPrYTUJDGHpj9KOvBUaK1Q" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
