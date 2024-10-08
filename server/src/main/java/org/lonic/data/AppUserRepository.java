package org.lonic.data;

import org.lonic.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

    @Transactional
    List<AppUser> findAll();

    @Transactional
    AppUser findByUsername(String username);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    void update(AppUser user);

    @Transactional
    boolean delete(int userId);
}
