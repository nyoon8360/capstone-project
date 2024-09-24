package org.lonic.domain;

import org.junit.jupiter.api.Test;
import org.lonic.data.AreaEncounterRepository;
import org.lonic.models.AreaEncounter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AreaEncounterServiceTest {

    @Autowired
    AreaEncounterService service;

    @MockBean
    AreaEncounterRepository repository;

    @Test
    void shouldNotAddEmptyOrNullName() {
        AreaEncounter encounter = makeAreaEncounter();
        encounter.setPokemonName("");
        Result<AreaEncounter> result = service.add(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name cannot be blank."));
    }

    @Test
    void shouldNotAddDuplicate() {
        AreaEncounter encounter = makeAreaEncounter();
        when(repository.findAllWithId(encounter.getAreaId())).thenReturn(List.of(encounter));
        Result<AreaEncounter> result = service.add(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Cannot add duplicate Pokemon to area."));
    }

    @Test
    void shouldNotAddOutOfRangeEncounterRate() {
        AreaEncounter encounter = makeAreaEncounter();
        encounter.setEncounterRate(1);
        Result<AreaEncounter> result = service.add(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Encounter Rate must be greater than 1."));
    }

    @Test
    void shouldNotAddOutOfRangeFleeRate() {
        AreaEncounter encounter = makeAreaEncounter();
        encounter.setFleeRate(100);
        Result<AreaEncounter> result = service.add(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Flee Rate must be between 0 and 100."));
    }

    @Test
    void shouldNotUpdateEmptyOrNullName() {
        AreaEncounter encounter = makeAreaEncounter();
        encounter.setPokemonName("");
        Result<AreaEncounter> result = service.update(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name cannot be blank."));
    }

    @Test
    void shouldNotUpdateOutOfRangeEncounterRate() {
        AreaEncounter encounter = makeAreaEncounter();
        encounter.setEncounterRate(1);
        Result<AreaEncounter> result = service.update(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Encounter Rate must be greater than 1."));
    }

    @Test
    void shouldNotUpdateOutOfRangeFleeRate() {
        AreaEncounter encounter = makeAreaEncounter();
        encounter.setFleeRate(100);
        Result<AreaEncounter> result = service.update(encounter);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Flee Rate must be between 0 and 100."));
    }

    @Test
    void shouldNotDeleteEmptyOrNullName() {
        Result<AreaEncounter> result = service.delete(1, "");

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name cannot be blank."));

        result = service.delete(1, null);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Pokemon Name cannot be blank."));
    }

    private AreaEncounter makeAreaEncounter() {
        AreaEncounter encounter = new AreaEncounter();
        encounter.setEncounterRate(2);
        encounter.setFleeRate(2);
        encounter.setPokemonName("Pikachu");
        return encounter;
    }
}