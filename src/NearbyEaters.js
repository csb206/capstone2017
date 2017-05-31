import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from "lodash";

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));



class NearbyEatersPage extends React.Component {

  render() {

    return (
      <div>
        <h2 className="text-center">Nearby Eaters</h2>
        <SimpleMapExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    );
  }
}

export default NearbyEatersPage;