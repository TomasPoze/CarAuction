package lt.codeacademy.Car.auction.repositories;

import lt.codeacademy.Car.auction.entities.Bets;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BetRepository extends JpaRepository<Bets,Long> {

    Page<Bets> getAllByPostId(Long postId, Pageable pageable);

}
