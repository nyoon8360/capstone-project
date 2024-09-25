package org.lonic.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lonic.models.AppUser;
import org.lonic.models.Area;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AreaJDBCRepositoryTest {

    @Autowired
    AreaJDBCRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll(){
        List<Area> areas = repository.findAll();
        assertNotNull(areas);
        assertEquals(areas.get(0).getAreaName(),"Sinnoh");
    }
    @Test
    void shouldFindById(){
        Area actual = repository.findById(1);
        assertNotNull(actual);
        assertEquals(actual.getAreaName(),"Sinnoh");
    }
    @Test
    void shouldAddUser() {
        Area area = new Area();
        area.setAreaName("test area");
        Area actual = repository.add(area);
        assertNotNull(actual);
        assertEquals("test area", actual.getAreaName());
    }

    @Test
    void shouldUpdate(){
        List<Area> areas= repository.findAll();
        Area area = areas.get(1);
        area.setAreaName("testing");
        assertTrue(repository.update(area));
    }

    @Test
    void shouldDeleteArea() {
        assertTrue(repository.deleteById(2));
    }
}
