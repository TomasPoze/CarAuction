package lt.codeacademy.Car.auction.repositories;

import lt.codeacademy.Car.auction.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findAllRoleByRole(String role);
}
