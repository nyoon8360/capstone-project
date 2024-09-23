import { useState } from 'react';
import styles from '../assets/styles/Login.module.css';

function Login() {
    //states
    const [view, setView] = useState('main');
    const [errors, setErrors] = useState();

    //==============
    //EVENT HANDLERS
    //==============

    //form submission event handler
    const handleSubmit = (event) => {
        event.preventDefault();

        //TODO: Implement registration and authorization
    }

    //=================
    //UTILITY FUNCTIONS
    //=================

    //update view state and play screen transition animation
    const updateView = (viewString) => {
        //if view is being updated with its own value then just return and do nothing.
        if (view === viewString) return;

        let background = document.getElementById('backgroundContainer');

        //check if transition is from main view or from login/register view
        if (view === 'main') {
            //apply zoom out and blur
            background.style.filter = 'blur(4px)';
            background.style.transform = 'scale(1)';

            setView(viewString);
        } else {
            //remove zoom and blur
            background.style = '';
            
            setView(viewString);
        }
    }

    //render the current view of the login page
    const renderView = () => {
        switch(view) {
            case 'main':
                return (
                    <div className={styles.buttonContainer}>
                        <button className={styles.optionButton} onClick={() => updateView('login')}>Login</button>
                        <button className={styles.optionButton} onClick={() => updateView('register')}>Create Account</button>
                    </div>)

            case 'login':
            case 'register':
                return (
                    <div className={styles.credentialsFormContainer}>
                        <form onSubmit={handleSubmit} className={styles.credentialsForm}>
                            {errors.length > 0 && (
                                <div className={styles.errorContainer}>
                                    <p>The Following Errors Were Found:</p>
                                    <ul className={styles.errorList}>
                                        {errors.map(error => (
                                            <li key={error}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <fieldset className={styles.fieldSet}>
                                <label className={styles.credentialLabel} htmlFor='username'>Username</label>
                                <input className={styles.credentialInput} type='text' name='username'></input>
                            </fieldset>
                            
                            <fieldset className={styles.fieldSet}>
                                <label className={styles.credentialLabel} htmlFor='password'>Password</label>
                                <input className={styles.credentialInput} type='password' name='password'></input>
                            </fieldset>

                            <div className={styles.formButtonsContainer}>
                                <button className={styles.formButton}>{view === 'login' ? 'Login' : 'Register'}</button>
                                <button className={styles.formButton} onClick={() => updateView('main')}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )

            default:
                return (<></>)
        }
    }

    return(
    <section className={styles.mainContainer}>
        <div id='backgroundContainer' className={styles.backgroundContainer}/>
        
        {renderView()}
    </section>)
}

export default Login;