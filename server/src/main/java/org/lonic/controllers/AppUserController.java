package org.lonic.controllers;

import org.lonic.models.PasswordUpdateRequest;
import org.lonic.security.AppUserService;
import org.lonic.models.AppUser;
import org.lonic.security.JwtConverter;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.ValidationException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/user")
public class AppUserController {

    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final AppUserService appUserService;

    public AppUserController(AuthenticationManager authenticationManager, JwtConverter converter, AppUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.appUserService = appUserService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody Map<String, String> credentials) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                String jwtToken = converter.getTokenFromUser((User) authentication.getPrincipal());
                AppUser appUser = (AppUser) authentication.getPrincipal();

                List<String> roles = AppUser.convertAuthoritiesToRoles(appUser.getAuthorities());
                boolean isAdmin = roles.contains("admin");

                HashMap<String, Object> map = new HashMap<>();
                map.put("jwt_token", jwtToken);
                map.put("is_admin", isAdmin);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }

        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@RequestBody Map<String, String> credentials) {
        AppUser appUser = null;

        try {
            String username = credentials.get("username");
            String password = credentials.get("password");


            appUser = appUserService.create(username, password);
        } catch (ValidationException ex) {
            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (DuplicateKeyException ex) {
            return new ResponseEntity<>(List.of("The provided username already exists"), HttpStatus.BAD_REQUEST);
        }

        // happy path...

        HashMap<String, Integer> map = new HashMap<>();
        map.put("appUserId", appUser.getAppUserId());

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @PutMapping("/update-password/{username}")
    public ResponseEntity<?> updatePassword(
            @PathVariable String username,
            @RequestBody PasswordUpdateRequest passwordUpdateRequest,
            Principal principal) {

        try {

            // Only allow the logged-in user to update their own password
            if (!appUserService.isAuthorized(username)) {
                return new ResponseEntity<>("Unauthorized", HttpStatus.FORBIDDEN);
            }

            boolean passwordUpdated = appUserService.updatePassword(username, passwordUpdateRequest);

            if (passwordUpdated) {
                return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid current password", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update password: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
