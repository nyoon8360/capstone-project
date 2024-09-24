import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/StyledLink.module.css';
import { useEffect, useState } from 'react';

const DEFAULT_TYPE_STYLES = {
    backgroundColor: 'rgb(2, 156, 194)',
    faceBackgroundColor: 'rgb(0, 204, 255)'
}

function StyledLink({ children, style, to, type, size }) {
    const [typeStyles, setTypeStyles] = useState(DEFAULT_TYPE_STYLES);

    //use different colors for links based on passed type value
    useEffect(() => {
        switch (type) {
            case 'danger':
                setTypeStyles({
                    backgroundColor: 'rgb(150, 3, 3)',
                    faceBackgroundColor: 'rgb(214, 1, 1)'
                })
                break;
            case 'confirm':
                setTypeStyles({
                    backgroundColor: 'rgb(56, 140, 36)',
                    faceBackgroundColor: 'rgb(92, 232, 60)'
                })
                break;
        }
    },[]);

    return (
        <Link className={styles.buttonContainer} style={style} to={to}>
            <button className={styles.button} style={{backgroundColor: typeStyles.backgroundColor}}>
                <span 
                    className={styles.buttonFace} 
                    style={{fontSize: size ? `${size}rem` : '', backgroundColor: typeStyles.faceBackgroundColor}}
                >
                    {children}
                </span>
            </button>
        </Link>
    )
}

export default StyledLink;