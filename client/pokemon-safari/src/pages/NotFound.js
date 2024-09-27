import { Link } from 'react-router-dom';
import styles from '../assets/styles/pages/NotFound.module.css';
import StyledLink from '../components/StyledLink';
import Layout from '../components/Layout';

function NotFound() {
    return (
        <Layout>
            <section className={styles.mainContainer}>
                <div className={styles.background}/>
                <StyledLink to={'/'} type='danger' style={{position: 'absolute', bottom: '5%', marginLeft: '3rem'}}>Back To Home</StyledLink>
            </section>
        </Layout>
        
    )
}

export default NotFound;