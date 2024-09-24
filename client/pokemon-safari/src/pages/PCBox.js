import { useEffect, useState } from 'react';
import styles from '../assets/styles/pages/PCBox.module.css'
import StyledButton from '../components/StyledButton';
import StyledLink from '../components/StyledLink';

const basePokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';

const TEST_DATA_DELETE_LATER = [
    {
        pokemonName: 'pikachu',
        maxhp: 28,
        attack: 6,
        defense: 20,
        specialAttack: 31,
        specialDefense: 15,
        speed: 22
    }, 
    {
        pokemonName: 'charmander',
        maxhp: 14,
        attack: 7,
        defense: 31,
        specialAttack: 25,
        specialDefense: 8,
        speed: 11
    }, 
    {
        pokemonName: 'bulbasaur',
        maxhp: 15,
        attack: 9,
        defense: 1,
        specialAttack: 2,
        specialDefense: 23,
        speed: 30
    }, 
    {
        pokemonName: 'eternatus',
        maxhp: 2,
        attack: 18,
        defense: 12,
        specialAttack: 7,
        specialDefense: 28,
        speed: 24
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
    const [pokemon, setPokemon] = useState(TEST_DATA_DELETE_LATER);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(DEFAULT_SELECTED_POKEMON);

    useEffect(() => {
        populateSprites()
        //set loading state to false so pokemon slots can render
        .then(() => setIsLoading(false));
    }, []);

    //==============
    //EVENT HANDLERS
    //==============

    const handleRelease = () => {
        //TODO: implement releasing pokemon and deleting them from database
    }
    
    //==============
    //HTTP FUNCTIONS
    //==============

    //fetch all sprites and attach them to pokemon objects
    function populateSprites() {
        const newPokemon = [...pokemon];
        let promises = [];

        //iterate through all pokemon and invoke fetch methods
        for (const mon of newPokemon) {
            promises.push(fetch(`${basePokeApiUrl}/${mon.pokemonName}`).then(data => {
                return data.json();
            })
            .then(dataJson => {
                mon.sprite = dataJson.sprites.front_default;
            }));
        }

        //only resolve this promise once all looped fetch promises have resolved
        return Promise.all(promises);
    }

    //=================
    //UTILITY FUNCTIONS
    //=================

    return(
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
                                <td key='statMaxHpValue'>{selectedPokemon.maxhp}</td>
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
        
    )
}

export default PCBox;