// useServices.jsx
// Backend-ready services hook

import { useEffect, useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⚠️ TEMP: frontend-only base URL
  const baseUrl = "http://localhost:3000";
  // const baseUrl = "https://aysha-dental-care.web.app";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${baseUrl}/fakeData/services.json`
        );

        if (!response.ok) {
          throw new Error("Failed to load services");
        }

        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
  };
};

export default useServices;
