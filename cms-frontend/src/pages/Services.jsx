
import { useEffect, useState } from "react";
import { fetchServices } from "../api/serviceApi";
import { useNavigate } from "react-router-dom";
import '../styles/pages/client.css';
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";

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
      /*<div className="services-container">
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
      </div>*/

      <DashboardLayout portalType="client">
         <div className="client-booking">
            <div className="page-header">
               <h1 className="page-title">Our Cleaning Services</h1>
               <p className="page subtitle">Explore our services and book at your convenience</p>
            </div>

            <div className="page-header">
               {services.map((service, index) =>(
                  <div
                     key={service.id}
                     className= {`service-row ${index % 2 == 0 ? `image-left` : `image-right`}`}
                  >
                     <div className="service-image">
                        <img src={service.image} alt={service.name}/>
                     </div>
                     
                     <div className="service-content">
                        <h3 className="service-title">{service.name}</h3>
                        <p className="service-description">{service.description}</p>

                        <button
                           className="btn btn-secondary"
                           onClick={() => setExploreService(service)}
                        >
                           Explore
                        </button>

                     </div>
                  </div> 
               ))}
            </div>
         </div>
      </DashboardLayout>
   );
}