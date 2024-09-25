import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/pages/AdminPanelHome.module.css"
import StyledButton from "../components/StyledButton";
import StyledLink from "../components/StyledLink";

function AdminPanelHome() {
    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }
    },[]);

    //confirm then execute logging out of account
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            document.cookie = 'Authorization=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/';
            document.cookie = 'IsAdmin=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/';
            navigate('/');
        }
    }

    return (
        <section className={styles.mainContainer}>
            <div className={styles.background}>
                <div className={styles.topBg}></div>
                <div className={styles.middleBg}></div>
                <div className={styles.bottomBg}></div>
                <div className={styles.bgBall}></div>
            </div>
            <div className={styles.contentContainer}>
                <h1 className={styles.heading}>Administrator Panel</h1>

                <div className={styles.buttonContainer}>
                    <StyledLink to={'/admin/players'} style={{width: '18%'}}>Players</StyledLink>
                    <StyledLink to={'/admin/areas'} style={{width: '18%'}}>Areas</StyledLink>
                    <StyledButton onClick={handleLogout} style={{width: '18%'}} type='danger'>Log Out</StyledButton>
                </div>
            </div>
        </section>
    )
}

export default AdminPanelHome;