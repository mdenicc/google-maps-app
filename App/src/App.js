import { useState, useEffect } from "react";

import Loader from "./components/Loader";
import CustomMap from "./components/Map";
import MarkerInput from "./components/MarkerInput";
import MarkersList from "./components/MarkerList";
import Title from "./components/Title";

function App() {
  const [userLocation, setUserLocation] = useState();
  const [locationError, setLocationError] = useState();
  const [loadingLocation, setLoadingLocation] = useState(true);

  const [markers, setMarkers] = useState([]);
  const [markerInput, setMarkerInput] = useState("");

  useEffect(() => {
    const locationListener = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      setLoadingLocation(false);
    };

    const errorListener = (error) => {
      setLocationError(error);
      setLoadingLocation(false);
    };

    navigator.geolocation.watchPosition(locationListener, errorListener);

    return () => {
      navigator.geolocation.clearWatch(locationListener);
    };
  }, []);

  useEffect(() => {
    const markers = localStorage.getItem("markers");
    if (markers) {
      setMarkers(JSON.parse(markers));
    }
  }, []);

  const setMarker = (location) => {
    const newMarkers = [
      ...markers,
      {
        latitude: location.lngLat.lat,
        longitude: location.lngLat.lng,
      },
    ];

    setMarkers(newMarkers);
    localStorage.setItem("markers", JSON.stringify(newMarkers));
  };

  const handleMarkerInput = (e) => {
    setMarkerInput(e.target.value);
  };

  const addMarker = () => {
    if (markerInput.length > 0) {
      const rows = markerInput.split("\n");

      const newMarkers = rows.map((row) => {
        const [lat, lng, color] = row.split(",");

        if (!lat || !lng) {
          return;
        }

        return {
          latitude: lat,
          longitude: lng,
          color: color || "red",
        };
      });

      if (newMarkers.length === 0) {
        return;
      }

      setMarkers([...markers, ...newMarkers]);
    }
  };

  const handleMarkerClick = (marker) => {
    if (marker.target._lngLat) {
      // Find marker and remove it
      const newMarkers = markers.filter((m) => {
        return (
          m.latitude !== marker.target._lngLat.lat ||
          m.longitude !== marker.target._lngLat.lng
        );
      });

      setMarkers(newMarkers);
    }
  };

  const removeMarker = (marker) => {
    const newMarkers = markers.filter((m) => {
      return m.latitude !== marker.latitude || m.longitude !== marker.longitude;
    });

    setMarkers(newMarkers);
    localStorage.setItem("markers", JSON.stringify(newMarkers));
  };

  return (
    <>
      <Title title="Map Marker" />
      {loadingLocation && <Loader />}
      {locationError && !loadingLocation && (
        <p>Error: {locationError.message}</p>
      )}
      {!loadingLocation && userLocation && (
        <>
          <MarkerInput
            markerInput={markerInput}
            handleAddMarker={addMarker}
            handleMarkerInput={handleMarkerInput}
          />
          <CustomMap
            location={userLocation}
            markers={markers}
            onClick={setMarker}
            onMarkerClick={handleMarkerClick}
          />
          <MarkersList markers={markers} removeMarker={removeMarker} />
        </>
      )}
    </>
  );
}

export default App;
