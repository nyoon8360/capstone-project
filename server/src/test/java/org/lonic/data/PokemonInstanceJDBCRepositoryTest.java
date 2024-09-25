package org.lonic.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lonic.models.PokemonInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PokemonInstanceJDBCRepositoryTest {

    @Autowired
    PokemonInstanceJDBCRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){knownGoodState.set();}

    @Test
    void shouldFindByUserId() {

        List<PokemonInstance> actual = repository.getByUserId(3);
        assertEquals(3, actual.size());
    }
    @Test
    void shouldReturnEmptyForUserWithNoPokemon() {
        List<PokemonInstance> actual = repository.getByUserId(1);
        assertTrue(actual.isEmpty());
    }

    @Test
    void shouldAddPokemonInstance() {
        PokemonInstance newInstance = makePokemonInstance();
        PokemonInstance actual = repository.add(newInstance);
        assertEquals(7, actual.getPokemonInstanceId());
    }

    @Test
    void shouldDeletePokemonInstance() {
        assertTrue(repository.deleteById(5));
        assertEquals(2, repository.getByUserId(3).size());
    }

    @Test
    void shouldUpdatePokemon() {
        PokemonInstance newInstance = makePokemonInstance();
        newInstance.setPokemonInstanceId(2);
        newInstance.setSpeed(111);

        assertTrue(repository.update(newInstance));
        assertEquals(111, repository.getByUserId(3).get(0).getSpeed());
    }
    private PokemonInstance makePokemonInstance() {
        PokemonInstance instance = new PokemonInstance();
        instance.setPokemonName("Totodile");
        instance.setAppUserId(3);
        instance.setMaxHp(123);
        instance.setAttack(321);
        instance.setDefense(246);
        instance.setSpecialAttack(135);
        instance.setSpecialDefense(531);
        instance.setSpeed(111);

        return instance;
    }
}