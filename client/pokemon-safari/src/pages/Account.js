import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/Account.module.css';
import StyledLink from '../components/StyledLink';
import StyledButton from '../components/StyledButton';
import { useNavigate } from 'react-router-dom';

const CREDENTIALS_DEFAULT = {
    username: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: ''
}

const baseUrl = 'http://localhost:8080/api';

function Account() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState(CREDENTIALS_DEFAULT);
    const [success, setSuccess] = useState(true);
    const [notifs, setNotifs] = useState([]);

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }
    },[]);

    const handleSubmit = (event) => {
        //prevent default and clear current notifs
        event.preventDefault();
        setNotifs([]);

        console.log(credentials);

        //field validations
        for (const prop in credentials) {
            if (credentials[prop] == '') {
                const newNotifs = [...notifs];
                newNotifs.push(`${prop.charAt(0).toUpperCase + prop.slice(1)} can NOT be empty!`);
            }
        }

        if (credentials.newPassword != credentials.newPasswordConfirm) {
            const newNotifs = [...notifs];
            newNotifs.push("New password and confirm new password fields must match!")
        }

        console.log(notifs);

        //if no validation errors for fields then perform request
        if (notifs.length == 0) {
            console.log('wat');
            //put new credentials
            const init = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Authorization')
                },
                body: {
                    currentPassword: credentials.password,
                    newPassword: credentials.newPassword
                }
            }

            fetch(`${baseUrl}/user/update-password/${credentials.user}`, init)
                .then(response => {
                    if (response.status === 200 || response.status === 400) {
                        console.log(response);
                        return ({response: response.json(), status: response.status});
                    } else {
                        return Promise.reject(`Unexpected Status Code: ${response.status}`);
                    }
                })
                .then(data => {
                    console.log(data.response)
                    if (data.response === 200) {
                        setSuccess(true);
                        setNotifs('success');
                    } else if (data.response === 400) {
                        setSuccess(false);
                        setNotifs('failure');
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

    const submitForm = (event) => {
        event.preventDefault();
        document.getElementById('accountForm').submit();
    }

    //=================
    //UTILITY FUNCTIONS
    //=================

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

    return(
        <div className={styles.mainContainer}>
            <div className={styles.background}/>
            <div className={styles.contentContainer}>
                <h1 className={styles.heading}>Account Management</h1>
                <div className={styles.formContainer}>
                    <form className={styles.accountForm} onSubmit={handleSubmit} id='accountForm'>
                        <div className={success ? styles.successNotifContainer : styles.errorNotifContainer} style={{visibility: notifs.size > 0 ? 'visible' : 'hidden'}}>
                            {notifs.map(notif => (
                                <p>{notif}</p>
                            ))}
                        </div>

                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='username'>Username</label>
                            <input className={styles.credentialInput} value={credentials.username} type='text' name='username' onChange={handleChange}></input>
                        </fieldset>
                        
                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='password'>Password</label>
                            <input className={styles.credentialInput} value={credentials.password} type='password' name='password' onChange={handleChange}></input>
                        </fieldset>

                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='newPassword'>New Password</label>
                            <input className={styles.credentialInput} value={credentials.newPassword} type='password' name='newPassword' onChange={handleChange}></input>
                        </fieldset>

                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='newPasswordConfirm'>Confirm New Password</label>
                            <input className={styles.credentialInput} value={credentials.newPasswordConfirm} type='password' name='newPasswordConfirm' onChange={handleChange}></input>
                        </fieldset>

                        <div className={styles.buttonContainer}>
                            <StyledButton type='submit'>Confirm</StyledButton>
                            <StyledLink type='danger' to={'/entrance'}>Cancel</StyledLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Account;