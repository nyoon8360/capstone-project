package org.lonic.controllers;

import org.lonic.domain.AreaEncounterService;
import org.lonic.domain.Result;
import org.lonic.models.AreaEncounter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/areaEncounter")
public class AreaEncounterController {
    private final AreaEncounterService service;

    public AreaEncounterController(AreaEncounterService service) {
        this.service = service;
    }

    @GetMapping("/{areaId}")
    public ResponseEntity<Object> findAllWithId(@PathVariable int areaId) {
        Result<List<AreaEncounter>> result = service.findAllWithId(areaId);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody AreaEncounter areaEncounter) {
        Result<AreaEncounter> result = service.add(areaEncounter);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{areaId}/{pokemonName}")
    public ResponseEntity<Object> update(@PathVariable int areaId,  @PathVariable String pokemonName, @RequestBody AreaEncounter areaEncounter) {
        if(areaId != areaEncounter.getAreaId() || !areaEncounter.getPokemonName().equals(pokemonName)){
            System.out.println(areaEncounter.getAreaId());
            System.out.println(areaEncounter.getPokemonName());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<AreaEncounter> result = service.update(pokemonName, areaEncounter);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{areaId}/{pokemonName}")
    public ResponseEntity<Object> delete(@PathVariable int areaId, @PathVariable String pokemonName) {
        Result<AreaEncounter> result = service.delete(areaId, pokemonName);

        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
