package org.lonic.domain;

import org.junit.jupiter.api.Test;
import org.lonic.data.PokemonInstanceRepository;
import org.lonic.models.PokemonInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class PokemonInstanceServiceTest {

    @Autowired
    PokemonInstanceService service;

    @MockBean
    PokemonInstanceRepository repository;

    @Test
    void shouldGetByUserId() {
        PokemonInstance pokemonInstance = makePokemonInstance();

        when(repository.getByUserIdAdmin(2)).thenReturn(List.of(pokemonInstance)); //set mock output
        Result<List<PokemonInstance>> result = service.getByUserId(2);

        assertEquals(pokemonInstance, result.getPayload().get(0));
    }
    @Test
    void shouldReturnEmptyForNonExistentUserId() {
        List<PokemonInstance> output = new ArrayList<>();

        when(repository.getByUserIdAdmin(55)).thenReturn(output); //Set mock unhappy output
        Result<List<PokemonInstance>> result = service.getByUserId(2);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("No pokemon found for this user ID."));
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertTrue(result.getPayload().isEmpty());
    }

    @Test
    void shouldAddPokemonInstance() {
        PokemonInstance expected = makePokemonInstance();
        PokemonInstance input = makePokemonInstance();
        when(repository.add(input)).thenReturn(expected);
        Result<PokemonInstance> result = service.add(expected);

        assertTrue(result.isSuccess());
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotAddPreSetId() {
        PokemonInstance input = makePokemonInstance();
        input.setPokemonInstanceId(2);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Instance ID cannot be set for add operation."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullOrEmptyName() {
        PokemonInstance input = makePokemonInstance();
        input.setPokemonName("");
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name can't be blank"));
        assertEquals(ResultType.INVALID, result.getType());

        input.setPokemonName(null);
        result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name can't be blank"));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddOutOfRangeAttack() {
        PokemonInstance input = makePokemonInstance();
        input.setAttack(32);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Attack must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddOutOfRangeSpecialAttack() {
        PokemonInstance input = makePokemonInstance();
        input.setSpecialAttack(32);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Special Attack must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddOutOfRangeDefense() {
        PokemonInstance input = makePokemonInstance();
        input.setDefense(32);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Defense must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddOutOfRangeSpecialDefense() {
        PokemonInstance input = makePokemonInstance();
        input.setSpecialDefense(32);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Special Defense must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddOutOfRangeMaxHp() {
        PokemonInstance input = makePokemonInstance();
        input.setMaxHp(32);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Max HP must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddOutOfRangeSpeed() {
        PokemonInstance input = makePokemonInstance();
        input.setSpeed(32);
        Result<PokemonInstance> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Speed must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldDeleteById() {
        PokemonInstance input = makePokemonInstance();
        input.setPokemonInstanceId(2);
        when(repository.deleteById(2)).thenReturn(true);
        assertTrue(service.deleteById(input.getPokemonInstanceId()).isSuccess());
    }

    @Test
    void shouldNotDeleteNonExistentId() {
        PokemonInstance input = makePokemonInstance();
        input.setPokemonInstanceId(123);
        when(repository.deleteById(123)).thenReturn(false);
        Result<PokemonInstance> result = service.deleteById(input.getPokemonInstanceId());

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon not found"));
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldUpdate() {
        PokemonInstance input = makePokemonInstance();
        input.setMaxHp(22);
        when(repository.update(input)).thenReturn(true);
        Result<PokemonInstance> result = service.update(input);

        assertTrue(service.update(input).isSuccess());
    }

    @Test
    void shouldNotUpdateNonExistentId() {
        PokemonInstance input = makePokemonInstance();
        input.setPokemonInstanceId(123);
        when(repository.update(input)).thenReturn(false);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon not found"));
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldNotUpdateNullOrEmptyName() {
        PokemonInstance input = makePokemonInstance();
        input.setPokemonName("");
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name can't be blank"));
        assertEquals(ResultType.INVALID, result.getType());

        input.setPokemonName(null);
        result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name can't be blank"));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateOutOfRangeAttack() {
        PokemonInstance input = makePokemonInstance();
        input.setAttack(32);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Attack must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateOutOfRangeSpecialAttack() {
        PokemonInstance input = makePokemonInstance();
        input.setSpecialAttack(32);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Special Attack must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateOutOfRangeDefense() {
        PokemonInstance input = makePokemonInstance();
        input.setDefense(32);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Defense must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateOutOfRangeSpecialDefense() {
        PokemonInstance input = makePokemonInstance();
        input.setSpecialDefense(32);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Special Defense must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateOutOfRangeMaxHp() {
        PokemonInstance input = makePokemonInstance();
        input.setMaxHp(32);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Max HP must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateOutOfRangeSpeed() {
        PokemonInstance input = makePokemonInstance();
        input.setSpeed(32);
        Result<PokemonInstance> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Speed must be between 1 and 31."));
        assertEquals(ResultType.INVALID, result.getType());
    }


    private PokemonInstance makePokemonInstance() {
        PokemonInstance instance = new PokemonInstance();
        instance.setPokemonName("Totodile");
        instance.setAppUserId(2);
        instance.setMaxHp(2);
        instance.setAttack(2);
        instance.setDefense(2);
        instance.setSpecialAttack(2);
        instance.setSpecialDefense(2);
        instance.setSpeed(2);

        return instance;
    }
}