import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/pages/SafariZoneEntrance.module.css';
import StyledLink from '../components/StyledLink';
import StyledButton from '../components/StyledButton';
import { useState } from 'react';

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
    <section className={styles.mainContainer}>
        <div className={styles.background}/>
        <div className={styles.contentContainer}>
            <h1 className={styles.heading}>Safari Zone Entrance</h1>
            <div className={styles.buttonContainer}>
                <StyledLink style={{width: '18%'}} to={'/pcbox'}>View PC Box</StyledLink>
                <StyledLink style={{width: '18%'}} to={'/shuttle'}>Board Shuttle</StyledLink>
                <StyledLink style={{width: '18%'}} to={'/myaccount'}>Account</StyledLink>
                <StyledButton style={{width: '18%'}} type='danger' onClick={handleLogout}>Log Out</StyledButton>
            </div>
        </div>
    </section>)
}

export default SafariZoneEntrance;