import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/styles/pages/AdminPanelAreas.module.css"

const baseUrl = 'http://localhost:8080/api';

function AdminPanelAreas() {
    const [areas, setAreas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }

        //fetch all area information and display it on ui
        const init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('Authorization')
            }
        }

        fetch(`${baseUrl}/area`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                setAreas(data);
            })
            .catch(console.log);
    },[]);

    const handleDelete = (areaId, areaName) => {
        if (window.confirm(`Are you sure you want to delete area ${areaName}?`)) {
            const init = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Authorization')
                }
            }

            fetch(`${baseUrl}/area/${areaId}`, init)
            .then(response => {
                if (response.status === 204) {
                    const newAreas = areas.filter(area => area.areaId != areaId);

                    setAreas(newAreas);
                } else {
                    console.log(response);
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
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
                <div className={styles.middleBg}/>
                <div className={styles.bgBall}/>
            </div>
            <div className={styles.contentContainer}>
                <h1 className={styles.heading}>Areas</h1>

                <div className={styles.buttonContainer}>
                    <Link className={`${styles.button} ${styles.optionButton}`} to={'/admin/areas/form'} style={{marginRight: '5%'}}>Add Area</Link>
                    <Link className={`${styles.button} ${styles.optionButton}`} to={'/admin'}>Back</Link>
                </div>

                <table className={styles.areaTable}>
                    <thead>
                        <tr>
                            <th>Area Id</th>
                            <th>Area Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map(area => (
                            <tr>
                                <td>{area.areaId}</td>
                                <td>{area.areaName}</td>
                                <td>
                                    <div className={styles.actionContainer}>
                                        <button className={styles.button} onClick={() => handleDelete(area.areaId, area.areaName)}>Delete</button>
                                        <Link className={styles.button} to={`/admin/areas/form/${area.areaId}`}>Edit</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default AdminPanelAreas;