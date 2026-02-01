import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}