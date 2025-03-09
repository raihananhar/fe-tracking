"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { TrackingData } from "@/types";
import { motion } from "framer-motion";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface TrackingDetailProps {
  device: TrackingData;
  onClose: () => void;
}

export default function TrackingDetail({ device, onClose }: TrackingDetailProps) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return null;

  const customIcon = new L.Icon({
    iconUrl: "leaflet/marker-icon.png",
    shadowUrl: "leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-0">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 max-w-lg relative"
      >
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl" 
          onClick={onClose}
        >
          ✖
        </button>
        
        <h2 className="text-xl font-bold mb-2 text-center">{device.device_id}</h2>
        <p className="text-sm text-gray-600 text-center">Lokasi: {device.latitude}, {device.longitude}</p>

        <div className="mt-4 h-60 sm:h-72 rounded-lg overflow-hidden border border-gray-300">
          <MapContainer 
            center={[device.latitude, device.longitude]} 
            zoom={13} 
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[device.latitude, device.longitude]} icon={customIcon}>
              <Popup>{device.device_id} - {device.latitude}, {device.longitude}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
}
