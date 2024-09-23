import styles from '../assets/styles/components/StyledButton.module.css';

function StyledButton({ children, style, onClick }) {
    return (
        <div className={styles.buttonContainer} style={style} onClick={onClick}>
            <button className={styles.button}>
                <span className={styles.buttonFace}>
                    {children}
                </span>
            </button>
        </div>
    )
}

export default StyledButton;