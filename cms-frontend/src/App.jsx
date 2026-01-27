import { useEffect } from "react";
import api from "./services/api";

function App() {

  useEffect(() => {
    api.get("/health")
      .then(response => {
        console.log("Backend response:", response.data);
      })
      .catch(error => {
        console.error("API error:", error);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Frontend–Backend Connectivity Test</h1>
      <p>Open the browser console to see the API response.</p>
    </div>
  );
}

export default App;
