package org.lonic.controllers;

import org.lonic.domain.PokemonInstanceService;
import org.lonic.domain.Result;
import org.lonic.models.PokemonInstance;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/api/pokemon")
public class PokemonInstanceController {
    private final PokemonInstanceService service;

    public PokemonInstanceController(PokemonInstanceService service) {
        this.service = service;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getByUserId(@PathVariable int userId) {
        Result<List<PokemonInstance>> result = service.getByUserId(userId);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
        }
        return ErrorResponse.build(result);
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
