package org.lonic.data;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lonic.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AppUserJDBCRepositoryTest {

    @Autowired
    AppUserJDBCRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindUsers() {
        List<AppUser> users = repository.findAll();
        assertNotNull(users);
        assertTrue(!users.isEmpty());
    }
}
