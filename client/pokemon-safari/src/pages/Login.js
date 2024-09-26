import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/Login.module.css';
import StyledButton from '../components/StyledButton';
import { useNavigate } from 'react-router-dom';

const CREDENTIALS_DEFAULT = {
    username: '',
    password: ''
}

const baseUrl = 'http://localhost:8080/api';

function Login() {
    //states
    const [view, setView] = useState('main');
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState(CREDENTIALS_DEFAULT);
    const [toast, setToast] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //redirect if logged in already
        if (document.cookie) {
            if (getCookie('IsAdmin') === 'true') {
                navigate('/admin');
            } else {
                navigate('/entrance');
            }
        }
    },[]);

    //==============
    //EVENT HANDLERS
    //==============

    //form submission event handler
    const handleSubmit = (event) => {
        event.preventDefault();

        if (view === 'login') {
            const init = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                })
            }

            fetch(`${baseUrl}/user/authenticate`, init)
                .then((response) => {
                    if (response.status === 201 || response.status === 200 || response.status === 400) {
                        return response.json();
                    } else if (response.status === 403) {
                        return ['Incorrect username/password.'];
                    } else {
                        return Promise.reject(`Unexpected Status Code: ${response.status}`);
                    }
                })
                .then(data => {
                    console.log(data);

                    if (data.jwt_token) {
                        //create a new cookie with an expiration of half a day
                        const date = new Date();
                        date.setTime(date.getTime() + (12*60*60*1000));

                        let expires = "expires=" + date.toUTCString();
                        document.cookie = `Authorization=Bearer ${data.jwt_token}; ${expires}; path=/`;
                        document.cookie = `IsAdmin=${data.is_admin ? 'true' : 'false'}; ${expires}; path=/`;
                        
                        //navigate to entrance component
                        if (data.is_admin) {
                            navigate('/admin');
                        } else {
                            navigate('/entrance');
                        }
                    } else {
                        setErrors(data);
                    }                    
                })
                .catch(console.log);

        } else if (view === 'register') {
            const init = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                })
            }

            fetch(`${baseUrl}/user/register`, init)
                .then(response => {
                    if (response.status === 201 || response.status === 400) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected Status Code: ${response.status}`);
                    }
                })
                .then(data => {
                    if (data.appUserId) {
                        //swap view THEN set toast to prevent toast from being deleted.
                        updateView('main');
                        setToast('Successfully Registered!');
                    } else {
                        setErrors(data);
                    }
                })
                .catch(console.log);
        }
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

        //clear any toast
        setToast('');

        //check if transition is from main view or from login/register view
        if (view === 'main') {
            //apply zoom out and blur
            background.style.filter = 'blur(4px)';
            background.style.transform = 'scale(1)';

            setView(viewString);
        } else {
            //remove zoom and blur
            background.style = '';

            //clear errors and credentials object
            setCredentials(CREDENTIALS_DEFAULT);
            setErrors([]);
            
            setView(viewString);
        }
    }

    //returns value of cookie with key cookieName
    const getCookie = (cookieName) => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArr = decodedCookie.split(';');
        for(let index = 0; index < cookieArr.length; index++) {
          let curCookie = cookieArr[index];
          while (curCookie.charAt(0) === ' ') {
            curCookie = curCookie.substring(1);
          }
          if (curCookie.indexOf(name) === 0) {
            return curCookie.substring(name.length, curCookie.length);
          }
        }
        return "";
    }

    //render the current view of the login page
    const renderView = () => {
        switch(view) {
            case 'main':
                return (
                    <div className={styles.buttonContainer}>
                        <StyledButton style={{width: '20%'}} type='success' onClick={() => updateView('login')}>Log In</StyledButton>
                        <StyledButton style={{width: '20%'}} onClick={() => updateView('register')}>Create Account</StyledButton>
                    </div>)

            case 'login':
            case 'register':
                return (
                    <div className={styles.credentialsFormContainer}>
                        <form onSubmit={handleSubmit} className={styles.credentialsForm}>
                            {errors.length > 0 && (
                                <div className={styles.errorContainer}>
                                    <p>The Following Errors Occured:</p>
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
                                <input className={styles.credentialInput} type='password' name='password' onChange={handleChange}></input>
                            </fieldset>
                            
                            <div className={styles.formButtonsContainer}>
                                <StyledButton style={{width: '30%', marginBottom: '.5rem'}} type='submit'>{view === 'login' ? 'Log In' : 'Register'}</StyledButton>
                                <StyledButton style={{width: '30%', marginBottom: '.5rem'}} type='danger' onClick={() => updateView('main')}>Cancel</StyledButton>
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
        <div className={styles.toast} style={{visibility: toast ? 'visible' : 'hidden'}}>{toast}</div>
        {renderView()}
    </section>)
}

export default Login;