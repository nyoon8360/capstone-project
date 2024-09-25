import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../assets/styles/pages/AdminPanelAreaForm.module.css";

const DEFAULT_AREA = {
    areaName: ''
}

const DEFAULT_POKEMON = {
    pokemonName: '',
    encounterRate: 0,
    fleeRate: 0
}

const baseUrl = 'http://localhost:8080/api';
const basePokeApiUrl = 'https://pokeapi.co/api/v2';

function AdminPanelAreaForm() {
    const { areaId } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(DEFAULT_POKEMON);
    const [area, setArea] = useState(DEFAULT_AREA);
    const [encounters, setEncounters] = useState([]);
    const [addError, setAddError] = useState("");
    const [editError, setEditError] = useState([]);
    const [editSuccess, setEditSuccess] = useState([]);

    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }

        //TODO: get area by id

        //fetch all area encounter information
        const init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('Authorization')
            }
        }

        fetch(`${baseUrl}/areaEncounter/${areaId}`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data);
                setEncounters(data);
            })
            .catch(console.log);
    },[]);

    const handleAddSubmit = (event) => {
        event.preventDefault();
        //verify pokemon exists with pokeapi

        fetch(`${basePokeApiUrl}/pokemon/${pokemon.pokemonName.toLowerCase()}`).then(response => {
            //if pokemon exists, add pokemon to table
            if (response.status === 200) {
                //clear any errors
                setAddError('');

                const newEncounters = [...encounters];

                newEncounters.push({
                    pokemonName: pokemon.pokemonName.toLowerCase(),
                    encounterRate: pokemon.encounterRate,
                    fleeRate: pokemon.fleeRate, 
                    areaId: areaId, 
                    isNew: true});

                setEncounters(newEncounters);
                setPokemon(DEFAULT_POKEMON);
            } else {
                setAddError(`${pokemon.pokemonName} is not a pokemon!`);
            }
        })
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
            })
    }

    const handleDeleteEncounter = (areaId, pokemonName) => {
        if (window.confirm('Delete this pokemon encounter?')) {
            //remove encounter from encounters state

            //TODO: perform delete if isNew NOT true
            const newEncounters = encounters.filter(encounter => encounter.areaId != areaId || encounter.pokemonName != pokemonName);

            setEncounters(newEncounters);
        }   
    }

    const handleEncounterRateChange = (event, areaId, pokemonName) => {
        console.log(`${areaId} ${pokemonName} ${event.target.textContent}`);

        //no need to rerender so dont need to use setstate
        let index = encounters.findIndex(encounter => encounter.areaId == areaId && encounter.pokemonName == pokemonName);
        encounters[index].encounterRate = parseInt(event.target.textContent);
    }

    const handleNewPokemonChange = (event) => {
        const newPokemon = {...pokemon};

        if (event.target.name == 'pokemonName') { 
            newPokemon[event.target.name] = event.target.value;
        } else {
            newPokemon[event.target.name] = parseInt(event.target.value);
        }

        setPokemon(newPokemon);
    }

    const handleCancelForm = () => {
        if (window.confirm("Discard all current changes and return?")) {
            navigate('/admin/areas');
        }
    }

    //start bulk put/update calls on data in table
    const bulkAddUpdate = () => {
        const promises = [];

        for (const encounter of encounters) {
            if (encounter.isNew) {
                //send POST request
                const init = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Authorization')
                    },
                    body: JSON.stringify(encounter)
                }

                promises.push(fetch(`${baseUrl}/areaEncounter`, init)
                    .then(response => {
                        console.log(response);
                        if (response.status === 201 || response.status === 400) {
                            return response.json();
                        } else {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .then(data => {
                        console.log(data);
                        if (data.areaId) {
                            return ({success: true, msg: `${encounter.pokemonName} encounter was succesfully created!`})
                        } else {
                            return ({success: false, msg: `${encounter.pokemonName} encounter add ran into the following issues:\n${data}`});
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
                    body: JSON.stringify(encounter)
                }

                promises.push(fetch(`${baseUrl}/areaEncounter/${encounter.areaId}/${encounter.pokemonName}`, init)
                    .then(response => {
                        console.log(response);
                        if (response.status === 201 || response.status === 400) {
                            return response.json();
                        } else {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .then(data => {
                        console.log(data);
                        if (data.areaId) {
                            return ({success: true, msg: `${encounter.pokemonName} encounter was succesfully updated!`})
                        } else {
                            return ({success: false, msg: `${encounter.pokemonName} encounter update ran into the following issues:\n${data}`});
                        }
                    })
                    .catch(console.log));
            }
        }

        return Promise.all(promises);
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
                <h1 className={styles.heading}>{areaId ? "Edit Area" : "Add Area"}</h1>

                <div className={styles.errorContainer}></div>

                <form onSubmit={handleAddSubmit} style={{marginBottom: '4rem'}}>
                    <div className={styles.pokemonFormFieldContainer}>
                        <fieldset className={styles.fieldSet} style={{marginRight: '2rem'}}>
                            <label className={styles.fieldLabel} htmlFor="pokemonName">Pokemon Name</label>
                            <input className={styles.fieldInput} type="text" name="pokemonName" onChange={handleNewPokemonChange} value={pokemon.pokemonName}/>
                        </fieldset>
                        <fieldset className={styles.fieldSet} style={{marginRight: '2rem'}}>
                            <label className={styles.fieldLabel} htmlFor="encounterRate">Encounter Rate</label>
                            <input className={styles.fieldInput} type="text" name="encounterRate" onChange={handleNewPokemonChange} value={pokemon.encounterRate}/>
                        </fieldset>
                        <fieldset className={styles.fieldSet}>
                            <label className={styles.fieldLabel} htmlFor="fleeRate">Flee Rate</label>
                            <input className={styles.fieldInput} type="text" name="fleeRate" onChange={handleNewPokemonChange} value={pokemon.fleeRate}/>
                        </fieldset>
                    </div>
                    <button className={`${styles.button} ${styles.optionButton}`} type="submit">Add Pokemon</button>
                </form>
                <form onSubmit={handleEditSubmit}>
                    <fieldset className={styles.fieldSet}>
                        <label className={styles.fieldLabel} htmlFor="areaName">Area Name</label>
                        <input className={styles.fieldInput} type="text" name="areaName" value={area.areaName}/>
                    </fieldset>

                    <fieldset>
                        <table className={styles.encounterTable}>
                            <thead>
                                <tr>
                                    <th>Pokemon Name</th>
                                    <th>Encounter Rate</th>
                                    <th>Flee Rate</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {encounters.map(encounter => (
                                    <tr>
                                        <td>{encounter.pokemonName}</td>
                                        <td contentEditable 
                                            onInput={(event) => handleEncounterRateChange(event, encounter.areaId, encounter.pokemonName)}>
                                                {encounter.encounterRate}</td>
                                        <td contentEditable>{encounter.fleeRate}</td>
                                        <td>
                                            <button type="button" className={styles.button} onClick={() => handleDeleteEncounter(encounter.areaId, encounter.pokemonName)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </fieldset>

                    <div className={styles.errorContainer}>{editError.map(error => (
                        <p>{error}</p>
                    ))}</div>
                    <div className={styles.successContainer}>{editSuccess.map(success => (
                        <p>{success}</p>
                    ))}</div>

                    <div className={styles.buttonContainer}>
                        <button className={`${styles.button} ${styles.optionButton}`} style={{marginRight: '2rem'}}>Submit</button>
                        <button className={`${styles.button} ${styles.optionButton}`} type="button" onClick={handleCancelForm}>Cancel</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AdminPanelAreaForm;