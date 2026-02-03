import {useParams} from 'react-router-dom';

export default function BookService() {
    const {serviceId} = useParams();

    return (
        <div style= {{ padding: '20px' }}>
            <h2>Book Service</h2>
            <p>You are booking service with ID: {serviceId}</p>
        </div>
    );
}