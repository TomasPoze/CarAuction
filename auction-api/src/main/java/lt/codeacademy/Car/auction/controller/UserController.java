package lt.codeacademy.Car.auction.controller;

import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.entities.Role;
import lt.codeacademy.Car.auction.entities.User;
import lt.codeacademy.Car.auction.repositories.dto.UserDto;
import lt.codeacademy.Car.auction.services.UserDetailsServiceImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserDetailsServiceImpl userService;

    public UserController(UserDetailsServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserDto getUser(@AuthenticationPrincipal User user) {
        return new UserDto(user);
    }

    @PostMapping("/register")
    public void createUser(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "name") String name,
            @RequestParam("last_name") String lastName,
            @RequestParam("city") String city
    ) {

        UserDto userDto = new UserDto();
                userDto.setUsername(username);
                userDto.setPassword(password);
                userDto.setName(name);
                userDto.setLastName(lastName);
                userDto.setCity(city);
                userDto.setRoles(new HashSet<>(Collections.singletonList("CUSTOMER")));

        userService.saveOrUpdateUser(userDto);
    }
}
