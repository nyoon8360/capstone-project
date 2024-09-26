package org.lonic.data;

import org.lonic.data.mappers.AppUserMapper;
import org.lonic.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

@Repository
public class AppUserJDBCRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;

    public AppUserJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public List<AppUser> findAll(){
        final String sql = "select app_user_id, username, password, disabled  "
                + "from app_user;";
        List<String> roles = List.of();

        return jdbcTemplate.query(sql, new AppUserMapper(roles));
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select app_user_id, username, password, disabled "
                + "from app_user "
                + "where username = ?;";

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser create(AppUser user) {

        final String sql = "insert into app_user (username, password) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Override
    @Transactional
    public void update(AppUser user) {

        final String sql = "update app_user set "
                + "username = ?, "
                + "password = ?,"
                + "disabled = ? "
                + "where app_user_id = ?";

        jdbcTemplate.update(sql,
                user.getUsername(), !user.isEnabled(), user.getAppUserId());

        updateRoles(user);
    }

    @Override
    @Transactional
    public boolean delete(int userId) {

        jdbcTemplate.update("delete from user_role_assignment where app_user_id = ?;", userId); //delete from user_role_assignment
        jdbcTemplate.update("delete from pokemon_instance where app_user_id = ?;", userId); //delete from pokemon_instance
        return jdbcTemplate.update("delete from app_user where app_user_id = ?;", userId) > 0;
    }

    private void updateRoles(AppUser user) {
        // delete all roles, then re-add
        jdbcTemplate.update("delete from user_role_assignment where app_user_id = ?;", user.getAppUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();
        if (authorities == null) {
            return;
        }

        for (String role : AppUser.convertAuthoritiesToRoles(authorities)) {
            String sql = "insert into user_role_assignment (app_user_id, app_role_id) "
                    + "select ?, app_role_id from app_role where role_name = ?;";
            jdbcTemplate.update(sql, user.getAppUserId(), role);
        }
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select ar.role_name "
                +"from app_user au "
                +"inner join user_role_assignment ura on au.app_user_id = ura.app_user_id "
                +"inner join app_role ar on ura.app_role_id = ar.app_role_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("role_name"), username);
    }
}