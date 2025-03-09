"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F"];

export default function StatsDashboard() {
  const [stats, setStats] = useState({ totalDevices: 0, movementData: [], statusData: [] });

  useEffect(() => {
    // Simulasi Fetch API Tracking Data (nanti diganti dengan API beneran)
    const fetchData = async () => {
      const response = await fetch("/api/stats"); // Sesuaikan dengan endpoint API
      const data = await response.json();
      setStats(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {/* Card Total Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Total Perangkat Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalDevices}</p>
        </CardContent>
      </Card>

      {/* Chart Pergerakan Perangkat */}
      <Card>
        <CardHeader>
          <CardTitle>Pergerakan Perangkat</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.movementData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart Status Perangkat */}
      <Card>
        <CardHeader>
          <CardTitle>Status Perangkat</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stats.statusData} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
                {stats.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
