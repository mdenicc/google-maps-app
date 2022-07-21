import Map, { Marker } from "react-map-gl";

export default function CustomMap({
  location,
  markers,
  onClick,
  onMarkerClick,
}) {
  return (
    <Map
      initialViewState={{
        longitude: location.longitude,
        latitude: location.latitude,
        zoom: 14,
      }}
      style={{
        width: 700,
        height: 500,
        borderRadius: "10px",
        margin: "0 auto",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onClick={onClick}
      clickTolerance={1}
    >
      {markers.map((marker, index) => (
        <Marker
          key={`${marker.latitude}-${marker.longitude}-${index}`}
          latitude={marker.latitude}
          longitude={marker.longitude}
          clickTolerance={50}
          onClick={onMarkerClick}
          color={marker.color}
        />
      ))}
    </Map>
  );
}
