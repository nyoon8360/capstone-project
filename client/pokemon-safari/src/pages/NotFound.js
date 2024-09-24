import { Link } from 'react-router-dom';
import styles from '../assets/styles/pages/NotFound.module.css';
import StyledLink from '../components/StyledLink';

function NotFound() {
    return (
        <section className={styles.mainContainer}>
            <div className={styles.background}/>
            <StyledLink to={'/'} style={{position: 'absolute', bottom: '5%', marginLeft: '3rem'}}>Back To Home</StyledLink>
            {/* <Link className={styles.homeButton} to={'/'} type='button'>Back To Home</Link> */}
        </section>
    )
}

export default NotFound;