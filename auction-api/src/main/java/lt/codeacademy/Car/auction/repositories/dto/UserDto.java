package lt.codeacademy.Car.auction.repositories.dto;

import lombok.Data;
import lt.codeacademy.Car.auction.entities.Role;
import lt.codeacademy.Car.auction.entities.User;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private String name;
    private String lastName;
    private String username;
    private Set<String> roles;
    private String password;
    private String city;

    public UserDto(User user) {
        this.name = user.getName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
        this.city = user.getCity();
        this.password = user.getPassword();
        this.roles = user.getRoles().stream()
                .map(Role::getRole)
                .collect(Collectors.toSet());
    }
}