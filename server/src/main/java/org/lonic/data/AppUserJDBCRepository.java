package org.lonic.data;

import org.lonic.data.mappers.AppUserMapper;
import org.lonic.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class AppUserJDBCRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;

    public AppUserJDBCRepository(JdbcTemplate jdbcTemplate){this.jdbcTemplate = jdbcTemplate;}

    //find methods
    //find all
    @Override
    public List<AppUser> findAll(){
        final String sql = "select app_user_id, username, password "
                + "from app_user;";
        List<AppUser> list = jdbcTemplate.query(sql, new AppUserMapper());
        for (AppUser appUser: list){
            addRoles(appUser);
        }
        return list;
    }

    //find by username
    @Override
    public AppUser findByUsername(String username){
        final String sql = "select app_user_id, username, password "
                +"from app_user "
                +"where username = ?;";
        AppUser result = jdbcTemplate.queryForObject(sql,new Object[]{username}, new AppUserMapper());
        if(result != null) {
            addRoles(result);
        }
        return result;
    }

    //add method
    @Override
    public AppUser add(AppUser appUser){
        final String sql = "insert into app_user (username,password) "
                + "values (?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
        PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ps.setString(1,appUser.getUsername());
        ps.setString(2,appUser.getPassword());
        return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        appUser.setAppUserId(keyHolder.getKey().intValue());
        return appUser;
    }
    // deleteById function
    @Override
    public boolean deleteById(int appUserId) {
        // First, delete dependent records in the pokemon_instance table
        String deleteDependentRecordsSql = "delete from pokemon_instance where app_user_id = ?";
        jdbcTemplate.update(deleteDependentRecordsSql, appUserId);

        // Now, delete the user from the app_user table
        String deleteUserSql = "delete from app_user where app_user_id = ?";
        return jdbcTemplate.update(deleteUserSql, appUserId) > 0;
    }

    //helper method for roles
    private void addRoles(AppUser appUser){
        final String sql = "select ar.role_name "
                +"from app_user au "
                +"inner join user_role_assignment ura on au.app_user_id = ura.app_user_id "
                +"inner join app_role ar on ura.app_role_id = ar.app_role_id "
                + "where au.app_user_id = ?";

        // Execute query and map the results to List<String> of roles
        List<String> roles = jdbcTemplate.query(sql, new Object[]{appUser.getAppUserId()}, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getString("role_name");
            }
        });

        // Set the roles in the AppUser object
        appUser.setRoles(roles);
    }
}
