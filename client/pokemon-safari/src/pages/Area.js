import { useParams } from "react-router-dom";
import styles from "../assets/styles/pages/Area.module.css"
import StyledButton from "../components/StyledButton";
import StyledLink from "../components/StyledLink";

//get all images for areas and map them to their url
const areaImages = require.context('../assets/images/areas', true);
const areaImageList = areaImages.keys().map(image => areaImages(image));

function Area() {
    const { areaId } = useParams();

    return(
        <div className={styles.mainContainer}>
            <div 
                className={styles.background} 
                style={{backgroundImage: `url(${areaImageList[areaId - 1]})`}}
            />

            <div className={styles.buttonContainer}>
                <StyledButton style={{width: '40%'}} type='success'>Search for Pokemon</StyledButton>
                <StyledLink to={'/shuttle'} style={{width: '40%'}} type='danger'>Back to Shuttle</StyledLink>
            </div>
        </div>
    )
}

export default Area;