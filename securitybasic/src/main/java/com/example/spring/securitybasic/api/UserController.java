package com.example.spring.securitybasic.api;

import com.example.spring.securitybasic.model.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

@RestController
@CrossOrigin
public class UserController {

    @PostMapping("/login")
    public boolean userLogin(@RequestBody User user){

      return user.getUsername().equalsIgnoreCase("user") && user.getPassword().equalsIgnoreCase("password");
    }

    @PostMapping("/user")
    public Principal getUser(HttpServletRequest request){
        String authToken = request.getHeader("Authorization")
            .substring("Basic".length()).trim();
        return () ->  new String(Base64.getDecoder()
                .decode(authToken)).split(":")[0];


    }
}
