package lt.codeacademy.Car.auction.controller;

import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.entities.User;
import lt.codeacademy.Car.auction.repositories.dto.UserDto;
import lt.codeacademy.Car.auction.services.UserDetailsServiceImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserDetailsServiceImpl userService;

    public UserController(UserDetailsServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserDto getUser(@AuthenticationPrincipal User user){
        return new UserDto(user);
    }

    @PostMapping("/register")
    public User createUser(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "name") String name,
            @RequestParam("last_name") String lastName,
            @RequestParam("city") String city
            ){

        User user = User.builder()
                .username(username)
                .password(password)
                .name(name)
                .lastName(lastName)
                .city(city)
                .build();

        return userService.saveOrUpdateUser(user);
    }
}
