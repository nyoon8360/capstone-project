package org.lonic.controllers;

import org.lonic.domain.PokemonInstanceService;
import org.lonic.domain.Result;
import org.lonic.models.AppUser;
import org.lonic.models.PokemonInstance;
import org.lonic.security.AppUserService;
import org.lonic.security.JwtConverter;
import org.lonic.security.JwtRequestFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin()
@RequestMapping("/api/pokemon")
public class PokemonInstanceController {
    private final PokemonInstanceService service;
    private final JwtConverter converter;
    private final AppUserService userService;


    public PokemonInstanceController(PokemonInstanceService service, JwtConverter converter, AppUserService userService) {
        this.service = service;
        this.converter = converter;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<Object> getByUserId(@RequestHeader("Authorization") String token) {
        User user = converter.getUserFromToken(token);
        AppUser appUser = userService.findByUsername(user.getUsername());

        Result<List<PokemonInstance>> result = service.getByUserId(appUser.getAppUserId());

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<Object> getByUserIdAdmin(@RequestHeader("Authorization") String token, @PathVariable int userId) {
//        Result<List<PokemonInstance>> result = service.getByUserId(userId);
//
//        if(result.isSuccess()) {
//            return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
//        }
//        return ErrorResponse.build(result);

        User user = converter.getUserFromToken(token); //get user for request token
        AppUser appUser = userService.findByUsername(user.getUsername());
        boolean isAdmin = AppUser.convertAuthoritiesToRoles(appUser.getAuthorities()).contains("admin");

        if(isAdmin){ //Allow selection of any user for admin
            Result<List<PokemonInstance>> result = service.getByUserId(userId);

            return result.isSuccess() ?
                    new ResponseEntity<>(result.getPayload(), HttpStatus.OK) : ErrorResponse.build(result);

        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping()
    public ResponseEntity<Object> add(@RequestBody PokemonInstance pokemonInstance) {
        Result<PokemonInstance> result = service.add(pokemonInstance);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{pokemonInstanceId}")
    public ResponseEntity<Object> update(@PathVariable int pokemonInstanceId, @RequestBody PokemonInstance pokemonInstance) {

        if(pokemonInstanceId != pokemonInstance.getPokemonInstanceId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<PokemonInstance> result = service.update(pokemonInstance);
        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{pokemonInstanceId}")
    public ResponseEntity<Void> deleteById(@PathVariable int pokemonInstanceId) {
        Result<PokemonInstance> result = service.deleteById(pokemonInstanceId);

        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
