package org.lonic.data;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lonic.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
        assertEquals(users.get(0).getRoles().get(0),"admin");
    }
    @Test
    void shouldFindUserOne() {
        AppUser user = repository.findByUsername("user1");
        assertEquals("password1", user.getPassword());
    }
    @Test
    void shouldAddUser() {
        AppUser user = new AppUser();
        user.setUsername("TEST username");
        user.setPassword("Test Password");
        AppUser actual = repository.add(user);
        assertNotNull(actual);
        assertEquals("Test Password", actual.getPassword());
    }
    @Test
    void shouldDeleteUser() {
        assertTrue(repository.deleteById(2));
    }
}
