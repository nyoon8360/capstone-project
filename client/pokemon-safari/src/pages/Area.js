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

        //TODO: fetch area information and display it on ui
    }, []);

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