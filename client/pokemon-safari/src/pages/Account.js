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

function Account() {
    const [credentials, setCredentials] = useState(CREDENTIALS_DEFAULT);
    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    //update fields of credentials state when input fields are changed
    const handleChange = (event) => {
        const newCredentials = {...credentials};

        newCredentials[event.target.name] = event.target.value;

        setCredentials(newCredentials);
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.background}/>
            <div className={styles.contentContainer}>
                <h1 className={styles.heading}>Account Management</h1>
                <div className={styles.formContainer}>
                    <form className={styles.accountForm} onSubmit={handleSubmit}>
                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='username'>Username</label>
                            <input className={styles.credentialInput} type='text' name='username' onChange={handleChange}></input>
                        </fieldset>
                        
                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='password'>Password</label>
                            <input className={styles.credentialInput} type='password' name='password' onChange={handleChange}></input>
                        </fieldset>

                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='newPassword'>New Password</label>
                            <input className={styles.credentialInput} type='password' name='newPassword' onChange={handleChange}></input>
                        </fieldset>

                        <fieldset className={styles.fieldSet}>
                            <label className={styles.credentialLabel} htmlFor='newPasswordConfirm'>Confirm New Password</label>
                            <input className={styles.credentialInput} type='password' name='newPasswordConfirm' onChange={handleChange}></input>
                        </fieldset>

                        <div className={styles.buttonContainer}>
                            <StyledButton type='success'>Confirm</StyledButton>
                            <StyledLink type='danger' to={'/entrance'}>Cancel</StyledLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Account;