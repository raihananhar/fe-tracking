"use client"; // ⬅️ Wajib di App Router kalau pakai useEffect atau event handler

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Lazy load react-leaflet
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface TrackingData {
  id: number;
  device_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: string;
  over_speeding: boolean;
}

export default function TrackingDetailPage() {
  const { id } = useParams(); // Ambil ID dari URL
  const [device, setDevice] = useState<TrackingData | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/tracking/${id}/`) // Pastikan API benar
      .then(res => res.json())
      .then(data => setDevice(data))
      .catch(err => console.error("Gagal fetch data:", err));
  }, [id]);

  if (!device) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">{device.device_id}</h1>
      <p className="text-gray-600">Lokasi: {device.latitude}, {device.longitude}</p>
      <p className="text-gray-600">Kecepatan: {device.speed} km/h</p>

      {/* Map */}
      <div className="w-full h-96 mt-4">
        <MapContainer center={[device.latitude, device.longitude]} zoom={13} className="h-full w-full rounded-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[device.latitude, device.longitude]}>
            <Popup>{device.device_id} - {device.latitude}, {device.longitude}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
