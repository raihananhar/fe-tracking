"use client";

import Layout from "@/components/Layout";
import TrackingDashboard from "@/components/TrackingDashboard";

export default function Home() {
  return (
    <Layout>
      <div className="p-6">
        <TrackingDashboard />
      </div>
    </Layout>
  );
}
