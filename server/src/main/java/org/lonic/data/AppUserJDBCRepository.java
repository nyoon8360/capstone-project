package org.lonic.data;

import org.lonic.data.mappers.AppUserMapper;
import org.lonic.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
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
        return jdbcTemplate.query(sql, new AppUserMapper());
    }

    //find by username
    @Override
    public List<AppUser> findByUsername(String username){
        final String sql = "select app_user_id, username, password "
                +"from app_user "
                +"where username = ?;";
        return jdbcTemplate.query(sql,new AppUserMapper(), username);
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
}
