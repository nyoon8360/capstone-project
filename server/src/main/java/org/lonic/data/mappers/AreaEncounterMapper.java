package org.lonic.data.mappers;

import org.lonic.models.AreaEncounter;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AreaEncounterMapper implements RowMapper<AreaEncounter> {
    @Override
    public AreaEncounter mapRow(ResultSet rs, int rowNum) throws SQLException {
        AreaEncounter areaEncounter = new AreaEncounter();
        areaEncounter.setAreaId(rs.getInt("area_id"));
        areaEncounter.setPokemonName(rs.getString("pokemon_name"));
        areaEncounter.setEncounterRate(rs.getInt("encounter_rate"));
        areaEncounter.setFleeRate(rs.getInt("flee_rate"));
        return areaEncounter;
    }
}
