import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/Shuttle.module.css';
import StyledLink from '../components/StyledLink';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const baseUrl = 'http://localhost:8080/api';

function Shuttle() {
    //TODO: replace default with empty array once area fetching is implemented
    const [area, setArea] = useState([]);
    const [navHidden, setNavHidden] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }

        //get all areas and update area state with them
        const init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('Authorization')
            }
        }

        fetch(`${baseUrl}/area`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(response);
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                setArea(data);
            })
            .catch(console.log);
    }, []);

    //=================
    //UTILITY FUNCTIONS
    //=================

    //returns value of cookie with key cookieName
    const getCookie = (cookieName) => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArr = decodedCookie.split(';');
        for(let index = 0; index < cookieArr.length; index++) {
          let curCookie = cookieArr[index];
          while (curCookie.charAt(0) === ' ') {
            curCookie = curCookie.substring(1);
          }
          if (curCookie.indexOf(name) === 0) {
            return curCookie.substring(name.length, curCookie.length);
          }
        }
        return "";
    }

    return (
        <Layout>
            <section className={styles.mainContainer}>
                <div className={styles.background} onAnimationEnd={() => setNavHidden(false)}/>
                <div className={styles.contentContainer} style={{visibility: navHidden ? 'hidden' : 'visible'}}>
                    <h1 className={styles.heading}>Shuttle</h1>
                    <div className={styles.areaGrid}>
                        <div className={styles.itemContainer}>
                            <StyledLink to={'/entrance'} type='danger' style={{width: '100%'}}>Entrance</StyledLink>
                        </div>
                        {area.map(ar => (
                            <div key={ar.areaId} className={styles.itemContainer}>
                                <StyledLink to={`/area/${ar.areaId}`} style={{width: '100%'}}>{ar.areaName}</StyledLink>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
        
    )
}

export default Shuttle;