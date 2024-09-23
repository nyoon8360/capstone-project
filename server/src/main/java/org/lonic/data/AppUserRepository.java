package org.lonic.data;

import org.lonic.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {
    List<AppUser> findAll();

    //find by username

    List<AppUser> findByUsername(String Username);

    //add method
    AppUser add(AppUser appUser);

    // delete function
    boolean deleteById(int appUserId);
}
