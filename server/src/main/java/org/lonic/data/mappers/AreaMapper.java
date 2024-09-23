package org.lonic.data.mappers;

import org.lonic.models.Area;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AreaMapper implements RowMapper<Area> {
    @Override
    public Area mapRow(ResultSet rs, int rowNum) throws SQLException {
        Area area = new Area();
        area.setAreaId(rs.getInt("area_id"));
        area.setAreaName(rs.getString("area_name"));
        return area;
    }
}
