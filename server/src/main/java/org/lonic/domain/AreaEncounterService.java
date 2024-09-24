package org.lonic.domain;

import org.lonic.data.AreaEncounterRepository;
import org.lonic.models.AreaEncounter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaEncounterService {
    private final AreaEncounterRepository repository;

    public AreaEncounterService(AreaEncounterRepository repository) {
        this.repository = repository;
    }

    public Result <List<AreaEncounter>> findAllWithId(int areaId) {
        Result<List<AreaEncounter>> result = new Result<>();
        result.setPayload(repository.findAllWithId(areaId));

        if(result.getPayload().isEmpty()) {
            result.addMessage("No Areas with matching ID found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<AreaEncounter> add(AreaEncounter areaEncounter) {
        Result<AreaEncounter> result = new Result<>();

        if(areaEncounter == null) {
            result.addMessage("Area Encounter cannot be null.", ResultType.INVALID);
            return result;
        }
        if(Validations.isNullOrBlank(areaEncounter.getPokemonName())) {
            result.addMessage("Pokemon Name cannot be blank.", ResultType.INVALID);
            return result;
        }
        if(isDuplicate(areaEncounter) && areaEncounter.getPokemonName() != null) {
            result.addMessage("Cannot add duplicate Pokemon to area.", ResultType.INVALID);
        }
        if(areaEncounter.getEncounterRate() <= 1) {
            result.addMessage("Encounter Rate must be greater than 1.", ResultType.INVALID);
        }
        if(areaEncounter.getFlee_rate() <= 0 || areaEncounter.getFlee_rate() >= 100) {
            result.addMessage("Flee Rate must be between 0 and 100.", ResultType.INVALID);
        }

        if (result.isSuccess()) {
            result.setPayload(repository.add(areaEncounter));
        }
        return result;

    }

    public Result<AreaEncounter> update(AreaEncounter areaEncounter) {
        Result<AreaEncounter> result = new Result<>();

        if(areaEncounter == null) {
            result.addMessage("Area Encounter cannot be null.", ResultType.INVALID);
            return result;
        }
        if(Validations.isNullOrBlank(areaEncounter.getPokemonName())) {
            result.addMessage("Pokemon Name cannot be blank.", ResultType.INVALID);
        }
        if(areaEncounter.getEncounterRate() <= 1) {
            result.addMessage("Encounter Rate must be greater than 1.", ResultType.INVALID);
        }
        if(areaEncounter.getFlee_rate() <= 0 || areaEncounter.getFlee_rate() >= 100) {
            result.addMessage("Flee Rate must be between 0 and 100.", ResultType.INVALID);
        }

        if(!result.isSuccess()) {
            return result;
        } else if (!repository.update(areaEncounter)) {
            result.addMessage("Area Encounter Not Found.", ResultType.INVALID);
        }
        result.setPayload(areaEncounter);
        return result;

    }

    public Result<AreaEncounter> delete(int areaId, String pokemonName) {
        Result<AreaEncounter> result = new Result<>();

        if(Validations.isNullOrBlank(pokemonName)) {
            result.addMessage("Pokemon Name cannot be blank.", ResultType.INVALID);
            return result;
        }
        if (!repository.delete(areaId, pokemonName)) {
            result.addMessage("Area Encounter Not Found.", ResultType.INVALID);
        }

        return result;

    }

    private boolean isDuplicate(AreaEncounter areaEncounter) {
        return repository.findAllWithId(areaEncounter.getAreaId()).stream()
                .anyMatch(ae -> ae.getPokemonName().equals(areaEncounter.getPokemonName()));
    }

}
