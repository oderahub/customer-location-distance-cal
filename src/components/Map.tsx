import React, { useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./styles/Map.css";

interface MapProps {
  onMapClick: (event: google.maps.MapMouseEvent) => void;
  markers: { lat: number; lng: number }[];
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 6.5244,
  lng: 3.3792, // Lagos coordinates
};

const Map: React.FC<MapProps> = ({ onMapClick, markers }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD8L9B1LPIYqb4n4mWHAb1nlTEdsvo_UGc",
  });

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        onMapClick(event);
      }
    },
    [onMapClick]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      onClick={handleMapClick}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  );
};

export default Map;
