package org.lonic.data;

import org.lonic.data.mappers.AreaEncounterMapper;
import org.lonic.models.AreaEncounter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AreaEncounterJDBCRepository implements AreaEncounterRepository{

    private final JdbcTemplate jdbcTemplate;

    public AreaEncounterJDBCRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    @Override
    public List<AreaEncounter> findAllWithId(int areaId){
        final String sql = "select area_id,pokemon_name,encounter_rate,flee_rate "
                + "from area_encounter "
                + "where area_id = ?";

        return jdbcTemplate.query(sql,new AreaEncounterMapper(), areaId);
    }

    @Override
    public AreaEncounter add(AreaEncounter areaEncounter){
        final String sql = "insert into area_encounter (area_id, pokemon_name, encounter_rate, flee_rate) "
                + "values (?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, areaEncounter.getAreaId()); // Set area_id
            ps.setString(2, areaEncounter.getPokemonName()); // Set pokemon_name
            ps.setInt(3, areaEncounter.getEncounterRate()); // Set encounter_rate
            ps.setInt(4, areaEncounter.getFleeRate()); // Set flee_rate
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return areaEncounter;
    }

    @Override
    public boolean update(AreaEncounter areaEncounter) {
        final String sql = "update area_encounter set encounter_rate = ?, flee_rate = ? WHERE area_id = ? AND pokemon_name = ?";

        return  jdbcTemplate.update(sql, areaEncounter.getEncounterRate(), areaEncounter.getFleeRate(), areaEncounter.getAreaId(), areaEncounter.getPokemonName()) > 0;// returns true if the update was successful
    }

    @Override
    public boolean delete(int areaId, String pokemonName) {
        final String sql = "delete from area_encounter where area_id = ? and pokemon_name = ?";

        return jdbcTemplate.update(sql, areaId, pokemonName + "-" + areaId) > 0;
    }
}
