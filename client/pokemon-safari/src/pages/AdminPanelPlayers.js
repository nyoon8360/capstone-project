import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/styles/pages/AdminPanelPlayers.module.css"

const baseUrl = 'http://localhost:8080/api';

function AdminPanelPlayers() {
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }

        //fetch all player information and display it on ui
        const init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('Authorization')
            }
        }

        fetch(`${baseUrl}/user`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data);
                setPlayers(data);
            })
            .catch(console.log);
    },[]);

    const handleDeleteAccount = (appUserId, username) => {
        if (window.confirm(`Are you sure you want to delete ${username}'s account?`)) {
            //TODO: finish this 
            const init = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Authorization')
                }
            }

            fetch(`${baseUrl}/user/admin/${appUserId}`, init)
            .then(response => {
                if (response.status !== 201) {
                    const newPlayers = players.filter(user => user.appUserId != appUserId);

                    setPlayers(newPlayers);
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .catch(console.log);
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

    return(
        <section className={styles.mainContainer}>
            <div className={styles.background}>
                <div className={styles.topBg}/>
                <div className={styles.middleBg}/>
                <div className={styles.bgBall}/>
            </div>
            <div className={styles.contentContainer}>
                <h1 className={styles.heading}>Players</h1>

                <Link className={`${styles.button} ${styles.optionButton}`} to={'/admin'}>Back</Link>

                <table className={styles.playerTable}>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.username}>
                                <td>{player.appUserId}</td>
                                <td>{player.username}</td>
                                <td>
                                    <button className={styles.button} style={{marginRight: '2rem'}} onClick={() => handleDeleteAccount(player.appUserId, player.username)}>Delete Account</button>
                                    <Link className={styles.button} to={`/admin/players/form/${player.appUserId}`}>Edit PC Box</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default AdminPanelPlayers;