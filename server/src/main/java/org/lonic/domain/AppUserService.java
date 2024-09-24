package org.lonic.domain;

import org.lonic.data.AppUserRepository;
import org.lonic.models.AppUser;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;


    public AppUserService(AppUserRepository appUserRepository) {this.appUserRepository = appUserRepository;}
    //getters
    public List<AppUser> findAll() { return appUserRepository.findAll();}

    public AppUser findByUsername(String username){ return  appUserRepository.findByUsername(username);}
    //add
    public Result<AppUser> add(AppUser appUser) {
        Result<AppUser> result = validate(appUser);
        if (!result.isSuccess()) {
            return result;
        }

        if (appUser.getAppUserId() != 0) {
            result.addMessage("agencyId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        appUser = appUserRepository.add(appUser);
        result.setPayload(appUser);
        return result;
    }

    public boolean deleteById(int appUserId){return appUserRepository.deleteById(appUserId);}


    private Result<AppUser> validate(AppUser appUser) {
        Result<AppUser> result = new Result<>();
        if (appUser == null) {
            result.addMessage("App User cannot be null", ResultType.INVALID);
            return result;
        }
        //checking inputed
        if (Validations.isNullOrBlank(appUser.getUsername())) {
            result.addMessage("username is required", ResultType.INVALID);
        }
        //checking inputed
        if (Validations.isNullOrBlank(appUser.getPassword())) {
            result.addMessage("password is required", ResultType.INVALID);
        }
        try {
            //checking for correct characters
            if (appUser.getUsername().length() < 6 || appUser.getUsername().length() > 20) {
                result.addMessage("username must be between 6 and 20 characters", ResultType.INVALID);
            }
            //checking for dupes
            List<AppUser> appUsers = appUserRepository.findAll();
            for (AppUser a : appUsers) {
                if (Objects.equals(a.getUsername(), appUser.getUsername())) {
                    result.addMessage("username already exist", ResultType.INVALID);
                }
            }
            //checking for password correct chars
            if (appUser.getPassword().length() < 6 || appUser.getPassword().length() > 40) {
                result.addMessage("password must be between 6 and 40 characters", ResultType.INVALID);
            }
        }catch(NullPointerException e){
           //do nothing
        }
        return result;
    }
}
