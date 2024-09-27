package org.lonic.data;

import org.lonic.models.Area;

import java.util.List;

public interface AreaRepository {
    List<Area> findAll();

    Area findById(int areaId);

    Area add(Area area);

    boolean update(Area area);

    boolean deleteById(int areaId);
}
