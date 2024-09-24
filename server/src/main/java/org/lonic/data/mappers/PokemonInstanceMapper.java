package org.lonic.data.mappers;

import org.lonic.models.PokemonInstance;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PokemonInstanceMapper implements RowMapper<PokemonInstance> {

    @Override
    public PokemonInstance mapRow(ResultSet resultSet, int i) throws SQLException {
        PokemonInstance pokemonInstance = new PokemonInstance();

        pokemonInstance.setPokemonInstanceId(resultSet.getInt("pokemon_instance_id"));
        pokemonInstance.setPokemonName(resultSet.getString("pokemon_name"));
        pokemonInstance.setAppUserId(resultSet.getInt("app_user_id"));
        pokemonInstance.setMaxHp(resultSet.getInt("max_hp"));
        pokemonInstance.setAttack(resultSet.getInt("attack"));
        pokemonInstance.setDefense(resultSet.getInt("defense"));
        pokemonInstance.setSpecialAttack(resultSet.getInt("special_attack"));
        pokemonInstance.setSpecialDefense(resultSet.getInt("special_defense"));
        pokemonInstance.setSpeed(resultSet.getInt("speed"));

        return pokemonInstance;
    }
}
