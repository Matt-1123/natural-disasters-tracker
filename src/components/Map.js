import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = eventData.map((e, index) => {
    const lat = e.geometry[0].coordinates[1];
    const lng = e.geometry[0].coordinates[0];

    if (e.categories[0].id === "wildfires") {
      console.log(e.categories[0].id);
      console.log(`Lat: ${lat}, Lng: ${lng}`);
      return (
        <LocationMarker
          key={index}
          lat={lat}
          lng={lng}
          onClick={() =>
            setLocationInfo({
              id: e.id,
              title: e.title,
              coordinates: [lat, lng],
            })
          }
        ></LocationMarker>
      );
    }
    return null;
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAwEh3yo8BuBgdK5AJ0kgZQNtKV5kmFGWo" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo}></LocationInfoBox>}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
