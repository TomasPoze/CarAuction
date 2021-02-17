package lt.codeacademy.Car.auction.services;

import lt.codeacademy.Car.auction.entities.Role;
import lt.codeacademy.Car.auction.repositories.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Set<Role> findRoleByValue(Set<String> roles){
        Set<Role> roleSet = new HashSet<>();
        for (String role : roles){
            roleSet.add(roleRepository.findAllRoleByRole(role));
        }
        return roleSet;
    }
}
