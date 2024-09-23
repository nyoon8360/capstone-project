package org.lonic.data;

import org.lonic.data.mappers.PokemonInstanceMapper;
import org.lonic.models.PokemonInstance;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class PokemonInstanceJDBCRepository implements PokemonInstanceRepository{

    private final JdbcTemplate jdbcTemplate;

    public PokemonInstanceJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<PokemonInstance> findAll() {
        final String sql = "select pokemon_instance_id, pokemon_name, app_user_id, max_hp, attack, defense, special_attack, special_defense, speed "
                + "from pokemon_instance;";
        return jdbcTemplate.query(sql, new PokemonInstanceMapper());
    }

    public static List<PokemonInstance> getByUserId(int userId) {
        return null;
    }

    public static PokemonInstance add(PokemonInstance pokemonInstance) {
        return null;
    }

    public static boolean deleteById(int id) {
        return false;
    }

    public static boolean update(PokemonInstance pokemonInstance) {
        return false;
    }

}

