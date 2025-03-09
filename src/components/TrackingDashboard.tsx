"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Animasi biar smooth
import { Card, CardContent } from "@/components/ui/card";
import TrackingDetail from "@/components/TrackingDetail";

interface TrackingData {
  id: number;
  device_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: string;
  over_speeding: boolean;
  status: "active" | "offline"; // ✅ Langsung ambil dari API Django
}

export default function TrackingDashboard() {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://be-tracking-production.up.railway.app/api/tracking/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data dari API:", data); // 🔍 Debugging
        setTrackingData(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tracking data:", err);
        setLoading(false);
      });
  }, []);

  // Hitung statistik perangkat
  const totalDevices = trackingData.length;
  const activeDevices = trackingData.filter((d) => d.status === "active").length;
  const offlineDevices = totalDevices - activeDevices;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tracking Dashboard</h1>

      {/* Statistik Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="bg-blue-500 text-white shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">Total Devices</h2>
              <p className="text-3xl font-bold">{totalDevices}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="bg-green-500 text-white shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">Active Tracking</h2>
              <p className="text-3xl font-bold">{activeDevices}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="bg-red-500 text-white shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">Offline Devices</h2>
              <p className="text-3xl font-bold">{offlineDevices}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* List Tracking Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : trackingData.length > 0 ? (
          trackingData.map((device) => (
            <motion.div 
              key={device.id}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer rounded-lg shadow-md ${
                device.status === "active" ? "bg-green-100 border-green-400" : "bg-gray-300 border-gray-500"
              } border-2 p-4`}
              onClick={() => setSelectedDevice(device)}
            >
              <h2 className="text-lg font-semibold">{device.device_id}</h2>
              <p className="text-sm text-gray-600">Lokasi: {device.latitude}, {device.longitude}</p>
              <p className={`font-semibold ${device.status === "active" ? "text-green-700" : "text-gray-700"}`}>
                Status: {device.status.toUpperCase()}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada perangkat yang tersedia.</p>
        )}
      </div>

      {/* Modal Detail Tracking */}
      {selectedDevice && <TrackingDetail device={selectedDevice} onClose={() => setSelectedDevice(null)} />}
    </div>
  );
}
