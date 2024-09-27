package org.lonic.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lonic.models.AreaEncounter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AreaEncounterJDBCRepositoryTest {

    @Autowired
    AreaEncounterJDBCRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll(){
        List<AreaEncounter> areaEncounters = repository.findAllWithId(1);
        assertNotNull(areaEncounters);
        assertEquals(areaEncounters.get(0).getAreaId(),1);
    }

    @Test
    void shouldAddAreaEncounter() {
        AreaEncounter areaEncounter = new AreaEncounter();
        areaEncounter.setFleeRate(1);
        areaEncounter.setAreaId(1);
        areaEncounter.setEncounterRate(1);
        areaEncounter.setPokemonName("Piplup");
        AreaEncounter actual = repository.add(areaEncounter);
        assertNotNull(actual);
        assertEquals("Piplup", actual.getPokemonName());
    }

    @Test
    void shouldUpdate() {

        List<AreaEncounter> areaEncounters = repository.findAllWithId(1);
        AreaEncounter areaEncounter = areaEncounters.get(0);
        areaEncounter.setFleeRate(100);
        assertTrue(repository.update(areaEncounter));
    }

    @Test
    void shouldDelete(){
        assertTrue(repository.delete(1,"pikachu"));
    }
}
