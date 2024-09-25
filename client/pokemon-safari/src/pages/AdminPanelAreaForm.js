import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanelAreaForm() {
    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }
    },[]);
}

export default AdminPanelAreaForm;