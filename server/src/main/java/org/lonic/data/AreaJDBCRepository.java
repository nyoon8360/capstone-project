package org.lonic.data;

import org.lonic.data.mappers.AreaMapper;
import org.lonic.models.Area;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AreaJDBCRepository implements AreaRepository{

    private final JdbcTemplate jdbcTemplate;

    public AreaJDBCRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    //find methods
    @Override
    public List<Area> findAll() {
        final String sql = "select area_id, area_name "
                + "from area;";
        return jdbcTemplate.query(sql, new AreaMapper());
    }

    @Override
    public Area add(Area area) {

        final String sql = "insert into area (area_name) "
                + " values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, area.getAreaName());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        area.setAreaId(keyHolder.getKey().intValue());
        return area;
    }

    @Override
    public boolean update(Area area) {
        final String sql = "update area set "
                + "area_name = ? "
                + "where area_id = ?";

        return jdbcTemplate.update(sql,area.getAreaName(),area.getAreaId()) > 0;
    }
    @Override
    public boolean deleteById(int areaId){
        // First, deleteById dependent records in the area_encounter table
        String deleteDependentRecordsSql = "deleteById from area_encounter where area_id = ?";
        jdbcTemplate.update(deleteDependentRecordsSql, areaId);

        // Now, deleteById the area from the area table
        String deleteAreaSql = "deleteById from area where area_id = ?";
        return jdbcTemplate.update(deleteAreaSql, areaId) > 0;
    }
}
