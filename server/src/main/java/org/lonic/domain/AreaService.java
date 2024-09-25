package org.lonic.domain;

import org.lonic.data.AreaRepository;
import org.lonic.models.Area;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaService {
    private final AreaRepository repository;

    public AreaService(AreaRepository repository) {
        this.repository = repository;
    }

    //Pass Through Methods
    public List<Area> findAll() { return repository.findAll(); }

    public Result<Area> delete(int areaId) {
        Result<Area> result = new Result<>();

        if(!repository.deleteById(areaId)) {
            result.addMessage("Area ID not found", ResultType.NOT_FOUND);
            return result;
        }
        return result;
    }

    public Result<Area> add(Area area) {
        Result<Area> result = new Result<>();

        if (Validations.isNullOrBlank(area.getAreaName())) {
            result.addMessage("Area name cannot be blank.", ResultType.INVALID);
            return result;
        }

        result.setPayload(repository.add(area));
        return result;

    }

    public Result<Area> update(Area area) {
        Result<Area> result = new Result<>();

        if(Validations.isNullOrBlank(area.getAreaName())) {
            result.addMessage("Area name cannot be blank.", ResultType.INVALID);
            return result;
        } else if(!repository.update(area)) {
            result.addMessage("Area ID not found", ResultType.NOT_FOUND);
            return result;
        }

        result.setPayload(area);
        return result;
    }

}
