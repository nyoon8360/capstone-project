import { useNavigate, useParams } from "react-router-dom";
import styles from "../assets/styles/pages/Area.module.css"
import StyledButton from "../components/StyledButton";
import StyledLink from "../components/StyledLink";
import { useEffect, useState } from "react";

//get all images for areas and map them to their url
const areaImages = require.context('../assets/images/areas', true);
const areaImageList = areaImages.keys().map(image => areaImages(image));

const DEFAULT_AREA = {
    areaName: 'null'
}

const baseUrl = 'http://localhost:8080/api';

function Area() {
    const { areaId } = useParams();
    const [area, setArea] = useState(DEFAULT_AREA);

    const navigate = useNavigate();

    //fetch info about area
    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }

        //fetch area information and display it on ui
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
                setArea(data.find(element => element.areaId == areaId));
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

    return(
        <div className={styles.mainContainer}>
            <div 
                className={styles.background} 
                style={{backgroundImage: `url(${areaImageList[areaId - 1]})`}}
            />
            <div className={styles.contentContainer}>
                <h1 className={styles.heading}>{area.areaName}</h1>
                <div className={styles.buttonContainer}>
                    <StyledLink to={'/encounter'} style={{width: '40%'}} type='success'>Search for Pokemon</StyledLink>
                    <StyledLink to={'/shuttle'} style={{width: '40%'}}>Back to Shuttle</StyledLink>
                </div>
            </div>
        </div>
    )
}

export default Area;