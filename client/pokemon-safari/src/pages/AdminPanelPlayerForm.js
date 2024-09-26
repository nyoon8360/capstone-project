import { useEffect, useState } from "react";
import { defer, Link, useNavigate, useParams } from "react-router-dom";
import styles from "../assets/styles/pages/AdminPanelPlayerForm.module.css";

const baseUrl = 'http://localhost:8080/api';
const basePokeApiUrl = 'https://pokeapi.co/api/v2';

const DEFAULT_POKEMON = {
    pokemonName: '',
    maxHp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
}

function AdminPanelPlayerForm() {
    const navigate = useNavigate();
    const { appUserId } = useParams();

    const [pokemonList, setPokemonList] = useState([]);
    const [pokemon, setPokemon] = useState(DEFAULT_POKEMON);
    const [addError, setAddError] = useState('');
    const [editError, setEditError] = useState([]);
    const [editSuccess, setEditSuccess] = useState([]);

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

        fetch(`${baseUrl}/pokemon/admin/${appUserId}`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data);
                setPokemonList(data);
            })
            .catch(console.log);
    },[]);

    const handleTableChange = (event, propName, pokemonInstanceId) => {
        

        let index = pokemonList.findIndex(instance => instance.pokemonInstanceId == pokemonInstanceId);
        pokemonList[index][propName] = parseInt(event.target.textContent);
    }

    const handleAddSubmit = (event) => {
        event.preventDefault();

        //verify pokemon exists
        fetch(`${basePokeApiUrl}/pokemon/${pokemon.pokemonName.toLowerCase()}`).then(response => {
            //if pokemon exists, add pokemon to table
            if (response.status === 200) {
                //clear any errors
                setAddError('');

                const newPokemonList = [...pokemonList];

                newPokemonList.push({
                    pokemonName: pokemon.pokemonName.toLowerCase(),
                    maxHp: pokemon.maxHp,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                    specialAttack: pokemon.specialAttack,
                    specialDefense: pokemon.specialDefense,
                    speed: pokemon.speed});

                setPokemonList(newPokemonList);
                setPokemon(DEFAULT_POKEMON);
            } else {
                setAddError(`${pokemon.pokemonName} is not a pokemon!`);
            }
        })
    }

    const handleNewPokemonChange = (event) => {
        const newPokemon = {...pokemon};

        if (event.target.name == 'pokemonName') { 
            newPokemon[event.target.name] = event.target.value;
        } else {
            newPokemon[event.target.name] = parseInt(event.target.value) ? parseInt(event.target.value) : 0;
        }

        console.log(newPokemon);

        setPokemon(newPokemon);
    }

    const handleCancel = () => {
        if (window.confirm("Discard all current changes and return?")) {
            navigate(-1);
        }
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        
        bulkAddUpdate()
            .then(messages => {
                let newErrors = [];
                let newSuccesses = [];
                for (const message of messages) {
                    if (message.success) {
                        newSuccesses.push(message.msg);
                    } else {
                        newErrors.push(message.msg);
                    }
                }
                setEditError(newErrors);
                setEditSuccess(newSuccesses);
            }).then(() => {
                //fetch all pokemon instance information and display it on ui
                const init = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Authorization')
                    }
                }

                fetch(`${baseUrl}/pokemon/admin/${appUserId}`, init)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .then(data => {
                        setPokemonList(data);
                    })
                    .catch(console.log);
            })
    }

    //start bulk put/update calls on data in table
    const bulkAddUpdate = () => {
        const promises = [];

        for (const mon of pokemonList) {
            console.log(mon.pokemonInstanceId);
            if (!mon.pokemonInstanceId) {
                //send POST request

                const init = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Authorization')
                    },
                    body: JSON.stringify({...mon, appUserId: appUserId})
                }

                promises.push(fetch(`${baseUrl}/pokemon`, init)
                    .then(response => {
                        console.log(response);
                        if (response.status === 201 || response.status === 400) {
                            return response.json();
                        } else {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .then(data => {
                        if (data.pokemonInstanceId) {
                            return ({success: true, msg: `${mon.pokemonName} instance was succesfully created!`})
                        } else {
                            return ({success: false, msg: `${mon.pokemonName} instance add ran into the following issues:\n${data}`});
                        }
                    })
                    .catch(console.log));
            } else {
                //send PUT request
                const init = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Authorization')
                    },
                    body: JSON.stringify(mon)
                }

                promises.push(fetch(`${baseUrl}/pokemon/${mon.pokemonInstanceId}`, init)
                    .then(response => {
                        if (response.status === 204) {
                            return;
                        }

                        if (response.status === 400) {
                            return response.json();
                        } else {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .then(data => {
                        console.log(data);
                        if (!data) {
                            return ({success: true, msg: `${mon.pokemonName} instance was succesfully updated!`})
                        } else {
                            return ({success: false, msg: `${mon.pokemonName} instance update ran into the following issues:\n${data}`});
                        }
                    })
                    .catch(console.log));
            }
        }

        return Promise.all(promises);
    }

    const handleDelete = (pokemonInstanceId) => {
        if (window.confirm('Delete this pokemon instance?')) {
            //if encounter is NOT new then it exists in database and we must perform a delete request
            let foundPokemon = pokemonList.find(mon => mon.pokemonInstanceId == pokemonInstanceId);
            if (foundPokemon && foundPokemon.pokemonInstanceId) {
                console.log(foundPokemon.pokemonInstanceId);

                //perform DELETE request
                const init = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Authorization')
                    }
                }
        
                fetch(`${baseUrl}/pokemon/${pokemonInstanceId}`, init)
                    .then(response => {
                        if (response.status !== 204) {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .catch(console.log);
            }

            //update encounters state to reflect deletion
            const newPokemonList = pokemonList.filter(mon => mon.pokemonInstanceId != pokemonInstanceId);
            setPokemonList(newPokemonList);
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
            <h1 className={styles.heading}>{`Edit User ${appUserId}'s PC Box`}</h1>

            <form onSubmit={handleAddSubmit} className={styles.addPokemonForm}>
                <div className={styles.errorContainer} style={{visibility: addError.length > 0 ? 'visible' : 'hidden'}}>
                    {addError}
                </div>
                <fieldset>
                    <label htmlFor="pokemonName">Pokemon Name</label>
                    <input name="pokemonName" type="text" onChange={handleNewPokemonChange} value={pokemon.pokemonName} className={styles.mediumInput}/>
                </fieldset>
                <div className={styles.addPokemonStatFieldContainer}>
                    <fieldset>
                        <label htmlFor="maxHp">Max HP</label>
                        <input name="maxHp" type="text" onChange={handleNewPokemonChange} value={pokemon.maxHp}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="attack">Attack</label>
                        <input name="attack" type="text" onChange={handleNewPokemonChange} value={pokemon.attack}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="defense">Defense</label>
                        <input name="defense" type="text" onChange={handleNewPokemonChange} value={pokemon.defense}/>
                    </fieldset>
                </div>
                <div className={styles.addPokemonStatFieldContainer}>
                    <fieldset>
                        <label htmlFor="specialAttack">Sp. Attack</label>
                        <input name="specialAttack" type="text" onChange={handleNewPokemonChange} value={pokemon.specialAttack}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="specialDefense">Sp. Defense</label>
                        <input name="specialDefense" type="text" onChange={handleNewPokemonChange} value={pokemon.specialDefense}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="speed">Speed</label>
                        <input name="speed" type="text" onChange={handleNewPokemonChange} value={pokemon.speed}/>
                    </fieldset>
                </div>
                <button className={`${styles.button} ${styles.optionButton}`} style={{width: '14rem'}} type="submit">Add Pokemon</button>
            </form>
            
            <form className={styles.boxForm} onSubmit={handleEditSubmit}>
                <table className={styles.instanceTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Max Hp</th>
                            <th>Atk</th>
                            <th>Def</th>
                            <th>Sp. Atk</th>
                            <th>Sp. Def</th>
                            <th>Speed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonList.map(mon => (
                            <tr>
                                <td>{mon.pokemonName}</td>
                                <td contentEditable onInput={(event) => handleTableChange(event, "maxHp", mon.pokemonInstanceId)}>{mon.maxHp}</td>
                                <td contentEditable onInput={(event) => handleTableChange(event, "attack", mon.pokemonInstanceId)}>{mon.attack}</td>
                                <td contentEditable onInput={(event) => handleTableChange(event, "defense", mon.pokemonInstanceId)}>{mon.defense}</td>
                                <td contentEditable onInput={(event) => handleTableChange(event, "specialAttack", mon.pokemonInstanceId)}>{mon.specialAttack}</td>
                                <td contentEditable onInput={(event) => handleTableChange(event, "specialDefense", mon.pokemonInstanceId)}>{mon.specialDefense}</td>
                                <td contentEditable onInput={(event) => handleTableChange(event, "speed", mon.pokemonInstanceId)}>{mon.speed}</td>
                                <td>
                                    <button type="button" className={styles.button} onClick={() => handleDelete(mon.pokemonInstanceId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.errorContainer} style={{visibility: editError.length > 0 ? 'visible' : 'hidden'}}>
                    {editError.map(error => (
                        <p>{error}</p>
                    ))}
                </div>
                <div className={styles.successContainer} style={{visibility: editSuccess.length > 0 ? 'visible' : 'hidden'}}>
                    {editSuccess.map(success => (
                        <p>{success}</p>
                    ))}
                </div>

                <div className={styles.buttonContainer}>
                    <button className={`${styles.button} ${styles.optionButton}`} type="submit" style={{marginRight: '2rem'}}>Submit</button>
                    <button className={`${styles.button} ${styles.optionButton}`} onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    </section>)
}

export default AdminPanelPlayerForm;