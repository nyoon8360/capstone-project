package org.lonic.domain;

import org.junit.jupiter.api.Test;
import org.lonic.data.AreaRepository;
import org.lonic.models.Area;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AreaServiceTest {

    @Autowired
    AreaService service;

    @MockBean
    AreaRepository repository;


    @Test
    void shouldNotAddEmptyOrNullName() {
        Area input = new Area();
        input.setAreaName(null);
        Result<Area> result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Area name cannot be blank."));
        assertEquals(ResultType.INVALID, result.getType());

        input.setAreaName("");
        result = service.add(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Area name cannot be blank."));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateEmptyOrNullName() {
        Area input = new Area();
        input.setAreaName(null);
        Result<Area> result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Area name cannot be blank."));
        assertEquals(ResultType.INVALID, result.getType());

        input.setAreaName("");
        result = service.update(input);

        assertFalse(result.isSuccess());
        assertTrue(result.getMessages().contains("Area name cannot be blank."));
        assertEquals(ResultType.INVALID, result.getType());
    }


}