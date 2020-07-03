package lt.codeacademy.Car.auction.controller;

import lt.codeacademy.Car.auction.entities.User;
import lt.codeacademy.Car.auction.repositories.dto.UserDto;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("UserController")
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public UserDto getUser(@AuthenticationPrincipal User user){
        return new UserDto(user);
    }
}
