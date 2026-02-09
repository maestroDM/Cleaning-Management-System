import React, {useEffect, useState} from 'react';
import {DashboardLayout} from '../../components/dashboard/DashboardLayout.jsx';
import '../../styles/pages/admin.css'
import { createService, fetchAdminServices, updateService, deleteService } from '../../api/serviceApi.js';
import { fetchServiceCategories } from '../../api/serviceApi.js';

export default function AdminServices() {
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState(({
        category_id: '',
        name:'', 
        description: ''
    }))
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const loadServices = async () => {
        const res = await fetchAdminServices();
        setServices(res.data)
    };

    useEffect(() => {
          fetchAdminServices()
             .then(response => {
                setServices(response.data);
                
             })
             .catch(error => {
                console.error("Error fetching services:", error);
             });
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
        try {
            const res = await fetchServiceCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
        };

        loadCategories();
    }, []);

    useEffect(()=>{
        loadServices();
    },[]);

   

    

    const handleOpenModal = (service = null) =>{
        if (service) {
            setEditingService(service);
            setFormData({
                category_id: service.category_id,
                name: service.name,
                description: service.description,
                
            })
        }else {
            setEditingService(null)
            setFormData({category_id:'', name: '', description: ''});
        }
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingService(null);
        setFormData({category_id:'', name: '', description: ''})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(editingService) {
                await updateService(editingService.id, formData)
            }else{
                await createService(formData);
            }

            await loadServices();
            handleCloseModal();
        }catch(error) {
            console.error("Failed to create service", error)
        }
        
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this service?');
        if (!confirmed) return;
        try{
            console.log("Before delete", services.length)
            await deleteService(id);
            await loadServices();
            Console.log("After delete reload")
        }catch(error){
            console.error("Failed to delete service", error);
        };
        
    }

    return(
        <DashboardLayout portalType="admin">
            <div className="admin-services">
                <div className="page-header">
                    <h1 className="page-title">Service Management</h1>
                    <p className="page-subtitle">Manage your cleaning services catalog</p>
                </div>

                <div className="services-management-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-management-card">
                            <div className="service-card-header">
                                <div className="service-card-icon">{service.icon}</div>
                                <div className="service-card-actions">
                                    <button 
                                        className="service-action-btn"
                                        onClick={() => handleOpenModal(service)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="service-action-btn delete"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <h3 className="service-card-title">{service.name}</h3>
                            <p className="service-card-description">{service.description}</p>
                        </div>
                    ))}

                    {/* Add New Service Card */}
                    <div className="add-service-card" onClick={() => handleOpenModal()}>
                        <div className="add-service-icon">+</div>
                        <span className="add-service-text">Add New Service</span>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-backdrop" onClick={handleCloseModal}>
                        <div className="modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 className="modal-title">
                                    {editingService ? 'Edit Service' : 'Add New Service'}
                                </h2>
                                <button className="modal-close" onClick={handleCloseModal}>×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                        {/* Category */}
                                    <div className="form-group">
                                        <label className="form-label">Service Category</label>
                                        <select
                                            className="form-select"
                                            value={formData.category_id}
                                            onChange={e =>
                                                setFormData({ ...formData, category_id: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">-- Select Category --</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Name */}
                                    <div className="form-group">
                                        <label className="form-label">Service Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={e =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-textarea"
                                            rows="4"
                                            value={formData.description}
                                            onChange={e =>
                                                setFormData({ ...formData, description: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                         {editingService ? 'Save Changes' : 'Add Service'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}