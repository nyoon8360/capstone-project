import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/Encounter.module.css'
import { useNavigate } from 'react-router-dom';

const basePokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';

//get all bait images and put them in a list
const baitImages = require.context('../assets/images/baits', true);
const baitImageList = baitImages.keys().map(image => baitImages(image));

function Encounter() {
    const [pokemon, setPokemon] = useState({pokemonName: 'pikachu'});

    const navigate = useNavigate();

    //fetch pokemon stats and sprites
    useEffect(() => {
        //if no auth token then navigate to home page
        if (!document.cookie) {
            navigate('/')
        }

        getSprite();
    }, []);

    //==============
    //EVENT HANDLERS
    //==============

    const handleThrowBait = () => {
        //TODO: apply effects of throw bait on catch and flee rate
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
    }

    const handleThrowMud = () => {
        //TODO: apply effects of throw mud on catch and flee rate

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
    }

    const handleThrowPokeball = () => {
        //TODO: apply effects of throw pokeball
    }

    const handleMudAnimationEnd = (event) => {
        event.target.remove();
    }

    //============
    //HTTP METHODS
    //============
    function getSprite() {
        const newPokemon = {...pokemon};

        return fetch(`${basePokeApiUrl}/${pokemon.pokemonName}`).then(data => {
            return data.json();
        })
        .then(dataJson => {
            newPokemon.sprite = dataJson.sprites.front_default;

            //set pokemon size based on fetched height
            let pokemonHeight = dataJson.height;

            newPokemon.size = 
                pokemonHeight <= 6 ? '40%' : 
                pokemonHeight <= 14 ? '60%' :
                pokemonHeight <= 26 ? '80%' :
                '100%';
            
            setPokemon(newPokemon);
        })
    }

    //end encounter and return to previous area
    const handleRunAway = () => {
        //TODO: end encounter in backend

        //navigate back to previous area
        navigate(-1);
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.background}>
                <img className={styles.trainer} alt='pokemon trainer' src={require('../assets/images/trainer_encounter_sprite.png')}/>
                <div id='pokemonContainer' className={styles.pokemonContainer}>
                    <img className={styles.pokemon} alt={pokemon.pokemonName} style={{height: pokemon.size}} src={pokemon.sprite}/>
                </div>
            </div>
            <div className={styles.actionBar}>
                <div className={styles.actionBarTextWindowContainer}>
                    <p className={styles.actionBarTextWindow}>
                        What will trainer do?
                    </p>
                </div>
                <div className={styles.actionBarButtonContainer}>
                    <button className={styles.actionBarButton} onClick={handleThrowBait}>Throw Bait</button>
                    <button className={styles.actionBarButton} onClick={handleThrowMud}>Throw Mud</button>
                    <button className={styles.actionBarButton} onClick={handleThrowPokeball}>Throw Pokeball</button>
                    <button className={styles.actionBarButton} onClick={handleRunAway}>Run Away</button>
                </div>
            </div>
        </div>
    )
}

export default Encounter;