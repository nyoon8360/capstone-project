import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanelPlayers() {
    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }
    },[]);
}

export default AdminPanelPlayers;