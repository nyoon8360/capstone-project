import { useState } from 'react';
import styles from '../assets/styles/pages/Login.module.css';
import StyledButton from '../components/StyledButton';
import { useNavigate } from 'react-router-dom';

const CREDENTIALS_DEFAULT = {
    username: '',
    password: ''
}

function Login() {
    //states
    const [view, setView] = useState('main');
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState(CREDENTIALS_DEFAULT);
    const navigate = useNavigate();

    //==============
    //EVENT HANDLERS
    //==============

    //form submission event handler
    const handleSubmit = (event) => {
        event.preventDefault();

        //TODO: Implement registration and authorization
        //TODO: Set errors if any occur

        //TODO: testing purposes delete this
        navigate('/entrance');
    }
    
    //update fields of credentials state when input fields are changed
    const handleChange = (event) => {
        const newCredentials = {...credentials};

        newCredentials[event.target.name] = event.target.value;

        setCredentials(newCredentials);
    }

    //=================
    //UTILITY FUNCTIONS
    //=================

    //update view state and play screen transition animation
    const updateView = (viewString) => {
        //if view is being updated with its own value then just return and do nothing.
        if (view === viewString) return;

        let background = document.getElementById('background');

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
                        <StyledButton style={{width: '20%'}} onClick={() => updateView('login')}>Log In</StyledButton>
                        <StyledButton style={{width: '20%'}} onClick={() => updateView('register')}>Create Account</StyledButton>
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
                                <input className={styles.credentialInput} type='text' name='username' onChange={handleChange}></input>
                            </fieldset>
                            
                            <fieldset className={styles.fieldSet}>
                                <label className={styles.credentialLabel} htmlFor='password'>Password</label>
                                <input className={styles.credentialInput} type='password' name='password'></input>
                            </fieldset>

                            <div className={styles.formButtonsContainer}>
                                <StyledButton style={{width: '30%'}}>{view === 'login' ? 'Log In' : 'Register'}</StyledButton>
                                <StyledButton style={{width: '30%'}} onClick={() => updateView('main')}>Cancel</StyledButton>
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
        <div id='background' className={styles.background}/>
        
        {renderView()}
    </section>)
}

export default Login;