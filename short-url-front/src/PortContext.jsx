import React, { createContext, useEffect, useState } from "react";

// Create Context
export const PortContext = createContext(null);

// Create Provider Component
export function PortProvider({ children }) {
  const [port, setPort] = useState(null);

  useEffect(() => {
    fetch("https://short-url-ccp0.onrender.com/port")
      .then((response) => response.json())
      .then((data) => setPort(data.port))
      .catch((error) => console.error("Error fetching port:", error));
  }, []);

  return (
    <PortContext.Provider value={port}>
      {children}
    </PortContext.Provider>
  );
}
