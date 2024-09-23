import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/pages/SafariZoneEntrance.module.css';
import StyledLink from '../components/StyledLink';
import StyledButton from '../components/StyledButton';

function SafariZoneEntrance() {
    const navigate = useNavigate();

    //==============
    //EVENT HANDLERS
    //==============

    //confirm then execute logging out of account
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            //TODO: prompt confirmation then log out of account

            //after logout, navigate to main menu
            navigate('/');
        }
    }

    return(
    <div className={styles.mainContainer}>
        <div className={styles.background}/>
        <div className={styles.contentContainer}>
            <h2 className={styles.heading}>Safari Zone Entrance</h2>
            <div className={styles.buttonContainer}>
                <StyledLink style={{width: '18%'}} to={'/pcbox'}>View PC Box</StyledLink>
                <StyledLink style={{width: '18%'}} to={'/shuttle'}>Board Shuttle</StyledLink>
                <StyledLink style={{width: '18%'}} to={'/myaccount'}>Account Options</StyledLink>
                <StyledButton style={{width: '18%'}} onClick={handleLogout}>Log Out</StyledButton>
            </div>
        </div>
    </div>)
}

export default SafariZoneEntrance;