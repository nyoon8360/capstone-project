import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/Encounter.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

const basePokeApiUrl = 'https://pokeapi.co/api/v2';
const baseUrl = 'http://localhost:8080/api';

//get all bait images and put them in a list
const baitImages = require.context('../assets/images/baits', true);
const baitImageList = baitImages.keys().map(image => baitImages(image));

function Encounter() {
    const location = useLocation();
    const [pokemon, setPokemon] = useState({pokemonName: "ditto"});
    const [currentMessages, setCurrentMessages] = useState(['What will trainer do?']);
    const [actionsDisabled, setActionsDisabled] = useState(false);
    const [angryTurns, setAngryTurns] = useState(0);
    const [eatingTurns, setEatingTurns] = useState(0);
    const [pokemonVisible, setPokemonVisible] = useState(true);

    const navigate = useNavigate();

    //fetch pokemon stats and sprites
    useEffect(() => {
        //if no auth token or state then navigate to home page
        if (!document.cookie || location.state === null) {
            navigate('/');
        } else {
            getPokemonData(location.state.pokemonName).then((data) => {
                const newPokemon = {...data[0], ...data[1], pokemonName: location.state.pokemonName, fleeRate: location.state.fleeRate};
                console.log(newPokemon);
                setPokemon(newPokemon);
            })
        }
    }, []);

    //==============
    //EVENT HANDLERS
    //==============
    const handleThrowBait = () => {
        setCurrentMessages([`Trainer threw some bait!`, `The wild ${pokemon.pokemonName} has started to eat.`]);

        //set eating turns to a random value from 1 to 5 and reset angry
        setEatingTurns(Math.floor(Math.random() * 4) + 1);
        setAngryTurns(0);

        let pokemonContainer = document.getElementById('pokemonContainer');

        let baitElement = document.createElement('img');
        baitElement.className = styles.bait;
        baitElement.alt = 'bait';

        //choose a random bait image to use
        let randomNum = Math.floor(Math.random() * (baitImageList.length));
        baitElement.src = baitImageList[randomNum];

        //delete bait element after animation
        baitElement.addEventListener('animationend', (event) => {
            event.target.remove();
        });

        pokemonContainer.appendChild(baitElement);
        actionCooldown(3000);
    }
    
    const handleThrowMud = () => {
        setCurrentMessages([`Trainer threw some mud!`, `The wild ${pokemon.pokemonName} is now angry.`]);

        //set angry turns to a random value from 1 to 5 and reset eating turns
        setAngryTurns(Math.floor(Math.random() * 4) + 1);
        setEatingTurns(0);

        //get pokemon container to append mud element to
        let pokemonContainer = document.getElementById('pokemonContainer');
        
        //create mud element
        let mudElement = document.createElement('img');
        mudElement.className = styles.mud;
        mudElement.alt = 'mud ball';
        mudElement.src = require('../assets/images/mud.png');

        //delete mud element after animation
        mudElement.addEventListener('animationend', (event) => {
            event.target.remove();
        });

        pokemonContainer.appendChild(mudElement);
        actionCooldown(3000);
    }

    const handleThrowPokeball = () => {
        //calculate if pokemon is caught
        let result = calculateCaught();

        //get pokemon container to append pokeball element to
        let pokemonContainer = document.getElementById('pokemonContainer');
        
        //create pokeball element
        let pokeballElement = document.createElement('img');
        pokeballElement.className = styles.pokeball;
        pokeballElement.alt = 'pokeball';
        pokeballElement.src = require('../assets/images/pokeball_safari.png');

        //delete pokeball element after animation
        pokeballElement.addEventListener('animationend', (event) => {
            setTimeout(() => {
                if (!result) {
                    event.target.remove();
                }
            }, 1500);
        });

        pokemonContainer.appendChild(pokeballElement);

        //hide pokemon when hit with pokeball during animation
        setTimeout(() => {
            setPokemonVisible(false);
        }, 300);

        console.log(result);

        actionCooldown(3000, result);
    }

    //calculates whether the pokemon has fled this turn
    const calculateFlee = () => {
        let randomNumber = Math.floor(Math.random() * 100);
        let finalFleeRate = pokemon.fleeRate * (angryTurns > 0 ? 1.5 : 1) * (eatingTurns > 0 ? .5 : 1);
        if (randomNumber <= finalFleeRate) {
            return true;
        }
        return false;
    }

    const calculateCaught = () => {
        let randomNumber = Math.floor(Math.random() * 256);
        let finalCatchRate = pokemon.catchRate * (angryTurns > 0 ? 1.5 : 1) * (eatingTurns > 0 ? .5 : 1);
        if (randomNumber <= finalCatchRate) {
            return true;
        }
        return false;
    }

    const actionCooldown = (delay, caught) => {
        setActionsDisabled(true);

        setTimeout(() => {
            console.log(caught);
            if (caught) {
                setCurrentMessages([`You've caught the wild ${pokemon.pokemonName}!`]);

                const init = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Authorization')
                    },
                    body: JSON.stringify({
                        pokemonName: location.state.pokemonName,
                        maxHp: Math.floor((Math.random() * 30) + 1),
                        attack: Math.floor((Math.random() * 30) + 1),
                        defense: Math.floor((Math.random() * 30) + 1),
                        specialAttack: Math.floor((Math.random() * 30) + 1),
                        specialDefense: Math.floor((Math.random() * 30) + 1),
                        speed: Math.floor((Math.random() * 30) + 1)
                    })
                }
        
                fetch(`${baseUrl}/pokemon`, init)
                    .then(response => {
                        if (response.status !== 201) {
                            return Promise.reject(`Unexpected Status Code: ${response.status}`);
                        }
                    })
                    .catch(console.log);

                setTimeout(() => {
                    navigate(-1);
                }, 3000);
            } else {
                postTurnLogic();
            }
        }, delay);
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

    const postTurnLogic = () => {
        //if no catch attempt was made then calculate if fled then run post turn logic
        if (calculateFlee()) {
            setCurrentMessages([`The wild ${pokemon.pokemonName} has fled!`]);
            setPokemonVisible(false);
            setTimeout(() => {
                navigate(-1);
            }, 3000);
        } else {
            //set message to base message
            setCurrentMessages(["What will trainer do?"]);

            //decrement angry and eating turns
            if (angryTurns > 0) {
                setAngryTurns(angryTurns - 1);

                //if pokemon is now no longer angry this turn then display message
                if (angryTurns === 0) {
                    setCurrentMessages([`The wild ${pokemon.pokemonName} is no longer angry.`]);
                }
            }
            if (eatingTurns > 0) {
                setEatingTurns(eatingTurns - 1);

                //if pokemon is now no longer eating this turn then display message
                if (eatingTurns === 0) {
                    setCurrentMessages([`The wild ${pokemon.pokemonName} is no longer eating.`]);
                }
            }

            //re-enable actions
            setActionsDisabled(false);
            setPokemonVisible(true);
        }
    }

    //============
    //HTTP METHODS
    //============
    function getPokemonData(pokemonName) {
        let promises = [];

        promises.push(fetch(`${basePokeApiUrl}/pokemon/${pokemonName}`).then(data => {
            return data.json();
        })
        .then(dataJson => {
            const newPokemon = {};
            newPokemon.sprite = dataJson.sprites.front_default;

            //set pokemon size based on fetched height
            let pokemonHeight = dataJson.height;

            newPokemon.size = 
                pokemonHeight <= 6 ? '40%' : 
                pokemonHeight <= 14 ? '60%' :
                pokemonHeight <= 26 ? '80%' :
                '100%';
            
            return newPokemon;
        }));

        promises.push(fetch(`${basePokeApiUrl}/pokemon-species/${pokemonName}`).then(data => {
            return data.json()
        })
        .then(dataJson => {
            return {catchRate: Math.min(dataJson.capture_rate, 128)};
        }));

        return Promise.all(promises);
    }

    //end encounter and return to previous area
    const handleRunAway = () => {
        navigate(-1);
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.background}>
                <img className={styles.trainer} alt='pokemon trainer' src={require('../assets/images/trainer_encounter_sprite.png')}/>
                <div id='pokemonContainer' className={styles.pokemonContainer}>
                    <img className={styles.pokemon} alt={pokemon.pokemonName} style={{height: pokemon.size, visibility: pokemonVisible ? "visible" : "hidden"}} src={pokemon.sprite}/>
                </div>
            </div>
            <div className={styles.actionBar}>
                <div className={styles.actionBarTextWindowContainer}>
                    <div className={styles.actionBarTextWindow}>
                        {currentMessages.map(msg => (
                            <p>{msg}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.actionBarButtonContainer}>
                    <button className={styles.actionBarButton} onClick={handleThrowBait} disabled={actionsDisabled}>Throw Bait</button>
                    <button className={styles.actionBarButton} onClick={handleThrowMud} disabled={actionsDisabled}>Throw Mud</button>
                    <button className={styles.actionBarButton} onClick={handleThrowPokeball} disabled={actionsDisabled}>Throw Pokeball</button>
                    <button className={styles.actionBarButton} onClick={handleRunAway} disabled={actionsDisabled}>Run Away</button>
                </div>
            </div>
        </div>
    )
}

export default Encounter;