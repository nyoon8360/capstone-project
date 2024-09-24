package org.lonic.controllers;

import org.lonic.domain.AreaService;
import org.lonic.domain.Result;
import org.lonic.models.Area;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/area")
public class AreaController {
    private final AreaService service;

    public AreaController(AreaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Object> findAll() {
        List<Area> all = service.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Area area) {
        Result<Area> result = service.add(area);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{areaId}")
    public ResponseEntity<Object> update(@PathVariable int areaId, @RequestBody Area area) {
        Result<Area> result = service.update(area);

        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

       return ErrorResponse.build(result);
    }

    @DeleteMapping("/{areaId}")
    public ResponseEntity<Object> delete(@PathVariable int areaId) {
        Result<Area> result = service.delete(areaId);

        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
