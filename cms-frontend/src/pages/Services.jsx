
import { useEffect, useState } from "react";
import { fetchServices } from "../api/serviceApi";
import {createQuote} from "../api/quoteApi";
import {createBooking} from "../api/bookingApi";
import { useNavigate } from "react-router-dom";
import '../styles/pages/client.css';
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";

export default function Services() {
   const [services, setServices] = useState([]);
   const [loading, setLoading] = useState(true);
   const [showSuccessModal, setSuccessModal] = useState(false);

   const [selectedService, setSelectedService] = useState(null);
   const [showQuoteModal, setShowQuoteModal] = useState(false);
   const [showBookingModal, setShowBookingModal] = useState(false);
   const [createdQuote, setCreatedQuote] = useState(null);

   const [quoteForm, setQuoteForm] = useState({
      description: ""
   });

   const [bookingForm, setBookingForm] = useState({
      date: "",
      time: "",
      address: "",
      notes: ""
   });

   //fetch services
   useEffect(() => {
      const loadServices = async () => {
         try {
            const response = await fetchServices();
            console.log("Fetched data:", response);
            setServices(response);
         }catch(error) {
            console.error("Error fetching services:", error);
         }finally {
            setLoading(false);
         }
      };
      loadServices();
   }, []);

   //Quote submit
   const handleSubmitQuote = async (e) => {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      try {
         const response = await createQuote({
            service_id: selectedService.id,
            additional_info: quoteForm.additional_info
         });

         setCreatedQuote(response.data);
         setShowQuoteModal(false);
         setSuccessModal(true);
         setQuoteForm({service_id: "", additional_info: ""});

      }catch (error) {
         console.error("Quote creation failed:", error);
      }finally{
         setLoading(false);
      }
   };

   //Booking submit
   const handleSubmitBooking = async (e) => {
      e.preventDefault();
      try {
         await createBooking(createdQuote.id, bookingForm);
         setShowBookingModal(false);
         setBookingForm({
            date: "",
            time: "",
            address: "",
            notes: ""
         });

      }catch(error) {
         console.error("Booking failed:", error);
      }
   };

   return (
      <DashboardLayout portalType="client">
         <div className="client-booking">
            {/* Header*/}
            <div className="page-header">
               <h1 className="page-title">Professional Cleaning services</h1>
               <p className="page-subtitle">
                  Select a service, request a quote and confirm your booking seamlessly
               </p>
            </div>

            {/*SERVICES*/}
            {loading? (
               <div className="loading">Loading services...</div>
            ) : services?.length === 0 ? (
               <div className="loading">No services available at the moment.</div>
            ) : (
               <div>
                  {services?.map((service, index) => (
                     <div
                        key={service.id}
                        className={`service-row ${
                              index % 2 === 0 ? "image-left" : "image-right"
                           }`}
                     >
                        {/*IMAGE*/}
                        <div className="service-image">
                           <img
                              src={service.image}
                              alt={service.name}
                              onError={(e) => (e.target.src = "/placeholder.jpg")}
                           />
                        </div>
                        {/*CONTENT*/}
                        <div className="service-content">
                           <h3 className="service-title">{service.name}</h3>
                           <p className="service-description">
                              {service.description}
                           </p>

                           <div>
                              <button
                                 className="btn btn-secondary"
                                 onClick={() =>{
                                    setSelectedService(service);
                                    setShowQuoteModal(true);
                                 }}
                              >
                                 Request Quote
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/*QUOTE MODAL*/}
            {showQuoteModal && selectedService && (
               <div className="modal-backdrop" onClick={() => setShowQuoteModal(false)}>
                  <div className="modal" onClick={(e) => e.stopPropagation()}>
                     <div className="modal-header">
                        <h2 className="modal-title">
                           Request Quote: {selectedService.name}
                        </h2>
                        <button
                           className="modal-close"
                           onClick={() => setShowQuoteModal(false)}
                        >
                           ×
                        </button>
                     </div>

                     <form onSubmit={handleSubmitQuote}>
                        <div className="modal-body">

                           <div className="service-summary-banner">
                              <div className="service-summary-name">
                                 {selectedService.name}
                              </div>
                              <div className="service-summary-desc">
                                 {selectedService.description}
                              </div>
                           </div>

                           <div className="form-group">
                              <label className="form-label">
                                 Describe Your Cleaning Needs *
                              </label>
                              <textarea
                                 className="form-textarea"
                                 value={quoteForm.additional_info}
                                 onChange={(e) =>
                                    setQuoteForm({ additional_info: e.target.value })
                                 }
                                 required
                                 rows={4}
                              />
                           </div>

                        </div>

                        <div className="modal-footer">
                           <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowQuoteModal(false)}
                           >
                              Cancel
                           </button>
                           <button type="submit" className="btn btn-primary" disabled={loading}>
                              {loading ? "Processing..." : "Submit Request"}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            )}

            {/* ================= BOOKING MODAL ================= */}
            {showBookingModal && createdQuote && (
               <div className="modal-backdrop" onClick={() => setShowBookingModal(false)}>
                  <div className="modal" onClick={(e) => e.stopPropagation()}>
                     <div className="modal-header">
                        <h2 className="modal-title">Confirm Booking</h2>
                        <button
                           className="modal-close"
                           onClick={() => setShowBookingModal(false)}
                        >
                           ×
                        </button>
                     </div>

                     <form onSubmit={handleSubmitBooking}>
                        <div className="modal-body">

                           <div className="form-group">
                              <label className="form-label">Preferred Date *</label>
                              <input
                                 type="date"
                                 className="form-input"
                                 value={bookingForm.date}
                                 onChange={(e) =>
                                    setBookingForm({
                                       ...bookingForm,
                                       date: e.target.value
                                    })
                                 }
                                 required
                              />
                           </div>

                           <div className="form-group">
                              <label className="form-label">Address *</label>
                              <input
                                 type="text"
                                 className="form-input"
                                 value={bookingForm.address}
                                 onChange={(e) =>
                                    setBookingForm({
                                       ...bookingForm,
                                       address: e.target.value
                                    })
                                 }
                                 required
                              />
                           </div>

                           <div className="form-group">
                              <label className="form-label">Additional Notes</label>
                              <textarea
                                 className="form-textarea"
                                 value={bookingForm.notes}
                                 onChange={(e) =>
                                    setBookingForm({
                                       ...bookingForm,
                                       notes: e.target.value
                                    })
                                 }
                                 rows={3}
                              />
                           </div>

                        </div>

                        <div className="modal-footer">
                           <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowBookingModal(false)}
                           >
                              Cancel
                           </button>
                           <button type="submit" className="btn btn-primary">
                              Confirm Booking
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            )}

         </div>
         {showSuccessModal && (
            <div className="success-modal-overlay">
               <div className="success-modal">
                  <div className="success-icon">✅</div>
                  <h2>Quote Submitted Successfully</h2>
                  <p>Your quote request has been received. We will review it shortly.</p>

                  <button
                  className="success-modal-button"
                  onClick={() => setSuccessModal(false)}
                  >
                  Close
                  </button>
               </div>
            </div>
            )}
      </DashboardLayout>
   );
}