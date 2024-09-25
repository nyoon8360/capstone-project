import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanelAreas() {
    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }
    },[]);
}

export default AdminPanelAreas;