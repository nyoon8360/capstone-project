import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/StyledLink.module.css';

function StyledLink({ children, style, to }) {
    return (
        <Link className={styles.buttonContainer} style={style} to={to}>
            <button className={styles.button}>
                <span className={styles.buttonFace}>
                    {children}
                </span>
            </button>
        </Link>
    )
}

export default StyledLink;