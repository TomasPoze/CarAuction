package lt.codeacademy.Car.auction.repositories;

import lt.codeacademy.Car.auction.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}