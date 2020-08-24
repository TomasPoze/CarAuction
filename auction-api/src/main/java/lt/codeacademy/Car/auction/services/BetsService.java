package lt.codeacademy.Car.auction.services;

import lt.codeacademy.Car.auction.entities.Bets;
import lt.codeacademy.Car.auction.repositories.BetRepository;
import lt.codeacademy.Car.auction.services.exceptions.BetNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BetsService {
    private BetRepository betRepository;

    public BetsService(BetRepository betRepository) {
        this.betRepository = betRepository;
    }

    public Bets getBetsById(Long id) {
        return betRepository.findById(id)
                .orElseThrow(() -> new BetNotFoundException("Bets with id: " + id + " was not found"));
    }

    public Page<Bets> getBetsByPostId(Long postId) {
        Pageable pageable = PageRequest.of(0, 50);
        return betRepository.getAllByPostId(postId, pageable);
    }

    public Bets createBets(Bets bets) {
        return betRepository.save(bets);
    }


    public List<Bets> getBets() {
        return betRepository.findAll();
    }
}
