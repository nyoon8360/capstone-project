import { useEffect, useState } from 'react';
import styles from '../assets/styles/components/StyledButton.module.css';

const DEFAULT_TYPE_STYLES = {
        backgroundColor: 'rgb(2, 156, 194)',
        faceBackgroundColor: 'rgb(0, 204, 255)'
}

function StyledButton({ children, style, onClick, size, type, disabled = false }) {
    const [typeStyles, setTypeStyles] = useState(DEFAULT_TYPE_STYLES);

    //use different colors for buttons based on passed type value
    useEffect(() => {
        switch (type) {
            case 'danger':
                setTypeStyles({
                    backgroundColor: 'rgb(150, 3, 3)',
                    faceBackgroundColor: 'rgb(214, 1, 1)'
                })
                break;
            case 'submit':
            case 'success':
                setTypeStyles({
                    backgroundColor: 'rgb(56, 140, 36)',
                    faceBackgroundColor: 'rgb(92, 232, 60)'
                })
                break;
        }

        //if disabled is true then overwrite colors
        if (disabled) {
            setTypeStyles({
                backgroundColor: 'rgb(79, 79, 79)',
                faceBackgroundColor: 'rgb(140, 140, 140)'
            })
        }
    },[disabled]);

    return (
        <div className={styles.buttonContainer} style={{...style, pointerEvents: disabled ? 'none' : 'auto'}} onClick={onClick}>
            <button className={styles.button} style={{backgroundColor: typeStyles.backgroundColor}} type={type == 'submit' ? 'submit' : 'button'}>
                <span 
                    className={styles.buttonFace} 
                    style={{fontSize: size ? `${size}rem` : '', backgroundColor: typeStyles.faceBackgroundColor}}
                >
                    {children}
                </span>
            </button>
        </div>
    )
}

export default StyledButton;