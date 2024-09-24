import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/Shuttle.module.css';
import StyledLink from '../components/StyledLink';

const TEST_DATA_DELETE_LATER = [
    {areaId: '1', areaName: 'Area 1'},
    {areaId: '2', areaName: 'Area 2'},
    {areaId: '3', areaName: 'Area 3'},
    {areaId: '4', areaName: 'Area 4'},
    {areaId: '5', areaName: 'Area 5'},
];

function Shuttle() {
    const [area, setArea] = useState(TEST_DATA_DELETE_LATER);

    useEffect(() => {
        //TODO: get all areas and update area state with them
    }, []);

    return (
        <section className={styles.mainContainer}>
            <div className={styles.background}/>
            <div className={styles.contentContainer}>
                <div className={styles.itemContainer}>
                    <StyledLink to={'/entrance'} type='danger' style={{width: '100%'}}>Entrance</StyledLink>
                </div>

                {area.map(ar => (
                    <div className={styles.itemContainer}>
                        <StyledLink to={`/area/${ar.areaId}`} style={{width: '100%'}}>{ar.areaName}</StyledLink>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Shuttle;