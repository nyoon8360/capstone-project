import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/PCBox.module.css'
import StyledButton from '../components/StyledButton';
import StyledLink from '../components/StyledLink';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const basePokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';
const baseUrl = 'http://localhost:8080/api';

const DEFAULT_PC_BOX = [
    {
        pokemonName: 'pikachu',
        maxhp: 28,
        attack: 6,
        defense: 20,
        specialAttack: 31,
        specialDefense: 15,
        speed: 22
    }
];

const DEFAULT_SELECTED_POKEMON = {
    pokemonName: '',
    maxhp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    sprite: ''
}

function PCBox() {
    const [pokemon, setPokemon] = useState(DEFAULT_PC_BOX);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(DEFAULT_SELECTED_POKEMON);

    const navigate = useNavigate();

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

        fetch(`${baseUrl}/pokemon`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .then(data => {

                populateSprites(data).then(fullPokemon => {
                    setIsLoading(false);
                    setPokemon(fullPokemon);
                })
            })
            .catch(console.log);

        
    }, [pokemon]);

    //==============
    //EVENT HANDLERS
    //==============

    const handleRelease = () => {
        //fetch all player information and display it on ui
        const init = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('Authorization')
            }
        }

        fetch(`${baseUrl}/pokemon/${selectedPokemon.pokemonInstanceId}`, init)
            .then(response => {
                console.log(response);
                if (response.status === 204) {
                    const newPokemon = [...pokemon];
                    newPokemon.filter(mon => mon.pokemonInstanceId != selectedPokemon.pokemonInstanceId);

                    setPokemon(newPokemon);
                    setSelectedPokemon(DEFAULT_SELECTED_POKEMON);
                    setIsLoading(false);
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .catch(console.log);
    }
    
    //==============
    //HTTP FUNCTIONS
    //==============

    //fetch all sprites and attach them to pokemon objects
    function populateSprites(data) {
        let promises = [];

        //iterate through all pokemon and invoke fetch methods
        for (const mon of data) {
            promises.push(fetch(`${basePokeApiUrl}/${mon.pokemonName}`).then(data => {
                return data.json();
            })
            .then(dataJson => {
                return ({...mon, sprite: dataJson.sprites.front_default})
            }));
        }

        //only resolve this promise once all looped fetch promises have resolved
        return Promise.all(promises);
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
        <Layout>
            <section className={styles.background}>
                <div className={styles.mainContainer}>
                    <div className={styles.sidebar}>
                        <h2 className={styles.sidebarTitle}>
                            {selectedPokemon.pokemonName ? 
                            selectedPokemon.pokemonName.charAt(0).toUpperCase() + selectedPokemon.pokemonName.slice(1) 
                            : '???'}
                        </h2>
                        <div className={styles.sidebarImageContainer}>
                            {selectedPokemon.sprite ? 
                                <img 
                                    className={styles.sidebarImage} 
                                    src={selectedPokemon.sprite} 
                                    alt={selectedPokemon.pokemonName} 
                                    width={200} height={200}
                                ></img>
                            : <></>}
                        </div>
                        <table className={styles.sidebarStatsTable}>
                            <thead key='header' hidden>
                                <tr key='headerRow'>
                                    <th key='statName'>Stat Name</th>
                                    <th key='statValue'>Stat Value</th>
                                </tr>
                            </thead>
                            <tbody key='body'>
                                <tr key='statMaxHp'>
                                    <td key='statMaxHpLabel'>Max HP:</td>
                                    <td key='statMaxHpValue'>{selectedPokemon.maxHp}</td>
                                </tr>
                                <tr key='statAttack'>
                                    <td key='statAttackLabel'>Attack:</td>
                                    <td key='statAttackValue'>{selectedPokemon.attack}</td>
                                </tr>
                                <tr key='statDefense'>
                                    <td key='statDefenseLabel'>Defense:</td>
                                    <td key='statDefenseValue'>{selectedPokemon.defense}</td>
                                </tr>
                                <tr key='statSpecialAttack'>
                                    <td key='statSpecialAttackLabel'>Sp. Attack:</td>
                                    <td key='statSpecialAttackValue'>{selectedPokemon.specialAttack}</td>
                                </tr>
                                <tr key='statSpecialDefense'>
                                    <td key='statDefenseLabel'>Sp. Defense:</td>
                                    <td key='statSpecialDefenseValue'>{selectedPokemon.specialDefense}</td>
                                </tr>
                                <tr key='statSpeed'>
                                    <td key='statSpeedLabel'>Speed:</td>
                                    <td key='statSpeedValue'>{selectedPokemon.speed}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.buttonContainer}>
                            <StyledButton onClick={handleRelease} size='1' type='danger' style={{width: '40%'}}>Release</StyledButton>
                            <StyledLink to={'/entrance'} size='1' style={{width: '40%'}}>Back</StyledLink>
                        </div>
                    </div>
                    <div id='box' className={styles.box}>
                        <h1 className={styles.heading}>PC Box</h1>
                        <div className={styles.boxGrid}>
                            {isLoading  ? <></> : pokemon.map(instance => (
                                <div key={instance.pokemonName} className={styles.slot} onClick={() => setSelectedPokemon(instance)}>
                                    <img className={styles.slotImage} src={instance.sprite} alt={instance.pokemonName} width={200} height={200}></img>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
        
        
    )
}

export default PCBox;