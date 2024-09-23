package org.lonic.data;

import org.lonic.models.AreaEncounter;

import java.util.List;

public interface AreaEncounterRepository {
    List<AreaEncounter> findAllWithId(int areaId);

    AreaEncounter add(AreaEncounter areaEncounter);

    boolean update(AreaEncounter areaEncounter);

    boolean delete(int areaId, String pokemonName);
}
