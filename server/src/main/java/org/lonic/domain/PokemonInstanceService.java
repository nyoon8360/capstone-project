package org.lonic.domain;

import org.lonic.data.PokemonInstanceRepository;
import org.lonic.models.PokemonInstance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokemonInstanceService {
    private final PokemonInstanceRepository repository;

    public PokemonInstanceService(PokemonInstanceRepository repository) {
        this.repository = repository;
    }

    public Result<List<PokemonInstance>> getByUserId(int userId) {
        Result<List<PokemonInstance>> result = new Result<>();
        result.setPayload(repository.getByUserIdAdmin(userId));

        if(result.getPayload().isEmpty()) {
            result.addMessage("No pokemon found for this user ID.", ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<PokemonInstance> add(PokemonInstance pokemonInstance) {
        Result<PokemonInstance> result = validate(pokemonInstance);
        if(!result.isSuccess()) {
            return result;
        } else if(pokemonInstance.getPokemonInstanceId() != 0) {
            result.addMessage("Pokemon Instance ID cannot be set for add operation.", ResultType.INVALID);
            return result;
        }

        result.setPayload(repository.add(pokemonInstance));
        return result;
    }

    public Result<PokemonInstance> deleteById(int pokemonInstanceId) {
        Result<PokemonInstance> result = new Result<>();

        //False if no match id is found
        if (!repository.deleteById(pokemonInstanceId)) {
            result.addMessage("Pokemon not found", ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<PokemonInstance> update(PokemonInstance pokemonInstance) {
        Result<PokemonInstance> result = validate(pokemonInstance);

        if(!result.isSuccess()){
            return result;
        } else if(!repository.update(pokemonInstance)) {
            result.addMessage("Pokemon not found", ResultType.NOT_FOUND);
        }
        return result;
    }

    //Check for null object or empty/out of range fields
    private Result<PokemonInstance> validate(PokemonInstance pokemonInstance) {
        Result<PokemonInstance> result = new Result<>();
        if(pokemonInstance == null) {
            result.addMessage("Pokemon cannot be null.", ResultType.INVALID);
            return result;
        }

        if(Validations.isNullOrBlank(pokemonInstance.getPokemonName())) {
            result.addMessage("Pokemon Name can't be blank", ResultType.INVALID);
        }if(pokemonInstance.getAttack() > 31 || pokemonInstance.getAttack() < 1) {
            result.addMessage("Attack must be between 1 and 31.", ResultType.INVALID);
        }if(pokemonInstance.getDefense() > 31 || pokemonInstance.getDefense() < 1) {
            result.addMessage("Defense must be between 1 and 31.", ResultType.INVALID);
        }if(pokemonInstance.getSpecialAttack() > 31 || pokemonInstance.getSpecialAttack() < 1) {
            result.addMessage("Special Attack must be between 1 and 31.", ResultType.INVALID);
        }if(pokemonInstance.getSpecialDefense() > 31 || pokemonInstance.getSpecialDefense() < 1) {
            result.addMessage("Special Defense must be between 1 and 31.", ResultType.INVALID);
        }if(pokemonInstance.getMaxHp() > 31 || pokemonInstance.getMaxHp() < 1) {
            result.addMessage("Max HP must be between 1 and 31.", ResultType.INVALID);
        }if(pokemonInstance.getSpeed() > 31 || pokemonInstance.getSpeed() < 1) {
            result.addMessage("Speed must be between 1 and 31.", ResultType.INVALID);
        }
        return result;
    }

}
