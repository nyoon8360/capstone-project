package org.lonic.data;

import org.lonic.data.mappers.PokemonInstanceMapper;
import org.lonic.models.PokemonInstance;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PokemonInstanceJDBCRepository implements PokemonInstanceRepository{

    private final JdbcTemplate jdbcTemplate;

    public PokemonInstanceJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<PokemonInstance> getByUserId(int userId) {
        final String sql = "select pokemon_instance_id, pokemon_name, app_user_id, max_hp, attack, defense, special_attack, special_defense, speed "
                + "from pokemon_instance " +
                "where app_user_id = ?;";
        return jdbcTemplate.query(sql, new PokemonInstanceMapper(), userId);
    }

    public PokemonInstance add(PokemonInstance pokemonInstance) {
        final String sql = "insert into pokemon_instance (pokemon_name, app_user_id, max_hp, attack, defense, special_attack, special_defense, speed) "
                + " values (?,?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, pokemonInstance.getPokemonName());
            ps.setInt(2, pokemonInstance.getAppUserId());
            ps.setInt(3, pokemonInstance.getMaxHp());
            ps.setInt(4, pokemonInstance.getAttack());
            ps.setInt(5, pokemonInstance.getDefense());
            ps.setInt(6, pokemonInstance.getSpecialAttack());
            ps.setInt(7, pokemonInstance.getSpecialDefense());
            ps.setInt(8, pokemonInstance.getSpeed());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        pokemonInstance.setPokemonInstanceId(keyHolder.getKey().intValue());
        return pokemonInstance;
    }

    public boolean deleteById(int instanceId) {
        return jdbcTemplate.update("delete from pokemon_instance where pokemon_instance_id = ?;", instanceId) > 0;
    }

    public boolean update(PokemonInstance pokemonInstance) {

        final String sql = "update pokemon_instance set "
                + "pokemon_name = ?, "
                + "app_user_id = ?, "
                + "max_hp = ?, "
                + "attack = ?, "
                + "defense = ?, "
                + "special_attack = ?, "
                + "special_defense = ?, "
                + "speed = ? "
                + "where pokemon_instance_id = ?;";

        return jdbcTemplate.update(sql,
                pokemonInstance.getPokemonName(),
                pokemonInstance.getAppUserId(),
                pokemonInstance.getMaxHp(),
                pokemonInstance.getAttack(),
                pokemonInstance.getDefense(),
                pokemonInstance.getSpecialAttack(),
                pokemonInstance.getSpecialDefense(),
                pokemonInstance.getSpeed(),
                pokemonInstance.getPokemonInstanceId()) > 0;
    }

}

