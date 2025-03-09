"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, Icon } from "leaflet";

interface TrackingData {
  id: number;
  device_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: string;
  over_speeding: boolean;
}

interface MapProps {
  trackingData: TrackingData[];
}

const normalIcon = new Icon({
  iconUrl: "/normal-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const overSpeedIcon = new Icon({
  iconUrl: "/speeding-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ trackingData }: MapProps) {
  const defaultCenter: LatLngExpression = [-6.2, 106.816666];

  const path: LatLngExpression[] = trackingData.map((item) => [item.latitude, item.longitude]);

  return (
    <MapContainer center={defaultCenter} zoom={10} className="h-96 w-full rounded-lg shadow-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {trackingData.map((item) => (
        <Marker
          key={item.id}
          position={[item.latitude, item.longitude] as LatLngExpression}
          icon={item.over_speeding ? overSpeedIcon : normalIcon}
        >
          <Popup>
            <strong>{item.device_id}</strong>
            <br />
            Speed: {item.speed} km/h
            <br />
            Time: {new Date(item.timestamp).toLocaleString()}
          </Popup>
        </Marker>
      ))}
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
}
