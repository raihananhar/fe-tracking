export const fetchTrackingData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tracking/");
      if (!response.ok) {
        throw new Error(`Failed to fetch tracking data: ${response.status}`);
      }
      const result = await response.json();
      console.log("Raw API Response:", result); // Debugging
  
      return result; // Jangan ubah format di sini
    } catch (error) {
      console.error("Fetch error:", error);
      return { results: [] }; // Return objek kosong biar aman
    }
  };
  