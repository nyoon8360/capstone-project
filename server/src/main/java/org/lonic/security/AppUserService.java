package org.lonic.security;

import org.lonic.data.AppUserRepository;
import org.lonic.models.AppUser;
import org.lonic.models.PasswordUpdateRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository,
                          PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
        ensureAdmin();
    }

    private void ensureAdmin() {

        AppUser user = repository.findByUsername("pokeadmin");
        String ensurePassword = "pokeadmin";

        if (user == null) {


            user = new AppUser(0, "pokeadmin", encoder.encode(ensurePassword), false, List.of("admin"));

            try {
                repository.create(user);
            } catch (ValidationException ex) {
                ex.printStackTrace();
            }
        }
        System.out.printf("%n%nAdmin password: %s%n%n", ensurePassword);
    }

    public List<AppUser> findAll(){
        List<AppUser> allUsers = repository.findAll().stream().map(user -> {
            return new AppUser(user.getAppUserId(), user.getUsername(), "", false, List.of());
        }).collect(Collectors.toList());

        return allUsers;
    }

    public AppUser findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public AppUser create(String username, String password) {
        validate(username);
        validatePassword(password);

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, false, List.of("user"));

        return repository.create(appUser);
    }

    public boolean delete(int userId) {
        return repository.delete(userId);
    }

    private void validate(String username) {
        if (username == null || username.isBlank()) {
            throw new ValidationException("username is required");
        }

        if (username.length() > 20 || username.length() < 6) {
            throw new ValidationException("username must be between 6 and 20");
        }
    }

    public boolean updatePassword(String username, PasswordUpdateRequest passwordUpdateRequest) {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null) {
            throw new UsernameNotFoundException("User not found");
        }


        if (!encoder.matches(passwordUpdateRequest.getCurrentPassword(), appUser.getPassword())) {
            return false;
        }


        validatePassword(passwordUpdateRequest.getNewPassword());


        String encodedNewPassword = encoder.encode(passwordUpdateRequest.getNewPassword());
        appUser = new AppUser(appUser.getAppUserId(), username, passwordUpdateRequest.getNewPassword(), false, List.of("User"));


        repository.update(appUser);

        return true;
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 6 || password.length() >40) {
            throw new ValidationException("password must be between 8 and 40 characters");
        }
    }
    public boolean isAuthorized(String username) {
        AppUser appUser = repository.findByUsername(username);
        return appUser != null && appUser.getUsername().equals(username);
    }
}
