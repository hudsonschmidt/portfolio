import { useEffect } from "react";

const Tracker = () => {
  useEffect(() => {
    const trackUser = async () => {
      const userId = "guest"; // Replace with actual user ID if available
      const userAgent = navigator.userAgent;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      try {
        const response = await fetch("http://localhost:8000/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, userAgent, screenWidth, screenHeight }),
        });

        if (!response.ok) {
          console.error("Failed to track user:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending tracking data:", error);
      }
    };

    trackUser();
  }, []);

  return null; // This component doesn't render anything
};

export default Tracker;
