package org.lonic.domain;

import org.junit.jupiter.api.Test;
import org.lonic.data.AppUserRepository;
import org.lonic.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    AppUserRepository appUserRepository;

    @Test
    void shouldAdd() {
        AppUser appUser = new AppUser();
        appUser.setUsername("Test Username");
        appUser.setPassword("Test Password");
        Result<AppUser> actual = service.add(appUser);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(0,actual.getMessages().size());
    }
    @Test
    void shouldNotAddNullUserNameAndEmptyUsername(){
        //null
        AppUser appUser = new AppUser();
        appUser.setUsername(null);
        appUser.setPassword("Test Password");
        Result<AppUser> actual = service.add(appUser);
        assertEquals(ResultType.INVALID, actual.getType());
        //empty
        appUser.setUsername("");
        Result<AppUser> actual1 = service.add(appUser);
        assertEquals(ResultType.INVALID, actual1.getType());
    }
    @Test
    void shouldNotAddDueToChars(){
        //username < 6
        AppUser appUser = new AppUser();
        appUser.setUsername("t");
        appUser.setPassword("Test Password");
        Result<AppUser> actual = service.add(appUser);
        assertEquals(ResultType.INVALID, actual.getType());
        //username > 20
        appUser.setUsername("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        Result<AppUser> actual1 = service.add(appUser);
        assertEquals(ResultType.INVALID, actual1.getType());
        //password < 6
        appUser.setUsername("Test Username");
        appUser.setPassword("t");
        Result<AppUser> actual2 = service.add(appUser);
        assertEquals(ResultType.INVALID, actual2.getType());
        //password > 40
        appUser.setPassword("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        Result<AppUser> actual3 = service.add(appUser);
        assertEquals(ResultType.INVALID, actual3.getType());
    }
    @Test
    void shouldNotAddDupes(){
        AppUser appUser = new AppUser();
        appUser.setUsername("user1");
        appUser.setPassword("Test Password");
        Result<AppUser> actual = service.add(appUser);
        assertEquals(ResultType.INVALID, actual.getType());
    }
    @Test
    void shouldDelete(){
        when(appUserRepository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }
    @Test
    void shouldNotDelete(){
        when(appUserRepository.deleteById(50)).thenReturn(true);
        assertTrue(service.deleteById(50));
    }
}
