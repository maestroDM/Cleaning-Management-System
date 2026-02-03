import "../styles/Services.css";
import { useEffect, useState } from "react";
import { fetchServices } from "../api/serviceApi";
import { useNavigate } from "react-router-dom";

export default function Services() {
   const [services, setServices] = useState([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   useEffect(() => {
      fetchServices()
         .then(response => {
            setServices(response.data);
            setLoading(false);
         })
         .catch(error => {
            console.error("Error fetching services:", error);
            setLoading(false);
         });
   }, []);

   if (loading) {
      return <div className="loading">Loading services...</div>;
   }

   return (
      <div className="services-container">
         <h1>Our Services</h1>
         <div className="services-grid">
            {services.map(service => (
               <div key={service.id} className="service-card">
                  <h2>{service.name}</h2>
                  <p>{service.description}</p>
                  <strong>KES {service.price}</strong>
                  <button onClick={() => navigate(`/services/${service.id}/book`)}>Book Now</button>
               </div>
               
            ))}
         </div>
      </div>
   );
}