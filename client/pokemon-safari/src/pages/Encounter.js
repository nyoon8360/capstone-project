import { useEffect } from 'react';
import styles from '../assets/styles/pages/Encounter.module.css'
import { useNavigate } from 'react-router-dom';

function Encounter() {

    const navigate = useNavigate();

    //play encounter start animation
    useEffect(() => {

    }, []);

    //==============
    //EVENT HANDLERS
    //==============

    const handleThrowBait = () => {

    }

    const handleThrowMud = () => {

    }

    const handleThrowPokeball = () => {

    }

    //end encounter and return to previous area
    const handleRunAway = () => {
        //TODO: end encounter in backend

        //navigate back to previous area
        navigate(-1);
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.background}>

            </div>
            <div className={styles.actionBar}>
                <div className={styles.actionBarTextWindowContainer}>
                    <p className={styles.actionBarTextWindow}>
                        What will trainer do?
                    </p>
                </div>
                <div className={styles.actionBarButtonContainer}>
                    <button className={styles.actionBarButton} onClick={handleThrowBait}>Throw Bait</button>
                    <button className={styles.actionBarButton} onClick={handleThrowMud}>Throw Mud</button>
                    <button className={styles.actionBarButton} onClick={handleThrowPokeball}>Throw Pokeball</button>
                    <button className={styles.actionBarButton} onClick={handleRunAway}>Run Away</button>
                </div>
            </div>
        </div>
    )
}

export default Encounter;