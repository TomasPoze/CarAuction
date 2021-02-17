package lt.codeacademy.Car.auction.services;

import lt.codeacademy.Car.auction.entities.Role;
import lt.codeacademy.Car.auction.entities.User;
import lt.codeacademy.Car.auction.repositories.UserRepository;
import lt.codeacademy.Car.auction.repositories.dto.UserDto;
import lt.codeacademy.Car.auction.services.exceptions.SuchUserAlreadyExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;
    private final RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl(UserRepository userRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user found by name: " + username));
    }

    public void saveOrUpdateUser(UserDto userDto) {
        Set<Role> role = roleService.findRoleByValue(userDto.getRoles());
        User user = new User();
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRoles(role);
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setName(userDto.getName());
        user.setCity(userDto.getCity());

        try {
            userRepository.save(user);
        }catch (Exception ex){
            throw new SuchUserAlreadyExistException("Such User already exists!");
        }
    }


}
