package org.lonic.data;

import org.lonic.models.AppUser;

import java.util.List;

public interface AppUserRepository {
    List<AppUser> findAll();

    //find by username

    AppUser findByUsername(String Username);

    //add method
    AppUser add(AppUser appUser);

    // delete function
    boolean deleteById(int appUserId);
}
