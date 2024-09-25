package org.lonic.data;

import org.lonic.models.PokemonInstance;

import java.util.List;

public interface PokemonInstanceRepository {
    List<PokemonInstance> getByUserId(int userId);

    List<PokemonInstance> getByUserIdAdmin(int userId);

    PokemonInstance add(PokemonInstance pokemonInstance);

    boolean deleteById(int instanceId);

    boolean update(PokemonInstance pokemonInstance);
}
